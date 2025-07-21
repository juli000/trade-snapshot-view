import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrades } from '@/data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ActiveTrades() {
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Active Trades
          <Badge variant="secondary">{activeTrades.length} open</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeTrades.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No active trades
            </p>
          ) : (
            activeTrades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-lg">{trade.symbol}</span>
                      <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                        {trade.type}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {trade.quantity} shares @ {formatCurrency(trade.entryPrice)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(trade.timestamp)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Current: {formatCurrency(trade.currentPrice || 0)}
                  </div>
                  <div className={`flex items-center space-x-1 font-semibold ${
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
                    ({((((trade.currentPrice || 0) - trade.entryPrice) / trade.entryPrice) * 100).toFixed(2)}%)
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}