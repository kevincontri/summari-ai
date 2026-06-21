import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuthStore((state) => state);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, navigate);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="logo">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" onClick={(e) => {window.location.href = "/";}} />
          <a href="/" className="logo-text">Summari</a>
        </div>
        <div className="form-container">
          <p className="form-welcome">Welcome!</p>
          <p className="form-description">Sign in to your second brain.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="input-label">Email</label>
              <Input 
                required 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="input-label">Password</label>
              <Input 
                required 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="At least 8 characters" 
              />
            </div>
            <div>
              <Button 
                type="submit" 
                variant="login_page" 
                size="xl"
              >
                Log in
              </Button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-8 text-center">
            Don't have an account? <Link to="/register" className="footer">
              Sign up
            </Link>
          </p>
        </div>
        { loading && 
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div> 
        }
      </div>
    </>
  )
}