import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, BarChart3, DollarSign, Activity } from 'lucide-react';
import { getTradeStats } from '@/data/mockData';

export function StatsOverview() {
  const stats = getTradeStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const statCards = [
    {
      title: 'Total Trades',
      value: stats.totalTrades.toString(),
      icon: BarChart3,
      trend: null,
    },
    {
      title: 'Win Rate',
      value: formatPercentage(stats.winRate),
      icon: Target,
      trend: stats.winRate >= 50 ? 'up' : 'down',
    },
    {
      title: 'Realized P&L',
      value: formatCurrency(stats.totalPnL),
      icon: DollarSign,
      trend: stats.totalPnL >= 0 ? 'up' : 'down',
    },
    {
      title: 'Unrealized P&L',
      value: formatCurrency(stats.totalUnrealizedPnL),
      icon: Activity,
      trend: stats.totalUnrealizedPnL >= 0 ? 'up' : 'down',
    },
    {
      title: 'Avg Win',
      value: formatCurrency(stats.avgWin),
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: 'Avg Loss',
      value: formatCurrency(Math.abs(stats.avgLoss)),
      icon: TrendingDown,
      trend: 'down',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                {stat.value}
              </div>
              {stat.trend && (
                <div className={`flex items-center ${
                  stat.trend === 'up' ? 'text-profit' : 'text-loss'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}