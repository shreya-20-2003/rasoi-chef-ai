import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilitySettings {
  isDyslexiaFont: boolean;
  isHighContrast: boolean;
  language: string;
}

interface AccessibilityContextType extends AccessibilitySettings {
  toggleDyslexiaFont: () => void;
  toggleHighContrast: () => void;
  setLanguage: (lang: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : {
      isDyslexiaFont: false,
      isHighContrast: false,
      language: 'en'
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply dyslexia font
    if (settings.isDyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
    
    // Apply high contrast
    if (settings.isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [settings]);

  const toggleDyslexiaFont = () => {
    setSettings(prev => ({ ...prev, isDyslexiaFont: !prev.isDyslexiaFont }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, isHighContrast: !prev.isHighContrast }));
  };

  const setLanguage = (lang: string) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  return (
    <AccessibilityContext.Provider value={{
      ...settings,
      toggleDyslexiaFont,
      toggleHighContrast,
      setLanguage
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
