import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Download, Filter, Calendar, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Transaction {
  id: string;
  beneficiaryId: string;
  beneficiaryName: string;
  program: string;
  amount: string;
  status: 'approved' | 'rejected' | 'flagged';
  timestamp: string;
  processedBy: string;
  notes?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2024-001',
    beneficiaryId: 'BEN-2024-1234',
    beneficiaryName: 'Maria Reyes',
    program: 'AKAP',
    amount: '₱3,000',
    status: 'approved',
    timestamp: '2024-11-11 14:23:45',
    processedBy: 'Maria Santos'
  },
  {
    id: 'TXN-2024-002',
    beneficiaryId: 'BEN-2024-5678',
    beneficiaryName: 'Jose Garcia',
    program: 'Educational Scholarship',
    amount: '₱10,000',
    status: 'approved',
    timestamp: '2024-11-11 14:18:32',
    processedBy: 'Maria Santos'
  },
  {
    id: 'TXN-2024-003',
    beneficiaryId: 'BEN-2024-9012',
    beneficiaryName: 'Ana Cruz',
    program: 'TUPAD',
    amount: '₱6,000',
    status: 'approved',
    timestamp: '2024-11-11 14:10:15',
    processedBy: 'Juan Dela Cruz'
  },
  {
    id: 'TXN-2024-004',
    beneficiaryId: 'BEN-2024-3456',
    beneficiaryName: 'Pedro Santos',
    program: 'AKAP',
    amount: '₱3,000',
    status: 'flagged',
    timestamp: '2024-11-11 13:55:20',
    processedBy: 'Maria Santos',
    notes: 'Exceeded claim limit - requires supervisor review'
  },
  {
    id: 'TXN-2024-005',
    beneficiaryId: 'BEN-2024-7890',
    beneficiaryName: 'Rosa Mendoza',
    program: 'Senior Citizen Aid',
    amount: '₱5,000',
    status: 'rejected',
    timestamp: '2024-11-11 13:42:10',
    processedBy: 'Juan Dela Cruz',
    notes: 'Invalid documentation'
  },
  {
    id: 'TXN-2024-006',
    beneficiaryId: 'BEN-2024-2345',
    beneficiaryName: 'Carlos Ramos',
    program: 'AKAP',
    amount: '₱3,000',
    status: 'approved',
    timestamp: '2024-11-11 13:30:45',
    processedBy: 'Maria Santos'
  },
  {
    id: 'TXN-2024-007',
    beneficiaryId: 'BEN-2024-6789',
    beneficiaryName: 'Linda Torres',
    program: 'TUPAD',
    amount: '₱6,000',
    status: 'approved',
    timestamp: '2024-11-11 13:15:22',
    processedBy: 'Juan Dela Cruz'
  },
  {
    id: 'TXN-2024-008',
    beneficiaryId: 'BEN-2024-8901',
    beneficiaryName: 'Roberto Cruz',
    program: 'Educational Scholarship',
    amount: '₱10,000',
    status: 'approved',
    timestamp: '2024-11-11 12:58:30',
    processedBy: 'Maria Santos'
  }
];

export function TransactionLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [transactions] = useState<Transaction[]>(mockTransactions);

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.beneficiaryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || txn.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    // In real app, this would generate a CSV or PDF
    alert('Transaction log export feature - would download CSV file');
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-blue-600">{transactions.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-green-600">
              {transactions.filter(t => t.status === 'approved').length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="text-red-600">
              {transactions.filter(t => t.status === 'rejected').length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Flagged</CardDescription>
            <CardTitle className="text-orange-600">
              {transactions.filter(t => t.status === 'flagged').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Logs</CardTitle>
          <CardDescription>Complete audit trail of all aid distributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, or transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((txn) => (
              <div key={txn.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Transaction Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="flex items-center gap-2">
                          {txn.beneficiaryName}
                          {txn.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {txn.status === 'rejected' && <XCircle className="w-4 h-4 text-red-600" />}
                          {txn.status === 'flagged' && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                        </p>
                        <p className="text-sm text-gray-600">
                          {txn.beneficiaryId} • {txn.program}
                        </p>
                      </div>
                      <Badge 
                        variant={txn.status === 'approved' ? 'default' : txn.status === 'rejected' ? 'destructive' : 'secondary'}
                        className={txn.status === 'approved' ? 'bg-green-600' : txn.status === 'flagged' ? 'bg-orange-600' : ''}
                      >
                        {txn.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Transaction ID:</span>
                        <p>{txn.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <p className="text-green-600">{txn.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Timestamp:</span>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {txn.timestamp}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Processed by:</span>
                        <p>{txn.processedBy}</p>
                      </div>
                    </div>

                    {txn.notes && (
                      <div className="text-sm bg-yellow-50 border border-yellow-200 rounded p-2">
                        <span className="text-gray-600">Notes:</span> {txn.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Info */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Trail Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• All transactions are automatically logged with timestamps</li>
            <li>• Transaction records are immutable and cannot be modified</li>
            <li>• Logs include beneficiary details, amounts, and processing officer</li>
            <li>• Export logs for reporting and compliance purposes</li>
            <li>• Flagged transactions are marked for supervisor review</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
