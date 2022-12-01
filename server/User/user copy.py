class UserPortfolio:
    def __init__(
        self,
        user_name: str,
    ):
        self.default_initial_value = 100000
        self.available_shares = 50
        self.user_name = user_name
        self.portfolio = self.initialize_portfolio()

    def initialize_portfolio(self):        
        user_portfolio = {
            "portfolio_value": {
                "accountValue": 100000,
                "cashValue": 100000,
                "holdingValue": 0,
                "category": "portfolio_value"
            }
        }

        self.portfolio = user_portfolio
        return(self.portfolio)

    def update_value(
        self,
        name_price_dict: dict
    ):
        for key in name_price_dict:
            self.portfolio["portfolio_value"]["accountValue"] = round(self.default_initial_value + (name_price_dict[key] * self.portfolio[key]["shares"]- self.portfolio[key]["total_holdings"]),2)
            self.portfolio["portfolio_value"]["holdingValue"] += round((name_price_dict[key] * self.portfolio[key]["shares"]- self.portfolio[key]["total_holdings"]),2)
            self.portfolio[key]["total_worth"] += round((name_price_dict[key] * self.portfolio[key]["shares"]- self.portfolio[key]["total_holdings"]),2)
        return (self.portfolio)

    def trade_stock(
        self, 
        comp_name: str, 
        share_number: float, 
        target_price: float,
        current_price: float,
    ):
        trade_value = share_number * target_price
        available_shares = 50

        if round(current_price, 2) != target_price:
            return "Invalid 3"

        if abs(share_number) > available_shares:
            return "Invalid 3"
        elif trade_value > self.portfolio["portfolio_value"]["cashValue"] and share_number > 0:
            return "Invalid 2"

        if share_number > 0:
            if comp_name in self.portfolio:
                self.portfolio["portfolio_value"]["cashValue"] -= round(trade_value,2)
                self.portfolio["portfolio_value"]["holdingValue"] += round(trade_value,2)
                self.portfolio[comp_name]["total_holdings"] += round(trade_value,2)
                self.portfolio[comp_name]["shares"] += round(share_number,2)
                self.portfolio[comp_name]["last_price"] = round(target_price,2)
            else:
                self.portfolio["portfolio_value"]["cashValue"] -= round(trade_value,2)
                self.portfolio["portfolio_value"]["holdingValue"] += round(trade_value,2)
                print(self.portfolio["portfolio_value"]["holdingValue"])
                self.portfolio[comp_name]={
                    "total_holdings": round(trade_value,2),
                    "total_worth": round(trade_value,2),
                    "category": comp_name,
                    "last_price": round(target_price,2),
                    "shares": round(share_number,2),
                }
            return (self.portfolio)
        else:
            if comp_name in self.portfolio:
                if abs(share_number) > self.portfolio[comp_name]["shares"]:
                    return "Invalid 1"
                else:
                    self.portfolio["portfolio_value"]["cashValue"] -= round(trade_value,2)
                    self.portfolio["portfolio_value"]["holdingValue"] += round(trade_value,2)
                    self.portfolio[comp_name]["total_holdings"] += round(trade_value,2)
                    self.portfolio[comp_name]["shares"] += round(share_number,2)
                    return (self.portfolio)
            else:
                return "Invalid 1"