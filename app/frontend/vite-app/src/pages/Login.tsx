import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/useAuthStore";
import Loading from "../components/Loading";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useThemeStore } from "../contexts/useThemeStore";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const login = useAuthStore((state) => state.login);
  const theme = useThemeStore((state) => state.theme);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, navigate);
    setLoading(false);
  };

  return (
    <>
      <div className={theme === 'dark' ? "page-dark" : "page"}>
        {theme === 'dark' && <div className="absolute top-0 right-0 w-100 h-90 bg-orange-500 rounded-full blur-[180px] opacity-40" />}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 flex items-center justify-center space-x-2 sm:left-0 sm:translate-x-0 sm:justify-start">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" onClick={() => {window.location.href = "/";}} />
          <span className={theme === 'dark' ? "logo-text-dark" : "logo-text"}>Summari</span>
        </div>
        <div className={`${theme === 'dark' ? "bg-[#1E231F]" : "bg-[#FAF3EE]"} rounded-4xl shadow-lg p-10 w-full max-w-md space-y-1 flex flex-col mxsm:justify-center sm:h-auto`}>
          <p className={`${theme === 'dark' ? "form-welcome-dark" : "form-welcome"}`}>Welcome!</p>
          <p className={`${theme === 'dark' ? "form-description-dark" : "form-description"}`}>Sign in to your second brain.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={`${theme === 'dark' ? "input-label-dark" : "input-label"}`}>Email</label>
              <Input 
                required 
                type="email" 
                variant={theme === 'dark' ? "darkMode" : "login"}
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className={`${theme === 'dark' ? "input-label-dark" : "input-label"}`}>Password</label>
              <Input 
                required 
                type="password" 
                id="password" 
                variant={theme === 'dark' ? "darkMode" : "login"}
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
          <p className={`${theme === 'dark' ? "text-sm text-gray-300" : "text-sm text-gray-600"} mt-8 text-center`}>
            Don't have an account? <Link to="/register" className="footer">
              Sign up
            </Link>
          </p>
        </div>
        <footer className="absolute bottom-4 text-sm">
          <p className={`${theme === 'dark' ? "text-sm text-gray-300" : "text-sm text-gray-600"}`}>
            Feito por <a href="https://github.com/KevinContri" target="_blank" rel="noopener noreferrer" className="footer">
              Kevin Contri
            </a>
          </p>
        </footer>
        { loading && 
        <Loading /> 
        }
        <DarkModeSwitch />
      </div>
    </>
  )
}