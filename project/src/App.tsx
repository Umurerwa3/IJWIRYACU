import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ReportIssue from './components/ReportIssue';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderContent = () => {
    switch (currentSection) {
      case 'report':
        return <ReportIssue />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <>
            <Hero setCurrentSection={setCurrentSection} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;