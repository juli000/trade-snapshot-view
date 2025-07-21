import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTrades } from "@/data/mockData";
import { TrendingUp, TrendingDown, RefreshCw, DollarSign } from "lucide-react";

export default function ActiveTrades() {
  const activeTrades = mockTrades.filter(trade => trade.status === 'OPEN');

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

  const totalUnrealizedPnL = activeTrades.reduce((sum, trade) => sum + (trade.unrealizedPnl || 0), 0);
  const totalPositionValue = activeTrades.reduce((sum, trade) => sum + trade.size, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Active Trades</h1>
        <p className="text-muted-foreground">
          Monitor your open positions and unrealized P&L in real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Positions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrades.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Position Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPositionValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unrealized P&L
            </CardTitle>
            {totalUnrealizedPnL >= 0 ? (
              <TrendingUp className="h-4 w-4 text-profit" />
            ) : (
              <TrendingDown className="h-4 w-4 text-loss" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalUnrealizedPnL >= 0 ? 'text-profit' : 'text-loss'
            }`}>
              {formatCurrency(totalUnrealizedPnL)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Trades List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Open Positions</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Prices
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeTrades.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Trades</h3>
                <p className="text-muted-foreground">
                  You don't have any open positions at the moment.
                </p>
              </div>
            ) : (
              activeTrades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 rounded-lg border border-border bg-card space-y-4 lg:space-y-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-8">
                    {/* Symbol and Type */}
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xl">{trade.symbol}</span>
                          <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                            {trade.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(trade.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Position Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Quantity</div>
                        <div className="font-semibold">{trade.quantity} shares</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Entry Price</div>
                        <div className="font-semibold">{formatCurrency(trade.entryPrice)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Current Price</div>
                        <div className="font-semibold">{formatCurrency(trade.currentPrice || 0)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Position Size</div>
                        <div className="font-semibold">{formatCurrency(trade.size)}</div>
                      </div>
                    </div>
                  </div>

                  {/* P&L and Performance */}
                  <div className="flex flex-col items-start lg:items-end space-y-2">
                    <div className={`text-2xl font-bold flex items-center space-x-2 ${
                      (trade.unrealizedPnl || 0) >= 0 ? 'text-profit' : 'text-loss'
                    }`}>
                      {(trade.unrealizedPnl || 0) >= 0 ? (
                        <TrendingUp className="h-5 w-5" />
                      ) : (
                        <TrendingDown className="h-5 w-5" />
                      )}
                      <span>{formatCurrency(trade.unrealizedPnl || 0)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(((trade.currentPrice || 0) - trade.entryPrice) / trade.entryPrice * 100).toFixed(2)}% return
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Market value: {formatCurrency((trade.currentPrice || 0) * trade.quantity)}
                    </div>
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