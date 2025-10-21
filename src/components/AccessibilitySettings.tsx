import { Settings, Moon, Sun, Type, Contrast, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { value: 'ml', label: 'മലയാളം (Malayalam)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings & Accessibility</DialogTitle>
          <DialogDescription>
            Customize your experience with accessibility features
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <Label htmlFor="dark-mode" className="cursor-pointer">
                Dark Mode
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>

          {/* Dyslexia Font */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type className="h-5 w-5" />
              <Label htmlFor="dyslexia-font" className="cursor-pointer">
                Dyslexia-Friendly Font
              </Label>
            </div>
            <Switch
              id="dyslexia-font"
              checked={isDyslexiaFont}
              onCheckedChange={toggleDyslexiaFont}
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Contrast className="h-5 w-5" />
              <Label htmlFor="high-contrast" className="cursor-pointer">
                High Contrast Mode
              </Label>
            </div>
            <Switch
              id="high-contrast"
              checked={isHighContrast}
              onCheckedChange={toggleHighContrast}
            />
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5" />
              <Label>Language</Label>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccessibilitySettings;
