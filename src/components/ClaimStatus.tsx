import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Clock, XCircle, Calendar, FileText } from 'lucide-react';

interface ClaimRecord {
  id: string;
  program: string;
  amount: string;
  status: 'completed' | 'pending' | 'processing' | 'rejected';
  date: string;
  claimDate?: string;
  notes?: string;
}

const claimHistory: ClaimRecord[] = [
  {
    id: 'CLM-2024-001',
    program: 'AKAP (Ayuda sa Kapos ang Kita)',
    amount: '₱3,000',
    status: 'pending',
    date: 'Nov 11, 2024',
    notes: 'Ready for claiming. Visit LGU office with your QR code.'
  },
  {
    id: 'CLM-2024-002',
    program: 'Educational Scholarship Program',
    amount: '₱10,000',
    status: 'processing',
    date: 'Nov 8, 2024',
    notes: 'Document verification in progress. Expected completion: Nov 25, 2024'
  },
  {
    id: 'CLM-2024-003',
    program: 'AKAP (Ayuda sa Kapos ang Kita)',
    amount: '₱3,000',
    status: 'completed',
    date: 'Oct 15, 2024',
    claimDate: 'Oct 18, 2024'
  },
  {
    id: 'CLM-2024-004',
    program: 'TUPAD (Tulong Panghanapbuhay)',
    amount: '₱6,000',
    status: 'completed',
    date: 'Sep 20, 2024',
    claimDate: 'Sep 25, 2024'
  },
  {
    id: 'CLM-2024-005',
    program: 'AKAP (Ayuda sa Kapos ang Kita)',
    amount: '₱3,000',
    status: 'completed',
    date: 'Aug 10, 2024',
    claimDate: 'Aug 12, 2024'
  },
  {
    id: 'CLM-2024-006',
    program: 'Educational Scholarship Program',
    amount: '₱10,000',
    status: 'rejected',
    date: 'Jul 5, 2024',
    notes: 'Incomplete documentation. Please resubmit with all required documents.'
  }
];

export function ClaimStatus() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'processing':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-orange-600">Ready to Claim</Badge>;
      case 'processing':
        return <Badge className="bg-blue-600">Processing</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const activeCount = claimHistory.filter(c => c.status === 'pending' || c.status === 'processing').length;
  const completedCount = claimHistory.filter(c => c.status === 'completed').length;
  const totalAmount = claimHistory
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + parseInt(c.amount.replace(/[₱,]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-white" style={{ background: 'linear-gradient(135deg, #0038A8 0%, #002D85 100%)' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-100">Active Claims</CardDescription>
            <CardTitle className="text-white">{activeCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-100">Pending or processing</p>
          </CardContent>
        </Card>

        <Card className="text-white" style={{ background: 'linear-gradient(135deg, #FCD116 0%, #E6B800 100%)' }}>
          <CardHeader className="pb-2">
            <CardDescription className="text-yellow-900">Completed</CardDescription>
            <CardTitle className="text-yellow-900">{completedCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-900">Successfully claimed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Received</CardDescription>
            <CardTitle style={{ color: '#0038A8' }}>₱{totalAmount.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">All-time assistance</p>
          </CardContent>
        </Card>
      </div>

      {/* Claim History */}
      <Card>
        <CardHeader>
          <CardTitle>Claim History</CardTitle>
          <CardDescription>Track all your benefit claims and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claimHistory.map((claim) => (
              <div 
                key={claim.id} 
                className={`border-2 rounded-lg p-4 ${
                  claim.status === 'pending' ? 'border-orange-200 bg-orange-50' :
                  claim.status === 'processing' ? 'border-blue-200 bg-blue-50' :
                  claim.status === 'completed' ? 'border-green-200 bg-green-50' :
                  'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(claim.status)}
                  </div>

                  {/* Claim Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="mb-1">{claim.program}</p>
                        <p className="text-sm text-gray-600">{claim.id}</p>
                      </div>
                      {getStatusBadge(claim.status)}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3 text-sm">
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <p className="text-green-600">{claim.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Applied:</span>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {claim.date}
                        </p>
                      </div>
                      {claim.claimDate && (
                        <div>
                          <span className="text-gray-600">Claimed:</span>
                          <p className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {claim.claimDate}
                          </p>
                        </div>
                      )}
                    </div>

                    {claim.notes && (
                      <div className={`text-sm p-3 rounded border ${
                        claim.status === 'pending' ? 'bg-orange-100 border-orange-300' :
                        claim.status === 'processing' ? 'bg-blue-100 border-blue-300' :
                        claim.status === 'rejected' ? 'bg-red-100 border-red-300' :
                        'bg-gray-100 border-gray-300'
                      }`}>
                        <strong>Note:</strong> {claim.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Status Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-600">Ready to Claim</Badge>
              <span>Your claim is approved and ready for collection at the LGU office</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-600">Processing</Badge>
              <span>Your application is being reviewed and verified</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-600">Completed</Badge>
              <span>You have successfully claimed and received the assistance</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="destructive">Rejected</Badge>
              <span>Application was not approved. Check notes for details</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}