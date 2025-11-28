import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, User, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface QueueItem {
  id: string;
  number: number;
  name: string;
  program: string;
  status: 'waiting' | 'serving' | 'completed';
  waitTime: string;
  amount: string;
}

export function QueueManagement() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    { id: '1', number: 101, name: 'Maria Santos', program: 'AKAP', status: 'serving', waitTime: '5 mins', amount: '₱3,000' },
    { id: '2', number: 102, name: 'Juan Cruz', program: 'Scholarship', status: 'waiting', waitTime: '12 mins', amount: '₱10,000' },
    { id: '3', number: 103, name: 'Ana Garcia', program: 'TUPAD', status: 'waiting', waitTime: '18 mins', amount: '₱6,000' },
    { id: '4', number: 104, name: 'Pedro Reyes', program: 'AKAP', status: 'waiting', waitTime: '24 mins', amount: '₱3,000' },
    { id: '5', number: 105, name: 'Rosa Mendoza', program: 'Senior Citizen Aid', status: 'waiting', waitTime: '30 mins', amount: '₱5,000' },
  ]);

  const handleServe = (id: string) => {
    setQueueItems(items =>
      items.map(item => {
        if (item.id === id) return { ...item, status: 'serving' as const };
        if (item.status === 'serving') return { ...item, status: 'waiting' as const };
        return item;
      })
    );
  };

  const handleComplete = (id: string) => {
    setQueueItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status: 'completed' as const } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setQueueItems(items => items.filter(item => item.id !== id));
  };

  const waitingCount = queueItems.filter(i => i.status === 'waiting').length;
  const servingCount = queueItems.filter(i => i.status === 'serving').length;

  return (
    <div className="space-y-6">
      {/* Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-white" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #002D85 100%)' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">In Queue</CardDescription>
            <CardTitle className="text-white">{waitingCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-100">Waiting to be served</p>
          </CardContent>
        </Card>

        <Card className="text-white" style={{ background: 'linear-gradient(135deg, #FCD116 0%, #E6B800 100%)' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-yellow-900">Currently Serving</CardDescription>
            <CardTitle className="text-yellow-900">{servingCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-900">Being processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Wait Time</CardDescription>
            <CardTitle className="text-orange-600">12 mins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Current average</p>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Management</CardTitle>
          <CardDescription>Current beneficiaries in line</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queueItems.filter(item => item.status !== 'completed').map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border-2 ${
                  item.status === 'serving' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Queue Number */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-lg ${
                  item.status === 'serving' ? 'bg-green-600' : 'bg-blue-600'
                } text-white flex-shrink-0`}>
                  <span className="text-xl">{item.number}</span>
                </div>

                {/* Beneficiary Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p>{item.name}</p>
                    {item.status === 'serving' && (
                      <Badge className="bg-green-600">Now Serving</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {item.program}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Wait: {item.waitTime}
                    </span>
                    <span className="text-green-600">
                      {item.amount}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                  {item.status === 'waiting' && (
                    <Button 
                      onClick={() => handleServe(item.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial"
                    >
                      <ArrowRight className="w-4 h-4 mr-1" />
                      Serve
                    </Button>
                  )}
                  {item.status === 'serving' && (
                    <Button 
                      onClick={() => handleComplete(item.id)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-initial"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleRemove(item.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {queueItems.filter(item => item.status !== 'completed').length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No beneficiaries in queue</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Queue Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Queue Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Click "Serve" to call the next beneficiary</li>
            <li>• Currently serving beneficiaries are highlighted in green</li>
            <li>• Click "Complete" after processing to remove from queue</li>
            <li>• Use the X button to remove a beneficiary if they've left</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}