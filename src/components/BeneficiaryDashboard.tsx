import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  LogOut,
  QrCode,
  Bell,
  HelpCircle,
  CheckCircle,
  Clock,
  Gift,
  FileText,
  User,
} from "lucide-react";
import type { User as UserType } from "../App";
import { BeneficiaryQRCode } from "./BeneficiaryQRCode";
import { ClaimStatus } from "./ClaimStatus";
import { ProgramUpdates } from "./ProgramUpdates";
import logoImage from "figma:asset/d4fe7ed72f4e431506c8eb2c54dfb07388af0a92.png";

interface BeneficiaryDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export function BeneficiaryDashboard({
  user,
  onLogout,
}: BeneficiaryDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header
        className="shadow-lg sticky top-0 z-40"
        style={{
          background:
            "linear-gradient(135deg, #0038A8 0%, #002D85 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="AsstScanPH Logo"
                className="w-12 h-12 object-cover rounded-lg"
                style={{ objectPosition: "center" }}
              />
              <div>
                <h1 className="mb-1 text-white">AsstScanPH</h1>
                <p className="text-blue-100 text-sm">
                  Beneficiary Portal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white">
                  {user.name}
                </p>
                <p className="text-xs text-blue-100">
                  ID: BEN-2024-001
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hidden sm:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Overview Tab */}
          <TabsContent
            value="overview"
            className="space-y-6 mt-0"
          >
            {/* Welcome Alert */}
            <Alert
              style={{
                backgroundColor: "#FCD116",
                borderColor: "#E6B800",
              }}
            >
              <CheckCircle
                className="h-4 w-4"
                style={{ color: "#0038A8" }}
              />
              <AlertDescription style={{ color: "#1a1a1a" }}>
                Welcome, {user.name}! You have{" "}
                <strong>1 active claim</strong> ready for
                processing.
              </AlertDescription>
            </Alert>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card
                className="text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #0038A8 0%, #002D85 100%)",
                }}
              >
                <CardHeader className="pb-2">
                  <CardDescription className="text-blue-100">
                    Active Programs
                  </CardDescription>
                  <CardTitle className="text-white">
                    2
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-100">
                    Enrolled programs
                  </p>
                </CardContent>
              </Card>

              <Card
                className="text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #FCD116 0%, #E6B800 100%)",
                }}
              >
                <CardHeader className="pb-2">
                  <CardDescription className="text-yellow-900">
                    Total Received
                  </CardDescription>
                  <CardTitle className="text-yellow-900">
                    ₱13,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-900">
                    Lifetime assistance
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-orange-100">
                    Next Claim
                  </CardDescription>
                  <CardTitle className="text-white">
                    ₱3,000
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-orange-100">
                    Ready to claim
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Active Claims */}
            <Card>
              <CardHeader>
                <CardTitle>Active Claims</CardTitle>
                <CardDescription>
                  Programs you're enrolled in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div
                    className="border-2 rounded-lg p-4"
                    style={{
                      backgroundColor: "#FFF9E6",
                      borderColor: "#FCD116",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="mb-1">
                          AKAP (Ayuda sa Kapos ang Kita Program)
                        </p>
                        <p className="text-sm text-gray-600">
                          Financial Assistance
                        </p>
                      </div>
                      <Badge
                        style={{
                          backgroundColor: "#FCD116",
                          color: "#1a1a1a",
                        }}
                      >
                        Ready to Claim
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">
                          Amount:
                        </span>
                        <p style={{ color: "#0038A8" }}>
                          ₱3,000
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Valid Until:
                        </span>
                        <p>Dec 31, 2024</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setActiveTab("qr")}
                      className="w-full"
                      style={{ backgroundColor: "#0038A8" }}
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Show QR Code to Claim
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="mb-1">
                          Educational Scholarship Program
                        </p>
                        <p className="text-sm text-gray-600">
                          Student Assistance
                        </p>
                      </div>
                      <Badge variant="secondary">
                        Processing
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">
                          Amount:
                        </span>
                        <p style={{ color: "#0038A8" }}>
                          ₱10,000
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          Expected:
                        </span>
                        <p>Nov 25, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Awaiting document verification
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={() => setActiveTab("qr")}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  View QR Code
                </Button>
                <Button
                  onClick={() => setActiveTab("status")}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Check Status
                </Button>
                <Button
                  onClick={() => setActiveTab("updates")}
                  variant="outline"
                  className="h-auto py-4"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  View Updates
                </Button>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">
                      LGU Hotline
                    </p>
                    <p>8-XXX-XXXX or 0917-XXX-XXXX</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      Email Support
                    </p>
                    <p>support@lgu.gov.ph</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">
                      Office Hours
                    </p>
                    <p>Monday - Friday, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="mt-0">
            <BeneficiaryQRCode
              beneficiaryId="BEN-2024-001"
              beneficiaryName={user.name}
            />
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status" className="mt-0">
            <ClaimStatus />
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value="updates" className="mt-0">
            <ProgramUpdates />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      Beneficiary ID: BEN-2024-001
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Email Address
                    </p>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Contact Number
                    </p>
                    <p>+63 917 XXX XXXX</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Address
                    </p>
                    <p>Barangay San Miguel, Manila, NCR</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Date Registered
                    </p>
                    <p>January 15, 2024</p>
                  </div>
                </div>

                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="w-full"
                  style={{
                    borderColor: "#CE1126",
                    color: "#CE1126",
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottom Tab Navigation */}
          <TabsList className="fixed bottom-0 left-1/2 -translate-x-1/2 h-16 flex bg-white border-t shadow-lg rounded-none z-50 p-1 max-w-md w-full">
            <TabsTrigger
              value="overview"
              className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50"
            >
              <Gift
                className="w-5 h-5"
                style={
                  activeTab === "overview"
                    ? { color: "#0038A8" }
                    : {}
                }
              />
              <span
                className="text-xs"
                style={
                  activeTab === "overview"
                    ? { color: "#0038A8" }
                    : {}
                }
              >
                Overview
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="qr"
              className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50"
            >
              <QrCode
                className="w-5 h-5"
                style={
                  activeTab === "qr" ? { color: "#0038A8" } : {}
                }
              />
              <span
                className="text-xs"
                style={
                  activeTab === "qr" ? { color: "#0038A8" } : {}
                }
              >
                My QR
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50"
            >
              <FileText
                className="w-5 h-5"
                style={
                  activeTab === "status"
                    ? { color: "#0038A8" }
                    : {}
                }
              />
              <span
                className="text-xs"
                style={
                  activeTab === "status"
                    ? { color: "#0038A8" }
                    : {}
                }
              >
                Status
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50"
            >
              <Bell
                className="w-5 h-5"
                style={
                  activeTab === "updates"
                    ? { color: "#0038A8" }
                    : {}
                }
              />
              <span
                className="text-xs"
                style={
                  activeTab === "updates"
                    ? { color: "#0038A8" }
                    : {}
                }
              >
                Updates
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex-1 flex flex-col items-center gap-1 data-[state=active]:bg-blue-50"
            >
              <User
                className="w-5 h-5"
                style={
                  activeTab === "profile"
                    ? { color: "#0038A8" }
                    : {}
                }
              />
              <span
                className="text-xs"
                style={
                  activeTab === "profile"
                    ? { color: "#0038A8" }
                    : {}
                }
              >
                Profile
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  );
}