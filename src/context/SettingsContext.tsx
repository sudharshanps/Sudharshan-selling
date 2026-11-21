import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanySettings, Service, PortfolioProject, FounderAchievement, PosterItem } from '../types';

interface SettingsContextType {
  settings: CompanySettings;
  services: Service[];
  projects: PortfolioProject[];
  achievements: FounderAchievement[];
  posters: PosterItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
}

const defaultSettings: CompanySettings = {
  name: "SUDHARSHAN_TECH",
  tagline: "Code. Create. Elevate.",
  phone: "+91 97914 95418",
  whatsapp: "+91 97914 95418",
  email: "sudharshantech123@gmail.com",
  personal_email: "sudharshanthemagnet@gmail.com",
  upi_id: "sudharshanthemagnet@okaxis",
  website: "https://sudharshan-tech.onrender.com/",
  instagram: "https://www.instagram.com/sudharshan_tech/",
  github: "https://github.com/sudharshanps",
  linkedin: "https://linkedin.com/in/sudharshan-ps-5a6b9a325",
  address: "No. 16A, Thendral Nagar, Veerakeralam, Coimbatore – 641007, Tamil Nadu, India",
  google_maps_url: "https://www.google.com/maps/search/?api=1&query=No.+16A%2C+Thendral+Nagar%2C+Veerakeralam%2C+Coimbatore+641007%2C+Tamil+Nadu",
  qr_image: "/assets/gpay-qr.jpg",
  logo_image: "/assets/logo.jpg",
  resume_url: "/assets/Sudharshan_PS_Resume.pdf"
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [achievements, setAchievements] = useState<FounderAchievement[]>([]);
  const [posters, setPosters] = useState<PosterItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes, projectsRes, achRes, postersRes] = await Promise.allSettled([
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/services').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/achievements').then(r => r.json()),
        fetch('/api/posters').then(r => r.json())
      ]);

      if (settingsRes.status === 'fulfilled' && settingsRes.value && settingsRes.value.name) {
        setSettings(settingsRes.value);
      }
      if (servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value)) {
        setServices(servicesRes.value);
      }
      if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value)) {
        setProjects(projectsRes.value);
      }
      if (achRes.status === 'fulfilled' && Array.isArray(achRes.value)) {
        setAchievements(achRes.value);
      }
      if (postersRes.status === 'fulfilled' && Array.isArray(postersRes.value)) {
        setPosters(postersRes.value);
      }
    } catch (err) {
      console.warn("Could not load backend data, relying on defaults:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      services,
      projects,
      achievements,
      posters,
      loading,
      refreshData: fetchData,
      updateSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
