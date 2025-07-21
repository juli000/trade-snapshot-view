import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Calculator } from "lucide-react";

export default function AddTrade() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    symbol: "",
    type: "",
    quantity: "",
    entryPrice: "",
    exitPrice: "",
    status: "OPEN"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.symbol || !formData.type || !formData.quantity || !formData.entryPrice) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // This would normally submit to your backend/database
    toast({
      title: "Trade Added Successfully!",
      description: `${formData.type} ${formData.quantity} shares of ${formData.symbol} at $${formData.entryPrice}`,
    });

    // Reset form
    setFormData({
      symbol: "",
      type: "",
      quantity: "",
      entryPrice: "",
      exitPrice: "",
      status: "OPEN"
    });
  };

  const calculatePositionSize = () => {
    const quantity = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.entryPrice) || 0;
    return quantity * price;
  };

  const calculatePnL = () => {
    if (!formData.exitPrice) return null;
    const quantity = parseFloat(formData.quantity) || 0;
    const entryPrice = parseFloat(formData.entryPrice) || 0;
    const exitPrice = parseFloat(formData.exitPrice) || 0;
    
    if (formData.type === 'BUY') {
      return (exitPrice - entryPrice) * quantity;
    } else {
      return (entryPrice - exitPrice) * quantity;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Trade</h1>
        <p className="text-muted-foreground">
          Record a new trade to track your portfolio performance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Trade Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Symbol */}
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol *</Label>
                <Input
                  id="symbol"
                  placeholder="TSLA, AAPL, etc."
                  value={formData.symbol}
                  onChange={(e) => setFormData({...formData, symbol: e.target.value.toUpperCase()})}
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Trade Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trade type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">Buy</SelectItem>
                    <SelectItem value="SELL">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Number of shares"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>

              {/* Entry Price */}
              <div className="space-y-2">
                <Label htmlFor="entryPrice">Entry Price *</Label>
                <Input
                  id="entryPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData({...formData, entryPrice: e.target.value})}
                  required
                />
              </div>

              {/* Exit Price */}
              <div className="space-y-2">
                <Label htmlFor="exitPrice">Exit Price (Optional)</Label>
                <Input
                  id="exitPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.exitPrice}
                  onChange={(e) => setFormData({...formData, exitPrice: e.target.value})}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OPEN">Open</SelectItem>
                    <SelectItem value="CLOSED">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calculated Values */}
            {(formData.quantity && formData.entryPrice) && (
              <Card className="bg-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Calculator className="h-4 w-4" />
                    <span>Calculated Values</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position Size:</span>
                    <span className="font-semibold">
                      ${calculatePositionSize().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {formData.exitPrice && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">P&L:</span>
                      <span className={`font-semibold ${
                        (calculatePnL() || 0) >= 0 ? 'text-profit' : 'text-loss'
                      }`}>
                        ${(calculatePnL() || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                Add Trade
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setFormData({
                  symbol: "",
                  type: "",
                  quantity: "",
                  entryPrice: "",
                  exitPrice: "",
                  status: "OPEN"
                })}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-primary">Ready for Real Trading Data?</h3>
            <p className="text-sm text-muted-foreground">
              Connect to Supabase to store your trades in a real database and add features like user authentication, 
              real-time price updates, and advanced analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}