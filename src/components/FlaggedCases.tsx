import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle, CheckCircle, XCircle, User, Calendar, Phone, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';

interface FlaggedCase {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  program: string;
  amount: string;
  flagReason: string;
  flaggedDate: string;
  claimHistory: number;
  lastClaim: string;
  address: string;
  phone: string;
  severity: 'high' | 'medium' | 'low';
}

const mockFlaggedCases: FlaggedCase[] = [
  {
    id: 'FLAG-001',
    beneficiaryId: 'BEN-2024-9012',
    beneficiaryName: 'Pedro Santos',
    program: 'AKAP',
    amount: '₱3,000',
    flagReason: 'Exceeded maximum claim limit (3 claims in 30 days)',
    flaggedDate: '2024-11-11 13:55:20',
    claimHistory: 4,
    lastClaim: '2024-11-05',
    address: 'Brgy. Commonwealth, Quezon City',
    phone: '0919-345-6789',
    severity: 'high'
  },
  {
    id: 'FLAG-002',
    beneficiaryId: 'BEN-2024-4567',
    beneficiaryName: 'Carmen Lopez',
    program: 'TUPAD',
    amount: '₱6,000',
    flagReason: 'Duplicate registration detected',
    flaggedDate: '2024-11-11 12:30:15',
    claimHistory: 2,
    lastClaim: '2024-10-28',
    address: 'Brgy. Batasan Hills, Quezon City',
    phone: '0920-456-7890',
    severity: 'high'
  },
  {
    id: 'FLAG-003',
    beneficiaryId: 'BEN-2024-7891',
    beneficiaryName: 'Miguel Ramos',
    program: 'Educational Scholarship',
    amount: '₱10,000',
    flagReason: 'Documentation verification needed',
    flaggedDate: '2024-11-11 11:45:30',
    claimHistory: 1,
    lastClaim: '2024-09-15',
    address: 'Brgy. Holy Spirit, Quezon City',
    phone: '0921-567-8901',
    severity: 'medium'
  },
  {
    id: 'FLAG-004',
    beneficiaryId: 'BEN-2024-1357',
    beneficiaryName: 'Elena Cruz',
    program: 'Senior Citizen Aid',
    amount: '₱5,000',
    flagReason: 'Age verification required',
    flaggedDate: '2024-11-11 10:20:45',
    claimHistory: 0,
    lastClaim: 'None',
    address: 'Brgy. Fairview, Quezon City',
    phone: '0922-678-9012',
    severity: 'low'
  },
  {
    id: 'FLAG-005',
    beneficiaryId: 'BEN-2024-2468',
    beneficiaryName: 'Roberto Aquino',
    program: 'AKAP',
    amount: '₱3,000',
    flagReason: 'Address mismatch with government records',
    flaggedDate: '2024-11-10 16:35:20',
    claimHistory: 1,
    lastClaim: '2024-10-12',
    address: 'Brgy. Payatas, Quezon City',
    phone: '0923-789-0123',
    severity: 'medium'
  },
  {
    id: 'FLAG-006',
    beneficiaryId: 'BEN-2024-3579',
    beneficiaryName: 'Sandra Reyes',
    program: 'TUPAD',
    amount: '₱6,000',
    flagReason: 'Multiple accounts detected under same household',
    flaggedDate: '2024-11-10 14:15:10',
    claimHistory: 2,
    lastClaim: '2024-11-01',
    address: 'Brgy. Bagong Silangan, Quezon City',
    phone: '0924-890-1234',
    severity: 'high'
  },
  {
    id: 'FLAG-007',
    beneficiaryId: 'BEN-2024-4680',
    beneficiaryName: 'Antonio Gonzales',
    program: 'Educational Scholarship',
    amount: '₱10,000',
    flagReason: 'Income bracket verification needed',
    flaggedDate: '2024-11-10 13:05:55',
    claimHistory: 1,
    lastClaim: '2024-08-20',
    address: 'Brgy. Greater Lagro, Quezon City',
    phone: '0925-901-2345',
    severity: 'low'
  }
];

export function FlaggedCases() {
  const [cases, setCases] = useState<FlaggedCase[]>(mockFlaggedCases);
  const [selectedCase, setSelectedCase] = useState<FlaggedCase | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleReview = (caseItem: FlaggedCase) => {
    setSelectedCase(caseItem);
    setReviewNotes('');
    setShowDialog(true);
  };

  const handleApprove = () => {
    if (selectedCase) {
      setCases(cases.filter(c => c.id !== selectedCase.id));
      setShowDialog(false);
      setSelectedCase(null);
    }
  };

  const handleReject = () => {
    if (selectedCase) {
      setCases(cases.filter(c => c.id !== selectedCase.id));
      setShowDialog(false);
      setSelectedCase(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-orange-600';
      case 'low': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      <Alert className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>{cases.length} cases</strong> require supervisor review and approval
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High Priority</CardDescription>
            <CardTitle className="text-red-600">
              {cases.filter(c => c.severity === 'high').length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Medium Priority</CardDescription>
            <CardTitle className="text-orange-600">
              {cases.filter(c => c.severity === 'medium').length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Low Priority</CardDescription>
            <CardTitle className="text-yellow-600">
              {cases.filter(c => c.severity === 'low').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Flagged Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Flagged Cases</CardTitle>
          <CardDescription>Cases requiring manual review and approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="border-2 border-red-200 rounded-lg p-4 bg-red-50/50">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Case Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <p>{caseItem.beneficiaryName}</p>
                          <Badge className={getSeverityColor(caseItem.severity)}>
                            {caseItem.severity} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {caseItem.beneficiaryId} • {caseItem.program}
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-white border-red-300">
                      <AlertDescription>
                        <strong>Flag Reason:</strong> {caseItem.flagReason}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <p className="text-green-600">{caseItem.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Claim History:</span>
                        <p>{caseItem.claimHistory} claims</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Claim:</span>
                        <p>{caseItem.lastClaim}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Flagged:</span>
                        <p>{caseItem.flaggedDate.split(' ')[0]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center">
                    <Button 
                      onClick={() => handleReview(caseItem)}
                      className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
                    >
                      Review Case
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {cases.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No flagged cases at this time</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Flagged Case</DialogTitle>
            <DialogDescription>
              Carefully review the details before making a decision
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-6">
              {/* Flag Alert */}
              <Alert className={`border-2 ${
                selectedCase.severity === 'high' ? 'bg-red-50 border-red-300' :
                selectedCase.severity === 'medium' ? 'bg-orange-50 border-orange-300' :
                'bg-yellow-50 border-yellow-300'
              }`}>
                <AlertTriangle className={`h-4 w-4 ${
                  selectedCase.severity === 'high' ? 'text-red-600' :
                  selectedCase.severity === 'medium' ? 'text-orange-600' :
                  'text-yellow-600'
                }`} />
                <AlertDescription className={
                  selectedCase.severity === 'high' ? 'text-red-800' :
                  selectedCase.severity === 'medium' ? 'text-orange-800' :
                  'text-yellow-800'
                }>
                  <strong>Flag Reason:</strong> {selectedCase.flagReason}
                </AlertDescription>
              </Alert>

              {/* Beneficiary Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Beneficiary ID</label>
                    <p>{selectedCase.beneficiaryId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p>{selectedCase.beneficiaryName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Program</label>
                    <p>{selectedCase.program}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Amount</label>
                    <p className="text-green-600">{selectedCase.amount}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <p>{selectedCase.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact
                    </label>
                    <p>{selectedCase.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Flagged Date
                    </label>
                    <p>{selectedCase.flaggedDate}</p>
                  </div>
                </div>
              </div>

              {/* Claim History */}
              <div className="border-t pt-4">
                <label className="text-sm text-gray-600">Claim History</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total Claims</p>
                    <p>{selectedCase.claimHistory}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Last Claim Date</p>
                    <p>{selectedCase.lastClaim}</p>
                  </div>
                </div>
              </div>

              {/* Review Notes */}
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Supervisor Notes (Required)
                </label>
                <Textarea
                  placeholder="Enter your review notes and decision rationale..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1"
                  disabled={!reviewNotes.trim()}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Claim
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!reviewNotes.trim()}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Override
                </Button>
              </div>

              {!reviewNotes.trim() && (
                <p className="text-xs text-center text-gray-500">
                  Please enter review notes before making a decision
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>About Flagged Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Cases are automatically flagged based on verification rules</li>
            <li>• High priority cases require immediate supervisor attention</li>
            <li>• Review all details carefully before approving or rejecting</li>
            <li>• All decisions are logged in the audit trail with notes</li>
            <li>• Supervisor approval overrides automatic flags</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
