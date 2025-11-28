import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShieldCheck } from 'lucide-react';
import type { User } from '../App';
import logoImage from 'figma:asset/d4fe7ed72f4e431506c8eb2c54dfb07388af0a92.png';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [lguEmail, setLguEmail] = useState('');
  const [lguPassword, setLguPassword] = useState('');
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [beneficiaryPassword, setBeneficiaryPassword] = useState('');

  const handleLGULogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for LGU staff
    onLogin({
      id: '1',
      name: 'Maria Santos',
      email: lguEmail || 'maria.santos@lgu.gov.ph',
      role: 'lgu'
    });
  };

  const handleBeneficiaryLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login for beneficiary
    onLogin({
      id: 'BEN-2024-001',
      name: 'Juan Dela Cruz',
      email: beneficiaryId || 'juan.delacruz@email.com',
      role: 'beneficiary'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img 
              src={logoImage} 
              alt="AsstScanPH Logo" 
              className="w-24 h-24 object-cover rounded-2xl shadow-2xl"
              style={{ objectPosition: 'center' }}
            />
          </div>
          <h1 className="text-white mb-2">AsstScanPH</h1>
          <p className="text-blue-100">Aid Verification & Claiming System</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-blue-500 rounded"></div>
            <div className="w-8 h-1 bg-yellow-400 rounded"></div>
            <div className="w-8 h-1 bg-red-600 rounded"></div>
          </div>
        </div>

        {/* Login Tabs */}
        <Tabs defaultValue="lgu" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="lgu">LGU Staff</TabsTrigger>
            <TabsTrigger value="beneficiary">Beneficiary</TabsTrigger>
          </TabsList>

          {/* LGU Staff Login */}
          <TabsContent value="lgu">
            <Card>
              <CardHeader>
                <CardTitle>LGU Staff Login</CardTitle>
                <CardDescription>
                  Access the verification and distribution system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLGULogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lgu-email">Official Email</Label>
                    <Input
                      id="lgu-email"
                      type="email"
                      placeholder="staff@lgu.gov.ph"
                      value={lguEmail}
                      onChange={(e) => setLguEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lgu-password">Password</Label>
                    <Input
                      id="lgu-password"
                      type="password"
                      placeholder="Enter your password"
                      value={lguPassword}
                      onChange={(e) => setLguPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" style={{ backgroundColor: '#0038A8' }}>
                    Sign In
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Demo: Use any email to login
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Beneficiary Login */}
          <TabsContent value="beneficiary">
            <Card>
              <CardHeader>
                <CardTitle>Beneficiary Portal</CardTitle>
                <CardDescription>
                  Track your aid and scholarship claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBeneficiaryLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary-id">Beneficiary ID / Email</Label>
                    <Input
                      id="beneficiary-id"
                      type="text"
                      placeholder="BEN-2024-XXXXX or email"
                      value={beneficiaryId}
                      onChange={(e) => setBeneficiaryId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="beneficiary-password">Password</Label>
                    <Input
                      id="beneficiary-password"
                      type="password"
                      placeholder="Enter your password"
                      value={beneficiaryPassword}
                      onChange={(e) => setBeneficiaryPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" style={{ backgroundColor: '#0038A8' }}>
                    Sign In
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Demo: Use any ID to login
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <p className="text-center text-xs text-blue-100 mt-6">
          Republic of the Philippines • Local Government Unit
        </p>
      </div>
    </div>
  );
}