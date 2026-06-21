import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/useAuthStore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    await register(username, email, password, navigate);
    setLoading(false);
  };

  return (
    <>
<div className="login-page">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 flex items-center justify-center space-x-3 sm:left-0 sm:translate-x-0 sm:justify-start">
          <img src="./src/assets/summari-logo.png" alt="Logo" className="logo-img" onClick={() => {window.location.href = "/";}} />
          <a href="/" className="logo-text">Summari</a>
        </div>
        <div className="bg-white rounded-4xl shadow-lg p-10 w-full max-w-md space-y-1 flex flex-col mxsm:justify-center sm:h-auto">
          <p className="form-welcome">Create your account</p>
          <p className="form-description">Start capturing thoughts in seconds.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="input-label">Full name</label>
              <Input 
                required 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Your name" 
              />
            </div>
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
                Sign up
              </Button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-8 text-center">
            Already have an account? <Link to="login" className="footer">
              Log in
            </Link>
          </p>
        </div>
        <footer className="absolute bottom-4 text-sm text-gray-500">
          <p>Feito por <a href="https://github.com/KevinContri" target="_blank" rel="noopener noreferrer" className="footer">
            Kevin Contri
          </a></p>
        </footer>
        { loading && 
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div> 
        }
      </div>
    </>
  )
}