import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import { ADDRESSES } from '../contracts/addresses';
import VouchSystemABI from '../contracts/VouchSystem.json';
import { useDemo } from '../context/DemoContext';
import { showTxLoading, showTxSuccess, showTxError } from '../utils/txToast';
import { translateContractError } from '../utils/contractErrors';

export function useVouchSystem() {
  const { provider, walletAddress } = useWallet();
  const { isDemoMode, demoStateOverrides, simulateTx } = useDemo();
  const [vouches, setVouches] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [vouchRequests, setVouchRequests] = useState([]); // on-chain pending requests
  const [vouchGivenCount, setVouchGivenCount] = useState(0);
  const [vouchReceivedCount, setVouchReceivedCount] = useState(0);
  const [activeStake, setActiveStake] = useState("0.0");
  const [totalStaked, setTotalStaked] = useState("0.0");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (isDemoMode && demoStateOverrides) {
        setVouches(demoStateOverrides.vouchers || []);
        setVouchers((demoStateOverrides.vouchers || []).map(v => v.voucher));
        setVouchGivenCount(demoStateOverrides.vouchGiven || 0);
        setVouchReceivedCount(demoStateOverrides.vouchReceived || 0);
        setActiveStake("30.0");
        setTotalStaked("30.0");
        setIsLoading(false);
        return;
    }

    if (!provider || !walletAddress || !ADDRESSES.VOUCH_SYSTEM) {
      setIsLoading(false);
      return;
    }

    try {
      const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, provider);
      
      // Fetch stats
      const [active, staked, given, received] = await Promise.all([
          contract.getTotalActiveStake(walletAddress),
          contract.totalStakedBy(walletAddress),
          contract.vouchGiven(walletAddress),
          contract.vouchReceived(walletAddress)
      ]);
      
      setActiveStake(ethers.formatUnits(active, 18));
      setTotalStaked(ethers.formatUnits(staked, 18));
      setVouchGivenCount(Number(given));
      setVouchReceivedCount(Number(received));

      // Fetch establishing vouches (borrower side)
      const vouchIds = await contract.getBorrowerVouches(walletAddress);
      const vouchDetails = await Promise.all(
          vouchIds.map(async id => {
              const details = await contract.getVouch(id);
              return {
                  id: details.id.toString(),
                  voucher: details.voucher,
                  amount: ethers.formatUnits(details.amount, 18),
                  released: details.released,
                  slashed: details.slashed
              };
          })
      );
      setVouches(vouchDetails);
      setVouchers(vouchDetails.map(v => v.voucher));
      
      // Note: fetching current requests (borrower side or voucher side) 
      // is slow with simple iteration, but for demo/small-scale we can use event logs.
      // For now, let's just use the state we have.
    } catch (err) {
      console.warn("Vouch data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [provider, walletAddress, isDemoMode, demoStateOverrides]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const requestVouch = async (toAddress) => {
      if (!provider || !walletAddress) throw new Error("Wallet not connected");
      const id = showTxLoading(`Requesting vouch from ${toAddress.slice(0,6)}...`);
      try {
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, signer);
          const txPromise = contract.requestVouch(toAddress);
          const tx = await simulateTx(txPromise);
          await tx.wait();
          showTxSuccess("Request Transmitted!", tx.hash, id);
          await fetchData();
          return tx;
      } catch (err) {
          showTxError(translateContractError(err), id);
          throw err;
      }
  };

  const acceptVouch = async (borrowerAddress) => {
      if (!provider || !walletAddress) throw new Error("Wallet not connected");
      const id = showTxLoading(`Accepting vouch for ${borrowerAddress.slice(0,6)}...`);
      try {
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, signer);
          const txPromise = contract.acceptVouch(borrowerAddress);
          const tx = await simulateTx(txPromise);
          await tx.wait();
          showTxSuccess("Syndicate Link Established!", tx.hash, id);
          await fetchData();
          return tx;
      } catch (err) {
          showTxError(translateContractError(err), id);
          throw err;
      }
  };

  const rejectVouch = async (borrowerAddress) => {
      if (!provider || !walletAddress) throw new Error("Wallet not connected");
      try {
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, signer);
          const txPromise = contract.rejectVouch(borrowerAddress);
          const tx = await simulateTx(txPromise);
          await tx.wait();
          showTxSuccess("Request Refused", tx.hash);
          await fetchData();
          return tx;
      } catch (err) {
          showTxError(translateContractError(err));
          throw err;
      }
  };

  const stakeForLoan = async (borrowerAddress, requestId, amount) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Committing stake to P2P loan...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, signer);
        const amountWei = ethers.parseUnits(amount.toString(), 18);
        const txPromise = contract.stakeForLoan(borrowerAddress, requestId, amountWei);
        const tx = await simulateTx(txPromise);
        await tx.wait();
        showTxSuccess(`Committed ${amount} TRUST for Loan #${requestId}`, tx.hash, id);
        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  const stakeForBorrowerLegacy = async (borrowerAddress, amount) => {
    if (!provider || !walletAddress) throw new Error("Wallet not connected");
    const id = showTxLoading("Locking stake into Vouch Network...");
    try {
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESSES.VOUCH_SYSTEM, VouchSystemABI.abi, signer);
        const amountWei = ethers.parseUnits(amount.toString(), 18);
        const txPromise = contract.stakeForBorrower(borrowerAddress, amountWei);
        const tx = await simulateTx(txPromise);
        await tx.wait();
        showTxSuccess(`Vouch established! Locked ${amount} TRUST`, tx.hash, id);
        await fetchData();
        return tx;
    } catch (err) {
        showTxError(translateContractError(err), id);
        throw err;
    }
  };

  return { 
    vouches, 
    vouchers, 
    vouchRequests, 
    vouchGivenCount,
    vouchReceivedCount,
    activeStake, 
    totalStaked, 
    isLoading, 
    requestVouch, 
    acceptVouch,
    rejectVouch,
    stakeForLoan,
    stakeForBorrower: stakeForBorrowerLegacy, 
    refresh: fetchData 
  };
}
