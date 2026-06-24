import { Input } from "../components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "../components/ui/alert-dialog";
import { useThemeStore } from "../contexts/useThemeStore";

export default function Header({ logout, navigate, handleSearch, searchQuery }: { logout: (navigate: (path: string) => void) => void; navigate: any; handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; searchQuery: string }) {
  const { theme } = useThemeStore();

  return (
    <div className="header">
      <div className="header-nav">
        <div className="header-logo">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
          <span className={`${theme === 'dark' ? "logo-text-dark" : "logo-text"}`}>Summari</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="logout-container-mobile" title="Logout">
              <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[#D06D3D]" onClick={() => logout(navigate)}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="header-right">  
        <div className={`${theme === 'dark' ? "input-container-dark" : "input-container"}`}>
          <img src="./src/assets/search.png" alt="Search Icon" className={`${theme === 'dark' ? "search-icon-dark" : "search-icon"}`} />
          <Input 
            placeholder="Search your notes..." 
            variant="dashboard" 
            className={`${theme === 'dark' ? 'placeholder:text-[#ffffff6d] text-[#ffffffd3]' : 'placeholder:text-[#000000a5] text-[#000000a5]'}`}
            value={searchQuery}
            onChange={handleSearch}/>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="logout-container-desktop" title="Logout">
              <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-[#D06D3D]" onClick={() => logout(navigate)}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}