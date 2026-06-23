import { Switch } from "./ui/switch"
import { useThemeStore } from "../contexts/useThemeStore";

export default function DarkModeSwitch() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="bg-white dark:bg-gray-800 py-2 px-4 rounded-full fixed bottom-4 right-4 flex items-center space-x-2 z-50 shadow-lg">
      <Switch size="sm" checked={theme === 'dark'} onCheckedChange={toggleTheme} />
      <span className="text-xs text-gray-600 dark:text-gray-300">Dark Mode</span>
    </div>
  )
}
