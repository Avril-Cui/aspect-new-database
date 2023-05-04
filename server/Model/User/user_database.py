import time

class UserDatabaseCommands:

    def __init__(self, conn, cur):
        self.conn = conn
        self.cur = cur

    def create_user_table(self):
        self.cur.execute('DROP TABLE IF EXISTS users;')
        self.cur.execute("""
            CREATE TABLE users (
            uid varchar (100) PRIMARY KEY,
            user_name varchar (100) NOT NULL,
            cashValue NUMERIC NOT NULL);
        """)

        self.conn.commit()

    def create_portfolio_table(self):
        self.cur.execute(f'DROP TABLE IF EXISTS portfolio;')
        self.cur.execute(f"""
            CREATE TABLE portfolio (uid varchar (100),
            company_id varchar (100) NOT NULL,
            shares_holding NUMERIC NOT NULL,
            pending_shares_holding NUMERIC,
            cost NUMERIC NOT NULL);
        """)
        self.conn.commit()

    def create_trade_history_table(self ):
        self.cur.execute(f'DROP TABLE IF EXISTS trade_history;')
        self.cur.execute(f"""
            CREATE TABLE trade_history (
                uid varchar (100),
                company_id varchar (100),
                timestamp NUMERIC NOT NULL,
                shares NUMERIC NOT NULL,
                value NUMERIC NOT NULL
            );
        """)
        self.conn.commit()

    def intialize_user(self, uid, user_name):
        self.cur.execute(f"""
            INSERT INTO users
            VALUES (
                '{uid}', '{user_name}', 100000
            );
        """)
        self.conn.commit()

    def get_comp_holding_list(self, user_uid):
        self.cur.execute(f"""
            SELECT company_id from portfolio WHERE uid = '{user_uid}';
        """)
        result = list(self.cur.fetchall())
        company_list = []
        for index in range(len(result)):
            company_list.append(result[index][0])
        return company_list

    def get_portfolio_info(self, user_uid, company_prices):
        self.cur.execute(f"""
            SELECT users.cashvalue, portfolio.company_id, portfolio.shares_holding, portfolio.cost
            FROM users JOIN portfolio on users.uid = portfolio.uid and 
            users.uid = '{user_uid}' and portfolio.uid = '{user_uid}';
        """)

        result = list(self.cur.fetchall())
        if result == []:
            self.cur.execute(f"""
                SELECT cashvalue FROM users WHERE uid = '{user_uid}';
            """)
            cash_value = float(self.cur.fetchone()[0])
            user_portfolio = {
                "portfolio_value": {
                    "cashValue": cash_value,
                    "category": "portfolio_value",
                    "holdingValue": 0,
                    "accountValue": cash_value
                }
            }
            return user_portfolio
        else:
            cash_value = float(result[0][0])

            user_portfolio = {
                "portfolio_value": {
                    "cashValue": cash_value,
                    "category": "portfolio_value"
                }
            }

            holding_value = 0

            for index in range(len(result)):
                company = result[index][1]
                shares_holding = float(result[index][2])
                cost = float(result[index][3])
                holding_value += float(company_prices[company]) * float(shares_holding)
                user_portfolio[company] = {
                    "shares_holding": shares_holding,
                    "total_holding": float(company_prices[company]) * float(shares_holding),
                    "cost": cost,
                    "category": company
                }

            user_portfolio["portfolio_value"]["holdingValue"] = round(holding_value, 2)
            user_portfolio["portfolio_value"]["accountValue"] = round(holding_value + cash_value, 2)

            return user_portfolio

    def get_total_rank(self ):
        # Format: [('friday', Decimal('100000'), 1), ('avrilcui', Decimal('99250'), 2)]
        self.cur.execute(f"""
            SELECT user_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank FROM users;
        """)
        result = list(self.cur.fetchall())
        ranking = {}
        for index in range(len(result)):
            ranking[result[index][0]] = {
                "cash_value": float(round(result[index][1], 2)),
                "value_change": float(round(result[index][1]-100000, 2)),
                "pct_change": float(round((result[index][1]-100000)/100000, 4)),
                "ranking": int(round(result[index][2]))
            }
        return ranking

    def get_rank_user(self, user_uid):
        self.cur.execute(f"""
            SELECT uid, user_name, cashvalue, rank
            FROM (
            SELECT uid, user_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank
            FROM users
            ) subquery
            WHERE uid = '{user_uid}';
        """)
        result = self.cur.fetchone()
        rank = result[3]
        return rank