import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useStore";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-semibold text-center mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">Fashion Hub Chitwan</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="fashion-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="fashion-input"
              placeholder="admin@fashion.com"
            />
          </div>
          <div>
            <label className="fashion-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="fashion-input"
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <button type="submit" className="fashion-btn-primary w-full text-xs">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
