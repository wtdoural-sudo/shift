import React from 'react';
import "@/App.css";
import { AppProvider, useApp } from './context/AppContext';

// Components
import Header from './components/Header';
import Drawer from './components/Drawer';
import Footer from './components/Footer';

// Pages
import HomePage from './components/HomePage';
import PeriodesPage from './components/PeriodesPage';
import AtlasPage from './components/AtlasPage';
import PeuplesPage from './components/PeuplesPage';
import VillesPage from './components/VillesPage';
import PersonnagesPage from './components/PersonnagesPage';
import ArtsPage from './components/ArtsPage';
import FrisesPage from './components/FrisesPage';
import GlossairePage from './components/GlossairePage';
import BibliographiePage from './components/BibliographiePage';

const MainContent = () => {
  const { activeSection } = useApp();

  const renderPage = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'periodes':
        return <PeriodesPage />;
      case 'atlas':
        return <AtlasPage />;
      case 'peuples':
        return <PeuplesPage />;
      case 'villes':
        return <VillesPage />;
      case 'personnages':
        return <PersonnagesPage />;
      case 'arts':
        return <ArtsPage />;
      case 'frises':
        return <FrisesPage />;
      case 'glossaire':
        return <GlossairePage />;
      case 'bibliographie':
        return <BibliographiePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1" data-testid="main-content">
        {renderPage()}
      </main>
      <Footer />
      <Drawer />
    </div>
  );
};

function App() {
  return (
    <div className="App" data-testid="app-container">
      <AppProvider>
        <MainContent />
      </AppProvider>
    </div>
  );
}

export default App;
