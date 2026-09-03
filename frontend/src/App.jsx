import React, { useState } from 'react';
import IthenthinaLanding from '../IthenthinaLanding.jsx';
import SoloMode from './SoloMode.jsx';
import HallModal from './HallModal.jsx';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'solo'
  const [isHallOpen, setIsHallOpen] = useState(false);

  return (
    <>
      {currentView === 'home' && (
        <IthenthinaLanding
          onStartSolo={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentView('solo');
          }}
          onOpenHall={() => setIsHallOpen(true)}
        />
      )}

      {currentView === 'solo' && (
        <SoloMode
          onBack={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentView('home');
          }}
          onOpenHall={() => setIsHallOpen(true)}
        />
      )}

      {/* Hall of Uselessness Modal Accessible Everywhere */}
      <HallModal
        isOpen={isHallOpen}
        onClose={() => setIsHallOpen(false)}
      />
    </>
  );
}

export default App;
