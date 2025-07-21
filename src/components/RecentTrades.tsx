import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockTrades } from '@/data/mockData';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function RecentTrades() {
  const recentTrades = mockTrades
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

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
          Recent Trades
          <Button asChild variant="ghost" size="sm">
            <Link to="/trades" className="flex items-center space-x-1">
              <span>View All</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{trade.symbol}</span>
                    <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'}>
                      {trade.type}
                    </Badge>
                    <Badge variant={trade.status === 'OPEN' ? 'destructive' : 'outline'}>
                      {trade.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trade.quantity} shares @ {formatCurrency(trade.entryPrice)}
                    {trade.exitPrice && ` → ${formatCurrency(trade.exitPrice)}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(trade.timestamp)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                {trade.status === 'CLOSED' && trade.pnl !== undefined ? (
                  <div className={`flex items-center space-x-1 font-semibold ${
                    trade.pnl >= 0 ? 'text-profit' : 'text-loss'
                  }`}>
                    {trade.pnl >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>{formatCurrency(trade.pnl)}</span>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}