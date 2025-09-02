
import React, { useState } from 'react';
import { Ticket, User, ModalContent } from './types';
import Header from './components/Header';
import Welcome from './components/Welcome';
import QuickActions from './components/QuickActions';
import Alerts from './components/Alerts';
import Events from './components/Events';
import Promotions from './components/Promotions';
import LocationsAndServices from './components/LocationsAndServices';
import TicketSystem from './components/TicketSystem';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RealTimeInfoBar from './components/RealTimeInfoBar';
import LoginPrompt from './components/LoginPrompt';
import AppointmentReminder from './components/AppointmentReminder';
import InfoModal from './components/InfoModal';

const App: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const addTicket = (newTicket: Ticket) => {
    setTickets(prevTickets => [newTicket, ...prevTickets]);
  };

  const handleLogin = () => {
    setUser({
      name: 'County Resident',
      email: 'resident@albany.ny',
      avatarUrl: 'https://via.placeholder.com/150/92c950/ffffff?text=CR'
    });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  const handleQuickAction = (content: ModalContent) => {
    setModalContent(content);
    setIsInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogoutClick={handleLogout} 
      />
      <RealTimeInfoBar />
      <main className="p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <Welcome user={user} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {user ? (
                <>
                  <QuickActions onActionClick={handleQuickAction} />
                  <TicketSystem tickets={tickets} addTicket={addTicket} />
                  <AppointmentReminder />
                </>
              ) : (
                <LoginPrompt onLoginClick={() => setIsLoginModalOpen(true)} />
              )}
              <Events />
              <LocationsAndServices />
            </div>
            <div className="space-y-8">
              {user && <Alerts />}
              <Promotions />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={modalContent?.title || ''}
      >
        {modalContent?.body}
      </InfoModal>
    </div>
  );
};

export default App;
