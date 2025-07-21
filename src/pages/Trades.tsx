import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTrades } from "@/data/mockData";
import { TrendingUp, TrendingDown, Search, Filter } from "lucide-react";

export default function Trades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filteredTrades = mockTrades.filter(trade => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || trade.status === statusFilter;
    const matchesType = typeFilter === "ALL" || trade.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All Trades</h1>
        <p className="text-muted-foreground">
          Complete history of your trading activity.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by symbol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="BUY">Buy</SelectItem>
                <SelectItem value="SELL">Sell</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Trades History ({filteredTrades.length} trades)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTrades.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No trades found matching your filters.
              </p>
            ) : (
              filteredTrades
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((trade) => (
                  <div
                    key={trade.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors space-y-2 md:space-y-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-lg">{trade.symbol}</span>
                        <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                          {trade.type}
                        </Badge>
                        <Badge variant={trade.status === 'OPEN' ? 'destructive' : 'outline'}>
                          {trade.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Qty:</span> {trade.quantity} shares
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Entry:</span> {formatCurrency(trade.entryPrice)}
                          {trade.exitPrice && (
                            <>
                              <span className="text-muted-foreground"> → Exit:</span> {formatCurrency(trade.exitPrice)}
                            </>
                          )}
                          {trade.currentPrice && !trade.exitPrice && (
                            <>
                              <span className="text-muted-foreground"> → Current:</span> {formatCurrency(trade.currentPrice)}
                            </>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(trade.timestamp)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Size: {formatCurrency(trade.size)}
                      </div>
                      {trade.status === 'CLOSED' && trade.pnl !== undefined ? (
                        <>
                          <div className={`flex items-center space-x-1 font-semibold text-lg ${
                            trade.pnl >= 0 ? 'text-profit' : 'text-loss'
                          }`}>
                            {trade.pnl >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{formatCurrency(trade.pnl)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {((trade.pnl / trade.size) * 100).toFixed(2)}% return
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`flex items-center space-x-1 font-semibold text-lg ${
                            (trade.unrealizedPnl || 0) >= 0 ? 'text-profit' : 'text-loss'
                          }`}>
                            {(trade.unrealizedPnl || 0) >= 0 ? (
                              <TrendingUp className="h-4 w-4" />
                            ) : (
                              <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{formatCurrency(trade.unrealizedPnl || 0)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Unrealized ({(((trade.currentPrice || 0) - trade.entryPrice) / trade.entryPrice * 100).toFixed(2)}%)
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}