import React, { useState } from 'react';
import IthenthinaLanding from '../IthenthinaLanding.jsx';
import SoloMode from './SoloMode.jsx';
import HallPage from './HallPage.jsx';

function App() {
  // 'home' | 'solo' | 'hall'
  const [currentView, setCurrentView] = useState('home');

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' && (
        <IthenthinaLanding
          onStartSolo={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentView('solo');
          }}
          onOpenHall={() => setCurrentView('hall')}
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
    </>
  );
}

export default App;
