from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from models.trust_score import calculate_trust_score
from models.fraud_detection import check_fraud_risk
from models.repayment_scheduler import get_repayment_schedule
from models.interest_rate import calculate_dynamic_rate

app = FastAPI(title="TrustLend AI Engine API")

# Allow CORS so your React frontend can make requests to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Health endpoints (required by frontend mlApi.js checkMLHealth()) ──────────
@app.get("/")
def root():
    return {"status": "ok", "service": "TrustLend AI Engine", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok", "endpoints": [
        "/api/v1/trust-score",
        "/api/v1/fraud-check",
        "/api/v1/repayment-schedule",
        "/api/v1/interest-rate"
    ]}

# Define the expected incoming data structure

# --- FEATURE 1: TRUST SCORE ---
class TrustScoreRequest(BaseModel):
    repayment_history: float
    repayment_speed: float
    voucher_quality: float
    loan_to_repayment_ratio: float
    vouch_network_balance: float
    transaction_frequency: int

@app.post("/api/v1/trust-score")
def get_trust_score(data: TrustScoreRequest):
    # Convert Pydantic model to dict
    features_dict = data.model_dump()
    
    # Calculate score
    score = calculate_trust_score(features_dict)
    
    # Determine loan tier based on your pitch logic
    limit = 0
    if score >= 80: limit = 500
    elif score >= 60: limit = 200
    elif score >= 40: limit = 50
    elif score >= 30: limit = 10
    
    return {
        "status": "success",
        "trust_score": score,
        "eligible_limit_usd": limit
    }


# --- FEATURE 3: FRAUD DETECTION ---
class FraudCheckRequest(BaseModel):
    vouch_requests_24h: int
    avg_voucher_account_age_days: int
    network_clustering_score: float # Frontend calculates this via D3 graph density

@app.post("/api/v1/fraud-check")
def analyze_fraud(data: FraudCheckRequest):
    features = data.model_dump()
    result = check_fraud_risk(features)
    
    return {
        "status": "success",
        "is_fraudulent": result["is_fraudulent"],
        "reason": result["reason"]
    }


# --- FEATURE 2: ADAPTIVE REPAYMENT ---
class RepaymentRequest(BaseModel):
    tx_per_month: float
    avg_days_between_tx: float

@app.post("/api/v1/repayment-schedule")
def generate_schedule(data: RepaymentRequest):
    features = data.model_dump()
    schedule = get_repayment_schedule(features)
    
    return {
        "status": "success",
        "data": schedule
    }

    
# --- FEATURE 4: DYNAMIC INTEREST RATE ---
class InterestRateRequest(BaseModel):
    trust_score: int
    loan_duration_days: int
    vouch_coverage_pct: float

@app.post("/api/v1/interest-rate")
def get_interest_rate(data: InterestRateRequest):
    rate_details = calculate_dynamic_rate(
        data.trust_score, 
        data.loan_duration_days, 
        data.vouch_coverage_pct
    )
    return {"status": "success", "data": rate_details}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)