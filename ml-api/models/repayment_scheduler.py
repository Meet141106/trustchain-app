import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'repayment_model.joblib')

try:
    saved_data = joblib.load(MODEL_PATH)
    repayment_model = saved_data['model']
    cluster_mapping = saved_data['mapping']
except Exception as e:
    print(f"Error loading repayment model: {e}")
    repayment_model = None
    cluster_mapping = {}

def get_repayment_schedule(features: dict) -> dict:
    """
    Classifies the user and returns the corresponding repayment template.
    """
    if repayment_model is None:
         # Fallback template if model fails to load
        return {
            "archetype": "Default",
            "schedule_type": "Monthly EMI",
            "grace_period_days": 0,
            "recommended_installments": 1
        }

    df = pd.DataFrame([features])
    
    # Predict the cluster ID
    cluster_id = repayment_model.predict(df)[0]
    
    # Map the ID to the archetype
    archetype = cluster_mapping.get(cluster_id, "Unknown")
    
    # Define the repayment templates based on the archetype
    if archetype == "Daily Earner":
        return {
            "archetype": archetype,
            "schedule_type": "Daily Micro-Installments",
            "grace_period_days": 1,
            "recommended_installments": 30 # E.g., 30 daily payments
        }
    elif archetype == "Weekly Earner":
        return {
            "archetype": archetype,
            "schedule_type": "Weekly Installments",
            "grace_period_days": 3,
            "recommended_installments": 4 # E.g., 4 weekly payments
        }
    else: # Seasonal Earner
        return {
            "archetype": archetype,
            "schedule_type": "Lump Sum with Grace Period",
            "grace_period_days": 30, # Allow time for harvest/festival cycle
            "recommended_installments": 1 # One big payment at the end
        }