import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Background } from './components/Layout/Background';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './components/Home';
import { Bio } from './components/Bio/BentoGrid';
import { SmartGallery } from './components/Gallery/SmartGallery';
import { ArcadeHub } from './components/Arcade/ArcadeHub';
import { PageState } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>(PageState.HOME);

  const renderPage = () => {
    switch (currentPage) {
      case PageState.HOME:
        return <Home onNavigate={setCurrentPage} />;
      case PageState.BIO:
        return <Bio />;
      case PageState.GALLERY:
        return <SmartGallery />;
      case PageState.ARCADE:
        return <ArcadeHub />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Dynamic Background */}
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation - Always visible except maybe initial load if we wanted a splash screen */}
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-8 md:px-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;