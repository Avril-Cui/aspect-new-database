import os
from dotenv import load_dotenv
import psycopg2
load_dotenv()
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_ROOT_NAME = os.getenv("DATABASE_ROOT_NAME")

class UserDatabaseCommands:

    def __init__(self):
        self.conn = psycopg2.connect(
            host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
            database=DATABASE_ROOT_NAME if DATABASE_ROOT_NAME!=None else "aspectdatabase",
            user=DATABASE_USER if DATABASE_USER!=None else "postgres",
            password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
        )
        self.cur = self.conn.cursor()

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

    def create_trade_history_table(self):
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
            SELECT * from users WHERE uid='{uid}';
        """)
        result = self.cur.fetchall()
        print(result)
        if len(result) < 1:
            self.cur.execute(f"""
                INSERT INTO users
                VALUES (
                    '{uid}', '{user_name}', 100000
                );
            """)
            self.conn.commit()
        else:
            print("already exists")

    def get_comp_holding_list(self, user_uid):
        self.cur.execute(f"""
            SELECT company_id from portfolio WHERE uid = '{user_uid}';
        """)
        try:
            result = self.cur.fetchall()
            company_list = []
            for index in range(len(result)):
                if result[index][0] != None:
                    company_list.append(result[index][0])
            return company_list
        except:
            try:
                result = self.cur.fetchone()[0]
                return [result]
            except:
                return []

    def get_portfolio_info(self, user_uid, company_prices):
        self.cur.execute(f"""
            SELECT users.cashvalue, portfolio.company_id, portfolio.shares_holding, portfolio.cost
            FROM users JOIN portfolio on users.uid = portfolio.uid and 
            users.uid = '{user_uid}' and portfolio.uid = '{user_uid}';
        """)
        try:
            results = list(self.cur.fetchall())
            print(results)
        except:
            results = []
        if results == []:
            self.cur.execute(f"""
                SELECT cashvalue FROM users WHERE uid = '{user_uid}';
            """)
            try:
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
            except:
                pass
        else:
            cash_value = float(results[0][0])

            user_portfolio = {
                "portfolio_value": {
                    "cashValue": cash_value,
                    "category": "portfolio_value"
                }
            }

            holding_value = 0

            for index in range(len(results)):

                company = results[index][1]
                shares_holding = float(results[index][2])
                cost = float(results[index][3])
                holding_value += float(company_prices[company]
                                       ) * float(shares_holding)
                user_portfolio[company] = {
                    "shares_holding": shares_holding,
                    "total_holding": float(company_prices[company]) * float(shares_holding),
                    "cost": cost,
                    "category": company,
                    "current_price": round(company_prices[company], 2),
                    "buy_price": round((float(results[index][3])/float(shares_holding)), 2)
                }

            user_portfolio["portfolio_value"]["holdingValue"] = round(
                holding_value, 2)
            user_portfolio["portfolio_value"]["accountValue"] = round(
                holding_value + cash_value, 2)

            return user_portfolio

    def get_total_rank(self):
        # Format: [('friday', Decimal('100000'), 1), ('avrilcui', Decimal('99250'), 2)]
        self.cur.execute(f"""
            SELECT user_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank FROM users;
        """)
        try:
            result = list(self.cur.fetchall())
        except:
            result = []
        ranking = {}
        for index in range(len(result)):
            ranking[result[index][0]] = {
                "cash_value": float(round(result[index][1], 2)),
                "value_change": float(round(result[index][1]-100000, 2)),
                "pct_change": float(round((result[index][1]-100000)/100000, 4)),
                "ranking": int(round(result[index][2]))
            }
        return ranking

    def get_fifteen_rank(self):
        # Format: [('friday', Decimal('100000'), 1), ('avrilcui', Decimal('99250'), 2)]
        self.cur.execute(f"""
            SELECT user_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank FROM users;
        """)
        try:
            result = list(self.cur.fetchall())[:15]
            ranking = {}
            for index in range(len(result)):
                ranking[result[index][0]] = {
                    "cash_value": float(round(result[index][1], 2)),
                    "value_change": float(round(result[index][1]-100000, 2)),
                    "pct_change": float(round((result[index][1]-100000)/100000, 4)),
                    "ranking": int(round(result[index][2]))
                }
            return ranking
        except:
            ranking = {
                "loading": {
                    "cash_value": 100000,
                    "value_change": 0,
                    "pct_change": 0,
                    "ranking": 0
                }
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
        try:
            rank = self.cur.fetchone()[3]
            return rank
        except:
            return 0
        # try:
        #     result = self.cur.fetchone()
        #     rank = result[3]
        #     return rank
        # except:
        #     return 0

    def get_user_cash(self, user_uid):
        self.cur.execute(f"""
            SELECT cashvalue from users WHERE uid = '{user_uid}';
        """)
        try:
            cash = self.cur.fetchone()[0]
            return cash
        except:
            return 0
