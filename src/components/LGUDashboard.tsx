import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { LogOut, QrCode, Clock, FileText, AlertTriangle, Users } from 'lucide-react';
import type { User } from '../App';
import { QRScanner } from './QRScanner';
import { QueueManagement } from './QueueManagement';
import { TransactionLogs } from './TransactionLogs';
import { FlaggedCases } from './FlaggedCases';
import logoImage from 'figma:asset/d4fe7ed72f4e431506c8eb2c54dfb07388af0a92.png';

interface LGUDashboardProps {
  user: User;
  onLogout: () => void;
}

export function LGUDashboard({ user, onLogout }: LGUDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="shadow-lg sticky top-0 z-40" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #002D85 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="AsstScanPH Logo" 
                className="w-12 h-12 object-cover rounded-lg"
                style={{ objectPosition: 'center' }}
              />
              <div>
                <h1 className="mb-1 text-white">AsstScanPH</h1>
                <p className="text-blue-100 text-sm">LGU Verification Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white">{user.name}</p>
                <p className="text-xs text-blue-100">{user.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Overview Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-white" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #002D85 100%)' }}>
                <CardHeader className="pb-2">
                  <CardDescription className="text-blue-100">Today's Verified</CardDescription>
                  <CardTitle className="text-white">247</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-100">+23 from yesterday</p>
                </CardContent>
              </Card>

              <Card className="text-white" style={{ background: 'linear-gradient(135deg, #FCD116 0%, #E6B800 100%)' }}>
                <CardHeader className="pb-2">
                  <CardDescription className="text-yellow-900">Claims Processed</CardDescription>
                  <CardTitle className="text-yellow-900">189</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-900">₱2,834,500 released</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-orange-100">In Queue</CardDescription>
                  <CardTitle className="text-white">34</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-100">Avg wait: 12 mins</p>
                </CardContent>
              </Card>

              <Card className="text-white" style={{ background: 'linear-gradient(135deg, #CE1126 0%, #A00F1E 100%)' }}>
                <CardHeader className="pb-2">
                  <CardDescription className="text-red-100">Flagged Cases</CardDescription>
                  <CardTitle className="text-white">7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-100">Requires review</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for aid distribution</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={() => setActiveTab('scan')}
                  className="h-auto py-4"
                  style={{ backgroundColor: '#0038A8' }}
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Start Scanning QR Codes
                </Button>
                <Button 
                  onClick={() => setActiveTab('queue')}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Manage Queue
                </Button>
                <Button 
                  onClick={() => setActiveTab('logs')}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  View Transaction Logs
                </Button>
                <Button 
                  onClick={() => setActiveTab('flagged')}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Review Flagged Cases
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest verifications and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: 'BEN-2024-1234', name: 'Maria Reyes', type: 'AKAP', amount: '₱3,000', status: 'completed', time: '2 mins ago' },
                    { id: 'BEN-2024-1235', name: 'Jose Garcia', type: 'Scholarship', amount: '₱10,000', status: 'completed', time: '5 mins ago' },
                    { id: 'BEN-2024-1236', name: 'Ana Cruz', type: 'TUPAD', amount: '₱6,000', status: 'pending', time: '8 mins ago' },
                    { id: 'BEN-2024-1237', name: 'Pedro Santos', type: 'AKAP', amount: '₱3,000', status: 'flagged', time: '12 mins ago' },
                  ].map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p>{activity.name}</p>
                        <p className="text-sm text-gray-600">{activity.id} • {activity.type}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p>{activity.amount}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : activity.status === 'flagged' ? 'destructive' : 'secondary'}
                        style={activity.status === 'completed' ? { backgroundColor: '#FCD116', color: '#1a1a1a' } : {}}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scan Tab */}
          <TabsContent value="scan" className="mt-0">
            <QRScanner />
          </TabsContent>

          {/* Queue Tab */}
          <TabsContent value="queue" className="mt-0">
            <QueueManagement />
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="mt-0">
            <TransactionLogs />
          </TabsContent>

          {/* Flagged Tab */}
          <TabsContent value="flagged" className="mt-0">
            <FlaggedCases />
          </TabsContent>

          {/* Bottom Tab Navigation */}
          <TabsList className="fixed bottom-0 left-1/2 -translate-x-1/2 h-16 flex bg-white border-t shadow-lg rounded-none z-50 p-1 max-w-md w-full">
            <TabsTrigger value="dashboard" className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50" style={{ '--active-color': '#0038A8' } as any}>
              <Users className="w-5 h-5" style={activeTab === 'dashboard' ? { color: '#0038A8' } : {}} />
              <span className="text-xs" style={activeTab === 'dashboard' ? { color: '#0038A8' } : {}}>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50">
              <Clock className="w-5 h-5" style={activeTab === 'queue' ? { color: '#0038A8' } : {}} />
              <span className="text-xs" style={activeTab === 'queue' ? { color: '#0038A8' } : {}}>Queue</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50">
              <QrCode className="w-5 h-5" style={activeTab === 'scan' ? { color: '#0038A8' } : {}} />
              <span className="text-xs" style={activeTab === 'scan' ? { color: '#0038A8' } : {}}>Scan</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50">
              <FileText className="w-5 h-5" style={activeTab === 'logs' ? { color: '#0038A8' } : {}} />
              <span className="text-xs" style={activeTab === 'logs' ? { color: '#0038A8' } : {}}>Logs</span>
            </TabsTrigger>
            <TabsTrigger value="flagged" className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50">
              <AlertTriangle className="w-5 h-5" style={activeTab === 'flagged' ? { color: '#0038A8' } : {}} />
              <span className="text-xs" style={activeTab === 'flagged' ? { color: '#0038A8' } : {}}>Flagged</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  );
}