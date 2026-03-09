import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Menu, Home, Clock, Map, Users, Building2, User, Palette, BookOpen, Scroll } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'home', label: 'Accueil', icon: Home },
  { id: 'periodes', label: 'Périodes', icon: Clock },
  { id: 'atlas', label: 'Atlas', icon: Map },
  { id: 'peuples', label: 'Peuples', icon: Users },
  { id: 'villes', label: 'Villes', icon: Building2 },
  { id: 'personnages', label: 'Personnages', icon: User },
  { id: 'arts', label: 'Arts', icon: Palette },
  { id: 'quiz', label: 'Quiz', icon: BookOpen },
  { id: 'glossaire', label: 'Glossaire', icon: BookOpen },
];

const Header = () => {
  const { 
    activeSection, 
    setActiveSection, 
    searchOpen, 
    setSearchOpen, 
    searchQuery, 
    setSearchQuery,
    searchResults,
    openDrawer
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const results = searchResults();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setSearchOpen]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setSearchOpen(false); // Close search when navigating
    setSearchQuery(''); // Clear search query
  };

  const handleSearchResultClick = (result) => {
    openDrawer(result.type, result.id);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Main Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-border"
        data-testid="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => handleNavClick('home')}
              data-testid="logo"
            >
              <span className="text-gold text-2xl">✦</span>
              <div>
                <h1 className="font-heading text-xl md:text-2xl text-gold tracking-wider">EHIA</h1>
                <p className="font-ui text-[10px] md:text-xs text-earth tracking-widest uppercase hidden sm:block">
                  Encyclopédie Historique de l'Algérie
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
              {navItems.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link px-3 py-2 ${activeSection === item.id ? 'active' : ''}`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gold/10 transition-colors"
                aria-label="Rechercher"
                data-testid="search-btn"
              >
                <Search size={20} className="text-earth" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gold/10 transition-colors"
                aria-label="Menu"
                data-testid="mobile-menu-btn"
              >
                <Menu size={20} className="text-earth" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav 
            className="lg:hidden border-t border-border bg-parchment/95 backdrop-blur-sm"
            data-testid="mobile-nav"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded transition-colors ${
                    activeSection === item.id ? 'bg-gold/10 text-gold' : 'text-earth hover:bg-gold/5'
                  }`}
                  data-testid={`mobile-nav-${item.id}`}
                >
                  <item.icon size={20} />
                  <span className="font-ui text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Search Overlay */}
      <div 
        className={`search-overlay ${searchOpen ? 'open' : ''}`}
        data-testid="search-overlay"
      >
        <button
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery('');
          }}
          className="absolute top-6 right-6 p-2 hover:bg-gold/10 transition-colors"
          aria-label="Fermer"
          data-testid="search-close-btn"
        >
          <X size={24} className="text-earth" />
        </button>

        <div className="w-full max-w-3xl px-6">
          <div className="relative">
            <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-gold" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans l'encyclopédie..."
              className="search-input pl-10"
              data-testid="search-input"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-8 max-h-[50vh] overflow-y-auto" data-testid="search-results">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <button
                      key={`${result.type}-${result.id}-${index}`}
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full text-left p-4 bg-parchment-dark hover:bg-gold/10 border border-transparent hover:border-gold transition-all"
                      data-testid={`search-result-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-ui text-xs uppercase tracking-wider text-gold bg-gold/10 px-2 py-1">
                          {result.type}
                        </span>
                        <div>
                          <p className="font-subheading text-lg text-ink">{result.nom}</p>
                          {result.description && (
                            <p className="font-caption italic text-sm text-earth/70 mt-1">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-earth/60 font-body">
                  Aucun résultat pour "{searchQuery}"
                </p>
              )}
            </div>
          )}

          {/* Search hints */}
          {!searchQuery && (
            <div className="mt-8 text-center">
              <p className="font-caption italic text-earth/60">
                Recherchez parmi les personnages, villes, périodes, sites et termes du glossaire
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
