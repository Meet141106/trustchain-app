import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'fraud_model.joblib')

try:
    fraud_model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading fraud model: {e}")
    fraud_model = None

def check_fraud_risk(features: dict) -> dict:
    flags = []
    is_fraud = False

    # 1. Hard Rule: Velocity (Spam Check)
    if features['vouch_requests_24h'] > 10:
        is_fraud = True
        flags.append("Velocity Limit Exceeded")

    # 2. Hard Rule: Account Maturity (Sybil Resistance)
    # Updated to 7 days to match your stronger security design
    if features['avg_voucher_account_age_days'] < 7:
        is_fraud = True
        flags.append("Vouchers are too new (<7 days)")

    # 3. AI Anomaly Detection (Clustering Check)
    if fraud_model is not None:
        df = pd.DataFrame([features])
        prediction = fraud_model.predict(df)[0]
        if prediction == -1:
            is_fraud = True
            flags.append("AI Anomaly Flagged")

    # 4. Final Evaluation
    if is_fraud:
        # This joins all tripped flags with a " | " so you can see exactly how many rules they broke
        combined_reasons = " | ".join(flags)
        return {"is_fraudulent": True, "reason": combined_reasons}
        
    return {"is_fraudulent": False, "reason": "Account behavior appears normal"}