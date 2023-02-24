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

    def trade_stock(
        self,
        user_uid: str,
        share_number: float,
        target_price: float,
        current_price: float,
        comp_name: str
    ):
        self.cur.execute(f"""
          SELECT cashvalue from users WHERE uid='{user_uid}';
        """)
        cash_value = float(self.cur.fetchone())

        self.cur.execute(f"""
          SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{comp_name}';
        """)
        portfolio_data = self.cur.fetchone()
        if portfolio_data != None:
            shares_holding = float(portfolio_data[0])

        trade_value = share_number * target_price
        available_shares = 50

        if current_price != target_price:
            return "Invalid 3"

        if abs(share_number) > available_shares:
            return "Invalid 3"
        elif trade_value > cash_value and share_number > 0:
            return "Invalid 2"

        elif share_number > 0:
            if portfolio_data != None:
                self.cur.execute(f"""
                    INSERT INTO trade_history VALUES (
                        '{user_uid}',
                        '{comp_name}',
                        {round(float(time.time()), 2)},
                        {round(share_number,2)},
                        {round(target_price*share_number,2)}
                    );
                    UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
                    WHERE uid='{user_uid}';
                    UPDATE portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
                    WHERE uid='{user_uid}' and company_id='{comp_name}';
                    UPDATE portfolio SET cost = (cost+{round(target_price*share_number,2)})
                    WHERE uid='{user_uid}' and company_id='{comp_name}';
                """)
                self.conn.commit()
            else:
                self.cur.execute(f"""
                    INSERT INTO trade_history VALUES (
                        '{user_uid}',
                        '{comp_name}',
                        {round(float(time.time()), 2)},
                        {round(share_number,2)},
                        {round(target_price*share_number,2)}
                    );
                    UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
                    WHERE uid='{user_uid}';
                    INSERT INTO portfolio VALUES (
                        '{user_uid}',
                        '{comp_name}',
                        {round(share_number,2)},
                        {round(target_price*share_number,2)}
                    );
                """)
                self.conn.commit()

        else:
            if portfolio_data != None:
                if abs(share_number) > shares_holding:
                    return "Invalid 1"
                else:
                    self.cur.execute(f"""
                        INSERT INTO trade_history VALUES (
                            '{user_uid}',
                            '{comp_name}',
                            {round(float(time.time()), 2)},
                            {round(share_number,2)},
                            {round(target_price*share_number,2)}
                        );
                        UPDATE users SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
                        WHERE uid='{user_uid}';
                        UPDATE portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
                        WHERE uid='{user_uid}' and company_id='{comp_name}';
                        UPDATE portfolio SET cost = (cost+{round(target_price*share_number,2)})
                        WHERE uid='{user_uid}' and company_id='{comp_name}';
                        
                    """)
                    self.conn.commit()
            else:
                return "Invalid 1"

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
