import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useIsAuthenticated(): boolean {
  const accessToken = sessionStorage.getItem("access_token");
  return !!accessToken;
}

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
