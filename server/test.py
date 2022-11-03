import unittest
from User.user import UserPortfolio
from unittest.mock import patch

class TestUser(unittest.TestCase):

    """
        Class return the map (inside class).
        1. unit test for user class (assert) -> automate
        2. model -> a map of comp_name and price_list
        3. mock time and model (price history, PoT, trading)
    """

    def test_initialization(self):
        user = UserPortfolio("Avril")
        portfolio = user.initialize_portfolio()
        expected_result = {
            'portfolio_value': {
                'accountValue': 100000, 
                'cashValue': 100000, 
                'category': 'portfolio_value', 
                'holdingValue': 0
            }
        }
        self.assertEqual(portfolio, expected_result)
    
    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=50.30)
    def test_buy(self, loop_per_second):
        user = UserPortfolio("Avril")
        price = loop_per_second()
        portfolio = user.trade_stock("WRKN", 20, price, price)
        expected_result = {
            'portfolio_value': {
                'accountValue': 100000, 
                'cashValue': 100000-20*price, 
                'category': 'portfolio_value', 
                'holdingValue': 20*price, 
            },
            'WRKN': {
                'total_holdings': 20*price,
                'category': 'WRKN', 
                'last_price': price, 
                'shares': 20, 
            }
        }
        self.assertEqual(portfolio, expected_result)

    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=60)
    def test_sell(self, loop_per_second):
        user = UserPortfolio("Avril")
        price = loop_per_second()
        portfolio = user.trade_stock("WRKN", 20, price, price)
        portfolio = user.trade_stock("WRKN", -10, price, price)
        expected_result = {
            'portfolio_value': {
                'accountValue': 100000, 
                'cashValue': 100000-20*price+10*price, 
                'category': 'portfolio_value', 
                'holdingValue': 20*price-10*price, 
            },
            'WRKN': {
                'total_holdings': 20*price-10*price, 
                'category': 'WRKN', 
                'last_price': price, 
                'shares': 10, 
            }
        }
        self.assertEqual(portfolio, expected_result)

    # Functionality: Error type 1 -> sell a stock that I do not own.
    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=60)
    def test_invalid_one(self, loop_per_second):
        price = loop_per_second()
        user = UserPortfolio("Avril")
        portfolio = user.trade_stock("SGO", -10, price, price)
        self.assertEqual(portfolio, "Invalid 1")
    
    # Functionality: Error type 2 -> buy a stock that I do not have money for.
    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=1000000000000)
    def test_invalid_two(self, loop_per_second):
        price = loop_per_second()
        user = UserPortfolio("Avril")
        portfolio = user.trade_stock("WRKN", 10, price, price)
        self.assertEqual(portfolio, "Invalid 2")

    # Functionality: Error type 3 -> not enough shares available for trade.
    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=60)
    def test_invalid_three(self, loop_per_second):
        price = loop_per_second()
        user = UserPortfolio("Avril")
        portfolio = user.trade_stock("WRKN", 60, price, price)
        self.assertEqual(portfolio, "Invalid 3")

    # Functionality: pending state -> no available shares for buy/sell yet.
    @patch('Model.stock_simulator.StockSimulator.loop_per_second', return_value=60)
    def test_pending(self, loop_per_second):
        price = loop_per_second()
        user = UserPortfolio("Avril")
        portfolio = user.trade_stock("WRKN", 30, 70, price)
        self.assertEqual(portfolio, "No available shares for trade now, your trade will enter pending state.")

if __name__ == "__main__":
    unittest.main()