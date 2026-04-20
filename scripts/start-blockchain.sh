#!/bin/bash
cd blockchain

# 1. Kill any existing process on 8545
echo "Cleaning up Port 8545..."
kill $(lsof -t -i:8545) 2>/dev/null
sleep 1

# 2. Start the Hardhat EVM Node in the background
echo "Starting TrustLend Hardhat Node on 0.0.0.0..."
npx hardhat node --hostname 0.0.0.0 &
NODE_PID=$!

# 3. Poll net_version until ready (max 60 seconds)
echo "⏳ Waiting for Hardhat node to be ready..."
for i in $(seq 1 60); do
  RESULT=$(curl -s -X POST http://127.0.0.1:8545 \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}')
  
  if echo "$RESULT" | grep -q "result"; then
    echo "✅ Node is live!"
    break
  fi
  
  if [ $i -eq 60 ]; then
    echo "❌ Node failed to start in time."
    kill $NODE_PID
    exit 1
  fi
  sleep 1
done

# 4. Sleep 2 more seconds for stability
sleep 2

# 5. Run Deployments
echo "📦 Deploying Smart Contracts..."
npx hardhat run scripts/deploy.js --network localhost

# 6. Run Demo State seeding
echo "🌱 Seeding Demo Data..."
npx hardhat run scripts/setupDemo.js --network localhost

# 7. Print success message
echo "============================================="
echo "🚀 TrustLend P2P Blockchain Live and Initialized!"
echo "Network operates on Chain ID: 31337"
echo "============================================="

# Keep the shell alive tracking the node
wait $NODE_PID
