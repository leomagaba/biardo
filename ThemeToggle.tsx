import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 hover:bg-accent/10 hover:border-accent/30 border border-transparent smooth-transition hover:shadow-neon-secondary group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 smooth-transition"></div>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-accent relative z-10" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary z-10" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggle;