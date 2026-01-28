import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { CustomerAuth } from './views/CustomerAuth';
import { Dashboard } from './views/Dashboard';
import { GenericLogin } from './views/GenericLogin';
import { ViewState, User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User | null>(null);

  // Router Logic
  const renderView = () => {
    // If logged in as customer, show dashboard
    if (user && user.role === 'customer' && currentView !== ViewState.HOME) {
       return <Dashboard user={user} onLogout={() => { setUser(null); setCurrentView(ViewState.LOGIN_CUSTOMER); }} />;
    }

    switch (currentView) {
      case ViewState.HOME:
        return <Home onNavigate={setCurrentView} />;
      
      case ViewState.LOGIN_CUSTOMER:
      case ViewState.REGISTER_CUSTOMER:
        return (
          <CustomerAuth 
            initialView={currentView} 
            onNavigate={setCurrentView} 
            onLogin={(u) => { setUser(u); setCurrentView(ViewState.DASHBOARD_CUSTOMER); }}
          />
        );

      case ViewState.DASHBOARD_CUSTOMER:
         if (!user) return <Home onNavigate={setCurrentView} />;
         return <Dashboard user={user} onLogout={() => { setUser(null); setCurrentView(ViewState.LOGIN_CUSTOMER); }} />;

      case ViewState.LOGIN_ADMIN:
      case ViewState.LOGIN_DELIVERY:
      case ViewState.LOGIN_OFFICE:
        return <GenericLogin view={currentView} />;

      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
        {renderView()}
    </Layout>
  );
}

export default App;