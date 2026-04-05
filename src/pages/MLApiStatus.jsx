import React, { useEffect, useState } from 'react';
import { useMLHealth } from '../hooks/useMLHealth';
import { useMLPayload } from '../hooks/useMLPayload';
import mlClient from '../api/mlClient';

export default function MLApiStatus() {
  const { isOnline, isChecking, lastChecked, recheck } = useMLHealth();
  const { getPayloads } = useMLPayload();
  
  const [testStatus, setTestStatus] = useState('idle'); // idle, testing, success, error
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    recheck();
  }, [recheck]);

  const handleTestEndpoint = async () => {
    setTestStatus('testing');
    setTestResult(null);
    try {
      const payload = getPayloads().trustScore;
      const res = await mlClient.getTrustScore(payload);
      setTestResult(res);
      setTestStatus('success');
    } catch (err) {
      setTestResult(err.message || 'Unknown error');
      setTestStatus('error');
    }
  };

  const handleRefresh = () => {
    setTestStatus('idle');
    setTestResult(null);
    recheck();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#FAFAF8]">Diagnostics</h1>
        
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">TrustLend ML Engine Status</h2>
              <p className="text-sm text-gray-400 mt-1">
                Last checked: {lastChecked ? lastChecked.toLocaleTimeString() : 'Never'}
              </p>
            </div>
            <button 
              onClick={handleRefresh}
              disabled={isChecking}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          <div className="py-4 border-t border-b border-gray-800">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3">AI Engine</h3>
            <div className="flex items-center gap-3 font-bold text-lg">
              {isChecking ? (
                <span className="text-yellow-400 animate-pulse">● CHECKING...</span>
              ) : isOnline ? (
                <span className="text-green-400">● ONLINE</span>
              ) : (
                <span className="text-red-400">● OFFLINE</span>
              )}
            </div>
          </div>

          {!isOnline && !isChecking && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-400 text-sm">
              ML Engine is offline. AI features are unavailable across the app.
            </div>
          )}

          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Endpoints</h3>
            
            <div className="flex flex-col py-3 border-b border-gray-800">
              <div className="flex items-center justify-between pointer-events-none">
                <div>
                  <h4 className="font-bold text-gray-200">Trust Score Calculator</h4>
                  <p className="text-xs text-gray-500 font-mono mt-1">POST /api/v1/trust-score</p>
                </div>
                <div className="font-bold">
                  {isChecking ? (
                    <span className="text-yellow-400 animate-pulse">● Checking</span>
                  ) : isOnline ? (
                    <span className="text-green-400">● Active</span>
                  ) : (
                    <span className="text-red-400">● Unreachable</span>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-black/20 rounded-lg border border-gray-800">
                <button 
                  onClick={handleTestEndpoint}
                  disabled={!isOnline || testStatus === 'testing'}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all"
                >
                  {testStatus === 'testing' ? 'Testing...' : 'Test Endpoint'}
                </button>

                {testStatus === 'success' && (
                  <div className="mt-4 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✔</span>
                    <pre className="text-xs text-gray-300 font-mono bg-black/40 p-3 rounded overflow-x-auto border border-gray-800 flex-1">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}

                {testStatus === 'error' && (
                  <div className="mt-4 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✖</span>
                    <p className="text-xs text-red-400 font-mono bg-red-950/30 p-3 rounded border border-red-900/50 flex-1">
                      {testResult}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
