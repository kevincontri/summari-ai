import { Switch } from "./ui/switch"
import { useThemeStore } from "../contexts/useThemeStore";

export default function DarkModeSwitch() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={`${theme !== 'dark' ? "bg-[#090909c3]" : "bg-[#faf3eecd]"}  py-2 px-4 rounded-full fixed bottom-4 right-4 flex items-center space-x-2 z-50 shadow-lg`}>
      <Switch size="sm" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <span className={theme === 'dark' ? "text-xs text-[#000000]" : "text-xs text-[#ffffff]"}>Dark Mode</span>
    </div>
  )
}
