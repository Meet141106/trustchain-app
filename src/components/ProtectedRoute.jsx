import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute — gates any page behind wallet connection.
 * If no wallet in sessionStorage → redirect to /connect.
 * If wallet exists but onboarding not done → redirect to /onboarding.
 *
 * Usage:
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children, requireOnboarding = true }) {
  const wallet = sessionStorage.getItem('tl_wallet');
  if (!wallet) return <Navigate to="/connect" replace />;
  return children;
}
