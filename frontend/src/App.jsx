import React, { useState, useEffect } from 'react';
import IthenthinaLanding from '../IthenthinaLanding.jsx';
import SoloMode from './SoloMode.jsx';
import HallPage from './HallPage.jsx';
import LoginPage from './LoginPage.jsx';

function App() {
  // 'home' | 'solo' | 'hall' | 'login'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#login') {
      return 'login';
    }
    return 'home';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('ithenthina_token') : null;
      if (!token) return null;
      const stored = localStorage.getItem('ithenthina_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setCurrentView('login');
      } else if (window.location.hash === '#hall') {
        setCurrentView('hall');
      } else if (window.location.hash === '#solo') {
        setCurrentView('solo');
      } else if (!window.location.hash || window.location.hash === '#home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const goHome = () => {
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('home');
  };

  const goToLogin = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('login');
  };

  const handleLogout = () => {
    localStorage.removeItem('ithenthina_token');
    localStorage.removeItem('ithenthina_user');
    setCurrentUser(null);
  };

  return (
    <>
      {currentView === 'home' && (
        <IthenthinaLanding
          currentUser={currentUser}
          onLogout={handleLogout}
          onStartSolo={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentView('solo');
          }}
          onOpenHall={() => setCurrentView('hall')}
          onOpenLogin={goToLogin}
        />
      )}

      {currentView === 'solo' && (
        <SoloMode
          onBack={goHome}
          onOpenHall={() => setCurrentView('hall')}
        />
      )}

      {currentView === 'hall' && (
        <HallPage onBack={goHome} />
      )}

      {currentView === 'login' && (
        <LoginPage
          onBack={goHome}
          onSuccess={(user) => {
            if (user) setCurrentUser(user);
            goHome();
          }}
        />
      )}
    </>
  );
}

export default App;
