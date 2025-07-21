import { NavLink } from "react-router-dom";
import { BarChart3, TrendingUp, Activity, Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: BarChart3 },
    { to: "/trades", label: "All Trades", icon: TrendingUp },
    { to: "/active", label: "Active Trades", icon: Activity },
    { to: "/add-trade", label: "Add Trade", icon: Plus },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">TradeTracker</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Activity className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}