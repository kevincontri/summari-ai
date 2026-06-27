import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../contexts/useAuthStore";
import Loading from "../components/Loading";
import DarkModeSwitch from "../components/DarkModeSwitch";
import { useThemeStore } from "../contexts/useThemeStore";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import summariLogo from "../assets/summari-logo.svg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = useThemeStore((state) => state.theme);

  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validation checks
    if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    if (username.trim().length < 3 || username.trim().length > 100) {
      toast.error("Username must be between 3 and 100 characters.");
      return;
    }
    if (email.trim().length < 3 || email.trim().length > 100) {
      toast.error("Email must be between 3 and 100 characters.");
      return;
    }
    if (password.trim().length < 8 || password.trim().length > 30) {
      toast.error("Password must be between 8 and 30 characters.");
      return;
    }
 
    // Set loading state and call register function
    setLoading(true);
    try {
      await register(username, email, password, navigate);
    } catch (error) {
      if (error instanceof Error && error.message.includes("400")) {
        toast.error("Registration failed: Invalid input");
      } else if (error instanceof Error && error.message.includes("409")) {
        toast.error("Registration failed: Email already in use");
      } else {
        toast.error("Registration failed: Unknown error (Check console for more details)");
      }
      console.error('Registration failed', error);
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" richColors theme={theme} />
      <div className={theme === 'dark' ? "page-dark" : "page"}>
        {theme === 'dark' && <div className="absolute top-0 right-0 w-100 h-90 md:bg-orange-500 rounded-full blur-[180px] opacity-40 pointer-events-none" />}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full p-4 flex items-center justify-center space-x-3 sm:left-0 sm:translate-x-0 sm:justify-start">
          <img src={summariLogo} alt="Logo" className="logo-img" onClick={() => {window.location.href = "/";}} />
          <a href="/" className={theme === 'dark' ? "logo-text-dark" : "logo-text"}>Summari</a>
        </div>
        <div className={`${theme === 'dark' ? "bg-[#1E231F]" : "bg-[#FAF3EE]"} rounded-4xl shadow-lg p-10 w-full max-w-md space-y-1 flex flex-col mxsm:justify-center sm:h-auto`}>
          <p className={`${theme === 'dark' ? "form-welcome-dark" : "form-welcome"}`}>Create your account</p>
          <p className={`${theme === 'dark' ? "form-description-dark" : "form-description"}`}>Start capturing thoughts in seconds.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`${theme === 'dark' ? "input-label-dark" : "input-label"}`}>Full name</label>
              <Input 
                required 
                type="text" 
                id="username" 
                variant={theme === 'dark' ? "darkMode" : "login"}
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Your name" 
              />
            </div>
            <div>
              <label htmlFor="email" className={`${theme === 'dark' ? "input-label-dark" : "input-label"}`}>Email</label>
              <Input 
                required 
                type="email" 
                id="email" 
                variant={theme === 'dark' ? "darkMode" : "login"}
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
                Sign up
              </Button>
            </div>
          </form>
          <p className={`${theme === 'dark' ? "text-sm text-gray-300" : "text-sm text-gray-600"} mt-8 text-center`}>
            Already have an account? <Link to="login" className="footer">
              Log in
            </Link>
          </p>
        </div>
        <footer className={`absolute bottom-4 text-sm ${theme === 'dark' ? "text-gray-300" : "text-gray-500"}`}>
          <p>Feito por <a href="https://github.com/KevinContri" target="_blank" rel="noopener noreferrer" className="footer">
            Kevin Contri
          </a></p>
        </footer>
        { loading && 
        <Loading /> 
        }
      </div>
      <DarkModeSwitch />
    </>
  )
}