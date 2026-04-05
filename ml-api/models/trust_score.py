import joblib
import pandas as pd
import os

# Load the model once when the server starts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'trust_score_model.joblib')

try:
    rf_model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}. Make sure trust_score_model.joblib is in the models/ folder.")
    rf_model = None

def calculate_trust_score(features: dict) -> int:
    """
    Takes borrower features, runs them through the RF classifier, 
    and returns a score from 0 to 100 based on class probability.
    """
    if rf_model is None:
        # Fallback for dev if model isn't loaded
        return 30 
        
    df = pd.DataFrame([features])
    
    # predict_proba returns [[prob_class_0, prob_class_1]]
    # We want the probability that they are a good borrower (class 1)
    probability = rf_model.predict_proba(df)[0][1]
    
    # Convert probability to a 0-100 score
    score = int(probability * 100)
    
    # Enforce base limits just in case
    return max(0, min(100, score))