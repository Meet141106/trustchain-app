def calculate_dynamic_rate(trust_score: int, loan_duration_days: int, vouch_coverage_pct: float) -> dict:
    """
    Calculates the P2P interest rate based on risk, time-value of money, and social collateral.
    """
    # 1. Base Rate
    base_rate = 3.0  # 3% absolute baseline for lenders
    
    # 2. Risk Premium (Higher trust score = lower risk premium)
    # E.g., Score 100 adds 0%. Score 30 adds 10.5%.
    risk_premium = max(0.0, (100 - trust_score) * 0.15)
    
    # 3. Duration Premium (Longer lockup = higher rate)
    # Lenders need higher yield if their money is locked up longer. Roughly 5% per year.
    duration_premium = (loan_duration_days / 365.0) * 5.0
    
    # 4. Vouch Discount (Social Collateral reduces risk)
    # If a loan is 100% vouched (1.0), they get a massive 6% discount on the rate.
    coverage = max(0.0, min(1.0, vouch_coverage_pct))
    vouch_discount = coverage * 6.0
        
    # Total Rate calculation
    total_rate = base_rate + risk_premium + duration_premium - vouch_discount
    
    # Hard floor: Rates can never drop below 1% regardless of discounts
    total_rate = max(1.0, total_rate)
    
    return {
        "base_rate_pct": round(base_rate, 2),
        "risk_premium_pct": round(risk_premium, 2),
        "duration_premium_pct": round(duration_premium, 2),
        "vouch_discount_pct": round(vouch_discount, 2),
        "total_interest_rate_pct": round(total_rate, 2)
    }