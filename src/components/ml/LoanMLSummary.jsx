import React, { useState, useEffect } from 'react';
import mlClient from '../../api/mlClient';
import { useMLPayload } from '../../hooks/useMLPayload';

const LoanMLSummary = ({ loanAmount }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPayloads } = useMLPayload();

  useEffect(() => {
    let isMounted = true;

    const fetchScore = async () => {
      try {
        setLoading(true);
        setError(null);
        const payload = getPayloads().trustScore;
        const response = await mlClient.getTrustScore(payload);
        if (isMounted) {
          setData(response);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to get ML trust score:", err);
        if (isMounted) {
          setError(err.message || "Failed to fetch AI score");
          setLoading(false);
        }
      }
    };

    fetchScore();

    return () => {
      isMounted = false;
    };
  }, []);

  const getTier = (score) => {
    if (score >= 90) return 'PLATINUM';
    if (score >= 70) return 'GOLD';
    if (score >= 50) return 'SILVER';
    if (score >= 30) return 'BRONZE';
    return 'STANDARD';
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4">
      <div className="border-b border-gray-800 pb-2">
        <h4 className="text-lg font-bold text-white uppercase tracking-wider">AI Loan Analysis</h4>
        <p className="text-xs text-gray-400">Powered by TrustLend ML Engine</p>
      </div>

      <div className="space-y-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">AI Score (Recommended)</span>
          {loading ? (
            <div className="animate-pulse bg-gray-700 rounded h-4 w-32"></div>
          ) : error ? (
            <span className="text-red-400 text-sm">Failed to load</span>
          ) : (
            <span className="font-bold text-white flex items-center gap-2">
              <span className="bg-gray-800 px-2 py-1 rounded">[{data?.trust_score}]</span>
              <span className="text-sm font-black">{getTier(data?.trust_score)}</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">AI Eligible Limit</span>
          {loading ? (
            <div className="animate-pulse bg-gray-700 rounded h-4 w-32"></div>
          ) : error ? (
            <span className="text-red-400 text-sm">Failed to load</span>
          ) : (
            <span className="font-bold text-green-400">
              ${data?.eligible_limit_usd || 0}
            </span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-800">
        <p className="text-xs text-yellow-400 mt-1">
          ⚠ This is an AI estimate. Your on-chain trust score governs actual loan limits.
        </p>
      </div>
    </div>
  );
};

export default LoanMLSummary;
