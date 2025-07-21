export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  currentPrice?: number;
  pnl?: number;
  unrealizedPnl?: number;
  timestamp: string;
  status: 'OPEN' | 'CLOSED';
  size: number; // Position size in dollars
}

export interface BankrollData {
  date: string;
  balance: number;
  trades: number;
}

export const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'TSLA',
    type: 'BUY',
    quantity: 50,
    entryPrice: 245.30,
    exitPrice: 252.80,
    pnl: 375,
    timestamp: '2024-01-15T10:30:00Z',
    status: 'CLOSED',
    size: 12265
  },
  {
    id: '2',
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 100,
    entryPrice: 185.25,
    currentPrice: 188.90,
    unrealizedPnl: 365,
    timestamp: '2024-01-16T14:15:00Z',
    status: 'OPEN',
    size: 18525
  },
  {
    id: '3',
    symbol: 'NVDA',
    type: 'BUY',
    quantity: 25,
    entryPrice: 750.40,
    exitPrice: 735.20,
    pnl: -380,
    timestamp: '2024-01-14T09:45:00Z',
    status: 'CLOSED',
    size: 18760
  },
  {
    id: '4',
    symbol: 'MSFT',
    type: 'BUY',
    quantity: 75,
    entryPrice: 420.15,
    currentPrice: 425.30,
    unrealizedPnl: 386.25,
    timestamp: '2024-01-17T11:20:00Z',
    status: 'OPEN',
    size: 31511.25
  },
  {
    id: '5',
    symbol: 'GOOGL',
    type: 'SELL',
    quantity: 30,
    entryPrice: 145.80,
    exitPrice: 142.30,
    pnl: 105,
    timestamp: '2024-01-13T16:00:00Z',
    status: 'CLOSED',
    size: 4374
  }
];

export const mockBankrollData: BankrollData[] = [
  { date: '2024-01-01', balance: 50000, trades: 0 },
  { date: '2024-01-02', balance: 50200, trades: 1 },
  { date: '2024-01-03', balance: 49800, trades: 2 },
  { date: '2024-01-04', balance: 50400, trades: 3 },
  { date: '2024-01-05', balance: 50600, trades: 4 },
  { date: '2024-01-08', balance: 50300, trades: 5 },
  { date: '2024-01-09', balance: 51100, trades: 6 },
  { date: '2024-01-10', balance: 50900, trades: 7 },
  { date: '2024-01-11', balance: 51500, trades: 8 },
  { date: '2024-01-12', balance: 51200, trades: 9 },
  { date: '2024-01-15', balance: 51575, trades: 10 },
  { date: '2024-01-16', balance: 51940, trades: 11 },
  { date: '2024-01-17', balance: 52326, trades: 12 }
];

export const getTradeStats = () => {
  const closedTrades = mockTrades.filter(trade => trade.status === 'CLOSED');
  const openTrades = mockTrades.filter(trade => trade.status === 'OPEN');
  
  const totalTrades = closedTrades.length;
  const winningTrades = closedTrades.filter(trade => (trade.pnl || 0) > 0).length;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  
  const totalPnL = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
  const totalUnrealizedPnL = openTrades.reduce((sum, trade) => sum + (trade.unrealizedPnl || 0), 0);
  
  const wins = closedTrades.filter(trade => (trade.pnl || 0) > 0);
  const losses = closedTrades.filter(trade => (trade.pnl || 0) < 0);
  
  const avgWin = wins.length > 0 ? wins.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / wins.length : 0;
  const avgLoss = losses.length > 0 ? losses.reduce((sum, trade) => sum + (trade.pnl || 0), 0) / losses.length : 0;
  
  const largestWin = wins.length > 0 ? Math.max(...wins.map(trade => trade.pnl || 0)) : 0;
  const largestLoss = losses.length > 0 ? Math.min(...losses.map(trade => trade.pnl || 0)) : 0;
  
  return {
    totalTrades: mockTrades.length,
    closedTrades: totalTrades,
    openTrades: openTrades.length,
    winRate,
    totalPnL,
    totalUnrealizedPnL,
    avgWin,
    avgLoss,
    largestWin,
    largestLoss,
    currentBalance: mockBankrollData[mockBankrollData.length - 1].balance
  };
};