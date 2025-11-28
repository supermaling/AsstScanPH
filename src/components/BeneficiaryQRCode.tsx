import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { QrCode, Download, Info, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface BeneficiaryQRCodeProps {
  beneficiaryId: string;
  beneficiaryName: string;
}

export function BeneficiaryQRCode({ beneficiaryId, beneficiaryName }: BeneficiaryQRCodeProps) {
  const handleDownload = () => {
    alert('QR Code download feature - would save as image');
  };

  return (
    <div className="space-y-6">
      {/* Instructions Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Present this QR code to LGU staff when claiming your benefits. You can show it on your phone or print it.
        </AlertDescription>
      </Alert>

      {/* QR Code Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Your QR Code</CardTitle>
          <CardDescription>Scan this code at the LGU office to claim benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* QR Code Display - Using a placeholder since we can't generate real QR codes */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-4" style={{ borderColor: '#0038A8' }}>
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center relative">
                {/* Simplified QR Code Pattern */}
                <svg viewBox="0 0 256 256" className="w-full h-full">
                  {/* Corner squares */}
                  <rect x="8" y="8" width="64" height="64" fill="black" />
                  <rect x="16" y="16" width="48" height="48" fill="white" />
                  <rect x="24" y="24" width="32" height="32" fill="black" />
                  
                  <rect x="184" y="8" width="64" height="64" fill="black" />
                  <rect x="192" y="16" width="48" height="48" fill="white" />
                  <rect x="200" y="24" width="32" height="32" fill="black" />
                  
                  <rect x="8" y="184" width="64" height="64" fill="black" />
                  <rect x="16" y="192" width="48" height="48" fill="white" />
                  <rect x="24" y="200" width="32" height="32" fill="black" />
                  
                  {/* Random pattern for demonstration */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <rect 
                      key={i}
                      x={Math.random() * 150 + 80} 
                      y={Math.random() * 150 + 80} 
                      width={Math.random() * 16 + 8} 
                      height={Math.random() * 16 + 8} 
                      fill="black"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Beneficiary Info */}
            <div className="text-center space-y-2">
              <p className="text-gray-600">Beneficiary ID</p>
              <p className="text-xl">{beneficiaryId}</p>
              <p className="text-gray-600">Name</p>
              <p>{beneficiaryName}</p>
            </div>

            {/* Download Button */}
            <Button onClick={handleDownload} style={{ backgroundColor: '#0038A8' }}>
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Your QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 list-decimal list-inside">
            <li className="text-sm">
              <strong>Visit the LGU Office</strong> during claiming hours (8:00 AM - 5:00 PM)
            </li>
            <li className="text-sm">
              <strong>Present this QR code</strong> to the staff at the verification counter
            </li>
            <li className="text-sm">
              <strong>Wait for verification</strong> - Staff will scan and verify your eligibility
            </li>
            <li className="text-sm">
              <strong>Provide valid ID</strong> when requested for additional verification
            </li>
            <li className="text-sm">
              <strong>Receive your assistance</strong> after successful verification
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Important Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Keep your QR code safe and do not share it with others</li>
            <li>• You can show the QR code on your phone or print it</li>
            <li>• Make sure the QR code is clear and not damaged when presenting</li>
            <li>• Bring a valid government-issued ID for verification</li>
            <li>• Check program schedules for specific claiming dates</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}