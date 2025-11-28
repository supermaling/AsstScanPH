import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { LGUDashboard } from './components/LGUDashboard';
import { BeneficiaryDashboard } from './components/BeneficiaryDashboard';

export type UserRole = 'lgu' | 'beneficiary' | null;

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (currentUser.role === 'lgu') {
    return <LGUDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <BeneficiaryDashboard user={currentUser} onLogout={handleLogout} />;
}
