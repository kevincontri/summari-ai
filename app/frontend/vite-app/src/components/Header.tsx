import { Input } from "../components/ui/input";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "../components/ui/alert-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

export default function Header({ logout, navigate, handleSearch, searchQuery, theme }: { logout: (navigate: (path: string) => void) => void; navigate: any; handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; searchQuery: string; theme: string }) {

  return (
    <div className="header">
      <div className="header-nav">
        <div className="header-logo">
          <img src="./src/assets/summari-logo.svg" alt="Logo" className="logo-img" />
          <span className={`${theme === 'dark' ? "logo-text-dark" : "logo-text"}`}>Summari</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Tooltip>
              <TooltipTrigger>
            <div className="logout-container-mobile">
              <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
            </div>
              </TooltipTrigger>
              <TooltipContent side="top">Logout</TooltipContent>
            </Tooltip>
          </AlertDialogTrigger>
          <AlertDialogContent className={theme === 'dark' ? "alert-dialog-content-dark" : "alert-dialog-content"}>
            <AlertDialogHeader>
              <AlertDialogTitle className={theme === 'dark' ? "alert-dialog-title-dark" : "alert-dialog-title"}>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription className={theme === 'dark' ? "alert-dialog-description-dark" : "alert-dialog-description"}>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={theme === 'dark' ? "alert-dialog-cancel-dark" : "alert-dialog-cancel"}>Cancel</AlertDialogCancel>
              <AlertDialogAction className={theme === 'dark' ? "bg-[#545454] hover:bg-[#514033]" : "bg-[#D06D3D] hover:bg-[#B85A3A]"} onClick={() => logout(navigate)}>Logout</AlertDialogAction>
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
            <Tooltip>
              <TooltipTrigger>
            <div className="logout-container-desktop">
              <img src="./src/assets/logout.png" alt="Logout Icon" className="logout-icon" />
            </div>
              </TooltipTrigger>
              <TooltipContent side="top">Logout</TooltipContent>
            </Tooltip>
          </AlertDialogTrigger>
          <AlertDialogContent className={theme === 'dark' ? "alert-dialog-content-dark" : "alert-dialog-content"}>
            <AlertDialogHeader>
              <AlertDialogTitle className={theme === 'dark' ? "alert-dialog-title-dark" : "alert-dialog-title"}>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription className={theme === 'dark' ? "alert-dialog-description-dark" : "alert-dialog-description"}>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={theme === 'dark' ? "alert-dialog-cancel-dark" : "alert-dialog-cancel"}>Cancel</AlertDialogCancel>
              <AlertDialogAction className={theme === 'dark' ? "bg-[#545454] hover:bg-[#514033]" : "bg-[#D06D3D] hover:bg-[#B85A3A]"} onClick={() => logout(navigate)}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}