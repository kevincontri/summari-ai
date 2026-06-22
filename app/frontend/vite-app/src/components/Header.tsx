import { Input } from "../components/ui/input";

export default function Header({ logout, navigate }: { logout: (navigate: (path: string) => void) => void; navigate: any }) {
  return (
    <div className="header">
      <div className="header-nav">
        <div className="header-logo">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
          <span className="logo-text">Summari</span>
        </div>
        <div onClick={() => logout(navigate)} className="logout-container-mobile" title="Logout">
          <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
        </div>
      </div>
      <div className="header-right">  
        <div className="input-container">
          <img src="./src/assets/search.png" alt="Search Icon" className="search-icon" />
          <Input placeholder="Search your notes..." variant="dashboard" className="placeholder:text-gray-700 placeholder:text-md"/>
        </div>
        <div onClick={() => logout(navigate)} className="logout-container-desktop" title="Logout">
            <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
        </div>
      </div>
    </div>
  )
}