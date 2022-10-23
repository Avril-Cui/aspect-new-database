from stock_simulator import StockSimulator

class PriceHistory:
    """
        company_parameter = {
            "company_one": {
                "initial_price" = 0,
                "macro_params" = macro["event"](),
                "micro_params" = micro["event"],
            }
        }
    """
    def __init__(self, company_parameter):
        self.company_parameter = company_parameter
	
    def set_comp_history(self):
        stock_price_mapping = {}
        for company in self.company_parameter:
            company_simulator = StockSimulator(
                self.company_parameter[company]["initial_price"],
                self.company_parameter[company]["macro_params"],
                self.company_parameter[company]["micro_params"]
            )
            company_price_list = company_simulator.loop_per_second()
            stock_price_mapping[company] = company_price_list
        
        return stock_price_mapping

		