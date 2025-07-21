import { BankrollChart } from "@/components/BankrollChart";
import { StatsOverview } from "@/components/StatsOverview";
import { ActiveTrades } from "@/components/ActiveTrades";
import { RecentTrades } from "@/components/RecentTrades";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to TradeTracker. Monitor your portfolio performance and active trades.
        </p>
      </div>

      <StatsOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <BankrollChart />
        <ActiveTrades />
      </div>

      <RecentTrades />
    </div>
  );
};

export default Index;
