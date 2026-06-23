import { Input } from "../components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "../components/ui/alert-dialog";

export default function Header({ logout, navigate, handleSearch, searchQuery }: { logout: (navigate: (path: string) => void) => void; navigate: any; handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; searchQuery: string }) {
  return (
    <div className="header">
      <div className="header-nav">
        <div className="header-logo">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
          <span className="logo-text">Summari</span>
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
        <div className="input-container">
          <img src="./src/assets/search.png" alt="Search Icon" className="search-icon" />
          <Input 
            placeholder="Search your notes..." 
            variant="dashboard" 
            className="placeholder:text-gray-700 placeholder:text-md"
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