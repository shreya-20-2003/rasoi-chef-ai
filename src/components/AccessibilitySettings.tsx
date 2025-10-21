import { Settings, Moon, Sun, Type, Contrast, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useEffect, useState } from "react";

const AccessibilitySettings = () => {
  const {
    isDyslexiaFont,
    isHighContrast,
    language,
    toggleDyslexiaFont,
    toggleHighContrast,
    setLanguage
  } = useAccessibility();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ' },
    { value: 'gu', label: 'ગુજરાતી' },
    { value: 'ml', label: 'മലയാളം' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'mr', label: 'मराठी' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Settings & Accessibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Dark Mode */}
        <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="text-sm">Dark Mode</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </DropdownMenuItem>

        {/* Dyslexia Font */}
        <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span className="text-sm">Dyslexia Font</span>
          </div>
          <Switch
            checked={isDyslexiaFont}
            onCheckedChange={toggleDyslexiaFont}
          />
        </DropdownMenuItem>

        {/* High Contrast */}
        <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-2">
            <Contrast className="h-4 w-4" />
            <span className="text-sm">High Contrast</span>
          </div>
          <Switch
            checked={isHighContrast}
            onCheckedChange={toggleHighContrast}
          />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        {/* Language Selection */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Languages className="h-4 w-4" />
            <Label className="text-sm font-medium">Language</Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilitySettings;
