import { Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const MOCK_GROUPS = [
  { id: 1, name: "Crypto Vets DAO", members: 12, pool: 50000, yourStake: 1000 },
];

const PENDING_REQUESTS = [
  { id: 101, member: "0x12F...99A", amount: 2000, reason: "DeFi Yield Farming", votesFor: 5, votesNeeded: 8 }
];

export default function GroupLending() {
  const [voted, setVoted] = useState({});

  const handleVote = (id) => {
    setVoted(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Group Pools</h1>
        <button className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center">
          <PlusCircle className="text-[#10B981] w-5 h-5" />
        </button>
      </div>

      <section className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Active Groups</h2>
        {MOCK_GROUPS.map(group => (
          <div key={group.id} className="glass-card p-5 rounded-3xl mb-4 border border-[#10B981]/20 relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 text-[#10B981]/10">
                <Users className="w-32 h-32" />
             </div>
             <h3 className="text-xl font-bold mb-1">{group.name}</h3>
             <p className="text-sm text-gray-400 mb-4">{group.members} Trusted Members</p>

             <div className="grid grid-cols-2 gap-4 mt-4 bg-black/20 rounded-2xl p-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Total Pool</p>
                  <p className="font-bold text-[#10B981] mt-1">${group.pool.toLocaleString()}</p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Your Stake</p>
                  <p className="font-bold mt-1">${group.yourStake.toLocaleString()}</p>
                </div>
             </div>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pending Votes</h2>
        {PENDING_REQUESTS.map(req => (
          <div key={req.id} className="glass-card p-5 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-bold">{req.member}</p>
                <p className="text-xs text-gray-400 mt-1">{req.reason}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#F5A623]">${req.amount}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Votes Needed: {req.votesNeeded}</span>
                <span>{req.votesFor} / {req.votesNeeded}</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#F5A623]" style={{ width: `${(req.votesFor / req.votesNeeded) * 100}%`}}></div>
              </div>
            </div>

            <button 
              onClick={() => handleVote(req.id)}
              disabled={voted[req.id]}
              className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 font-bold transition-all ${voted[req.id] ? 'bg-white/10 text-gray-400 cursor-not-allowed' : 'bg-[#10B981] active:scale-95 text-white shadow-lg shadow-[#10B981]/20'}`}
            >
              {voted[req.id] ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Voted
                </>
              ) : 'Approve Loan'}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
