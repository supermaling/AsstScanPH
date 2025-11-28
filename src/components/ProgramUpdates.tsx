import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, Megaphone, AlertCircle, Calendar, Clock } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'alert' | 'reminder';
  date: string;
  time: string;
  isNew: boolean;
  program?: string;
}

const updates: Update[] = [
  {
    id: 'UPD-001',
    title: 'AKAP Claiming Schedule',
    message: 'The LGU office will be open for AKAP claims on November 15-16, 2024. Please bring your valid ID and QR code. Office hours: 8:00 AM - 5:00 PM.',
    type: 'announcement',
    date: 'Nov 11, 2024',
    time: '2:30 PM',
    isNew: true,
    program: 'AKAP'
  },
  {
    id: 'UPD-002',
    title: 'Scholarship Document Submission',
    message: 'Reminder: Educational Scholarship applicants must submit proof of enrollment by November 20, 2024. Late submissions may delay your claim processing.',
    type: 'reminder',
    date: 'Nov 10, 2024',
    time: '10:15 AM',
    isNew: true,
    program: 'Scholarship'
  },
  {
    id: 'UPD-003',
    title: 'Holiday Office Closure',
    message: 'The LGU office will be closed on November 30, 2024 (Bonifacio Day). Please plan your visits accordingly. Regular operations resume December 2.',
    type: 'alert',
    date: 'Nov 9, 2024',
    time: '9:00 AM',
    isNew: false
  },
  {
    id: 'UPD-004',
    title: 'New TUPAD Program Opening',
    message: 'Registration for the next TUPAD batch is now open! Visit the LGU office or check our website for application requirements. Limited slots available.',
    type: 'announcement',
    date: 'Nov 8, 2024',
    time: '1:45 PM',
    isNew: false,
    program: 'TUPAD'
  },
  {
    id: 'UPD-005',
    title: 'Mobile Claiming Station',
    message: 'A mobile claiming station will be set up at Barangay San Roque on November 18, 2024 from 9:00 AM - 3:00 PM for the convenience of beneficiaries.',
    type: 'announcement',
    date: 'Nov 7, 2024',
    time: '3:20 PM',
    isNew: false
  },
  {
    id: 'UPD-006',
    title: 'System Maintenance Notice',
    message: 'The online portal will undergo maintenance on November 13, 2024 from 12:00 AM - 6:00 AM. Services will be temporarily unavailable.',
    type: 'alert',
    date: 'Nov 6, 2024',
    time: '4:00 PM',
    isNew: false
  },
  {
    id: 'UPD-007',
    title: 'Senior Citizen Aid Distribution',
    message: 'Senior Citizen Aid for Q4 2024 is now ready for claiming. Eligible seniors may visit the office starting November 12, 2024. Bring your Senior Citizen ID and QR code.',
    type: 'announcement',
    date: 'Nov 5, 2024',
    time: '11:30 AM',
    isNew: false,
    program: 'Senior Aid'
  },
  {
    id: 'UPD-008',
    title: 'Anti-Fraud Reminder',
    message: 'Important: LGU staff will never ask for payment or fees to process your claims. Report any suspicious activity to our hotline immediately.',
    type: 'alert',
    date: 'Nov 4, 2024',
    time: '8:45 AM',
    isNew: false
  }
];

export function ProgramUpdates() {
  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-blue-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getUpdateBadge = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Badge className="bg-blue-600">Announcement</Badge>;
      case 'alert':
        return <Badge variant="destructive">Alert</Badge>;
      case 'reminder':
        return <Badge className="bg-orange-600">Reminder</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const newCount = updates.filter(u => u.isNew).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="text-white" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #002D85 100%)' }}>
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Program Updates & Notifications
          </CardTitle>
          <CardDescription className="text-blue-100">
            Stay informed about aid programs and important announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="rounded-full px-4 py-2" style={{ backgroundColor: 'rgba(252, 209, 22, 0.3)' }}>
              <span className="text-xl">{newCount}</span> new updates
            </div>
            <div className="bg-white/20 rounded-full px-4 py-2">
              <span className="text-xl">{updates.length}</span> total
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates List */}
      <Card>
        <CardHeader>
          <CardTitle>All Updates</CardTitle>
          <CardDescription>Latest news and announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.map((update) => (
              <div 
                key={update.id} 
                className={`border-2 rounded-lg p-4 ${
                  update.type === 'announcement' ? 'border-blue-200 bg-blue-50' :
                  update.type === 'alert' ? 'border-red-200 bg-red-50' :
                  'border-orange-200 bg-orange-50'
                } ${update.isNew ? 'ring-2 ring-green-400' : ''}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getUpdateIcon(update.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p>{update.title}</p>
                        {update.isNew && (
                          <Badge className="bg-green-600 text-xs">New</Badge>
                        )}
                      </div>
                      {getUpdateBadge(update.type)}
                    </div>

                    <p className="text-sm mb-3">{update.message}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {update.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {update.time}
                      </span>
                      {update.program && (
                        <Badge variant="secondary" className="text-xs">
                          {update.program}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings Info */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              You will receive notifications about:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Program updates and new opportunities
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Claiming schedules and deadlines
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Important announcements from your LGU
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Status changes on your applications
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}