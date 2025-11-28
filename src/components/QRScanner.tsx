import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { QrCode, CheckCircle, XCircle, AlertTriangle, User, Calendar, Phone, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface BeneficiaryData {
  id: string;
  name: string;
  program: string;
  amount: string;
  status: 'verified' | 'pending' | 'flagged';
  address: string;
  phone: string;
  dateRegistered: string;
  claimCount: number;
  lastClaim: string | null;
}

const mockBeneficiaries: BeneficiaryData[] = [
  {
    id: 'BEN-2024-1234',
    name: 'Maria Reyes',
    program: 'AKAP (Ayuda sa Kapos ang Kita Program)',
    amount: '₱3,000',
    status: 'verified',
    address: 'Brgy. San Roque, Quezon City',
    phone: '0917-123-4567',
    dateRegistered: 'Oct 15, 2024',
    claimCount: 0,
    lastClaim: null
  },
  {
    id: 'BEN-2024-5678',
    name: 'Jose Garcia',
    program: 'Educational Scholarship Program',
    amount: '₱10,000',
    status: 'verified',
    address: 'Brgy. Matandang Balara, Quezon City',
    phone: '0918-234-5678',
    dateRegistered: 'Sep 20, 2024',
    claimCount: 1,
    lastClaim: 'Aug 15, 2024'
  },
  {
    id: 'BEN-2024-9012',
    name: 'Pedro Santos',
    program: 'TUPAD (Tulong Panghanapbuhay)',
    amount: '₱6,000',
    status: 'flagged',
    address: 'Brgy. Commonwealth, Quezon City',
    phone: '0919-345-6789',
    dateRegistered: 'Nov 1, 2024',
    claimCount: 3,
    lastClaim: 'Nov 5, 2024'
  }
];

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<BeneficiaryData | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomBeneficiary = mockBeneficiaries[Math.floor(Math.random() * mockBeneficiaries.length)];
      setScannedData(randomBeneficiary);
      setIsScanning(false);
      setShowConfirmDialog(true);
    }, 1500);
  };

  const handleApprove = () => {
    setShowConfirmDialog(false);
    // In real app, this would update the database
    setTimeout(() => {
      setScannedData(null);
    }, 300);
  };

  const handleReject = () => {
    setShowConfirmDialog(false);
    setScannedData(null);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Card */}
      <Card>
        <CardHeader>
          <CardTitle>QR Code Scanner</CardTitle>
          <CardDescription>Scan beneficiary QR code for instant verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            {!isScanning && !scannedData && (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full" style={{ backgroundColor: '#E6F0FF' }}>
                  <QrCode className="w-16 h-16" style={{ color: '#0038A8' }} />
                </div>
                <div>
                  <p className="mb-2">Ready to scan</p>
                  <p className="text-sm text-gray-600 mb-6">
                    Click the button below to activate the QR scanner
                  </p>
                </div>
                <Button 
                  onClick={simulateScan}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  style={{ backgroundColor: '#0038A8' }}
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </div>
            )}

            {isScanning && (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full animate-pulse" style={{ backgroundColor: '#E6F0FF' }}>
                  <QrCode className="w-16 h-16" style={{ color: '#0038A8' }} />
                </div>
                <div>
                  <p className="mb-2">Scanning in progress...</p>
                  <p className="text-sm text-gray-600">
                    Please hold the QR code steady
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verify Beneficiary</DialogTitle>
            <DialogDescription>
              Review the information and confirm the transaction
            </DialogDescription>
          </DialogHeader>

          {scannedData && (
            <div className="space-y-6">
              {/* Status Alert */}
              {scannedData.status === 'verified' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Beneficiary verified. All checks passed.
                  </AlertDescription>
                </Alert>
              )}

              {scannedData.status === 'flagged' && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Warning:</strong> This beneficiary has been flagged. Claim limit may have been reached. Please verify manually.
                  </AlertDescription>
                </Alert>
              )}

              {/* Beneficiary Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Beneficiary ID</label>
                    <p>{scannedData.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <p>{scannedData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Program</label>
                    <p>{scannedData.program}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Amount to Claim</label>
                    <p className="text-green-600">{scannedData.amount}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </label>
                    <p>{scannedData.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Contact Number
                    </label>
                    <p>{scannedData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date Registered
                    </label>
                    <p>{scannedData.dateRegistered}</p>
                  </div>
                </div>
              </div>

              {/* Claim History */}
              <div className="border-t pt-4">
                <label className="text-sm text-gray-600">Claim History</label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total Claims</p>
                    <p>{scannedData.claimCount}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Last Claimed</p>
                    <p>{scannedData.lastClaim || 'First time'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={scannedData.status === 'flagged'}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Process
                </Button>
              </div>

              {scannedData.status === 'flagged' && (
                <p className="text-xs text-center text-red-600">
                  Flagged cases require supervisor approval
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Scanning Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal list-inside text-sm">
            <li>Ask the beneficiary to present their QR code (printed or on mobile)</li>
            <li>Click "Start Scanning" and position the QR code within the frame</li>
            <li>System will automatically verify against government databases</li>
            <li>Review beneficiary details and approve or reject the claim</li>
            <li>Transaction will be logged in the audit trail automatically</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}