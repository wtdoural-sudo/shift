import React, { createContext, useContext, useState, useCallback } from 'react';
import { PERSONNAGES, VILLES, SITES, PERIODES, GLOSSAIRE } from '../data/encyclopediaData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [drawerHistory, setDrawerHistory] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePeriode, setActivePeriode] = useState(null);

  // Open drawer with content
  const openDrawer = useCallback((type, id) => {
    let content = null;

    switch (type) {
      case 'personnage':
        content = { type, data: PERSONNAGES.find(p => p.id === id) };
        break;
      case 'ville':
        content = { type, data: VILLES.find(v => v.id === id) };
        break;
      case 'site':
        content = { type, data: SITES.find(s => s.id === id) };
        break;
      case 'periode':
        content = { type, data: PERIODES.find(p => p.id === id) };
        break;
      case 'glossaire':
        content = { type, data: GLOSSAIRE.find(g => g.terme === id) };
        break;
      default:
        content = null;
    }

    if (content && content.data) {
      setDrawerHistory(prev => [...prev, drawerContent].filter(Boolean));
      setDrawerContent(content);
      setDrawerOpen(true);
    }
  }, [drawerContent]);

  // Close drawer
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => {
      setDrawerContent(null);
      setDrawerHistory([]);
    }, 300);
  }, []);

  // Go back in drawer history
  const goBackInDrawer = useCallback(() => {
    if (drawerHistory.length > 0) {
      const previous = drawerHistory[drawerHistory.length - 1];
      setDrawerHistory(prev => prev.slice(0, -1));
      setDrawerContent(previous);
    } else {
      closeDrawer();
    }
  }, [drawerHistory, closeDrawer]);

  // Search functionality
  const searchResults = useCallback(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search personnages
    PERSONNAGES.forEach(p => {
      if (
        p.nom.toLowerCase().includes(query) ||
        p.biographie.toLowerCase().includes(query)
      ) {
        results.push({ type: 'personnage', id: p.id, nom: p.nom, description: p.statut });
      }
    });

    // Search villes
    VILLES.forEach(v => {
      if (
        v.nom.toLowerCase().includes(query) ||
        v.resume.toLowerCase().includes(query) ||
        v.nomsAnciens?.some(n => n.toLowerCase().includes(query))
      ) {
        results.push({ type: 'ville', id: v.id, nom: v.nom, description: v.nomsAnciens?.join(', ') });
      }
    });

    // Search périodes
    PERIODES.forEach(p => {
      if (
        p.nom.toLowerCase().includes(query) ||
        p.resume.toLowerCase().includes(query)
      ) {
        results.push({ type: 'periode', id: p.id, nom: p.nom, description: p.dates });
      }
    });

    // Search glossaire
    GLOSSAIRE.forEach(g => {
      if (
        g.terme.toLowerCase().includes(query) ||
        g.definition.toLowerCase().includes(query)
      ) {
        results.push({ type: 'glossaire', id: g.terme, nom: g.terme, description: g.categorie });
      }
    });

    // Search sites
    SITES.forEach(s => {
      if (
        s.nom.toLowerCase().includes(query) ||
        s.resume.toLowerCase().includes(query)
      ) {
        results.push({ type: 'site', id: s.id, nom: s.nom, description: s.type });
      }
    });

    return results.slice(0, 20);
  }, [searchQuery]);

  const value = {
    activeSection,
    setActiveSection,
    drawerOpen,
    drawerContent,
    drawerHistory,
    openDrawer,
    closeDrawer,
    goBackInDrawer,
    searchOpen,
    setSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    activePeriode,
    setActivePeriode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
