import time
import uuid

class AuctionHouse:
	def __init__(self, conn, cur):
		self.conn = conn
		self.cur = cur
	
	def create_order_table(self):
		self.cur.execute(f'DROP TABLE IF EXISTS orders;')
		self.cur.execute(f"""
			CREATE TABLE orders (
				order_id varchar(100) PRIMARY KEY,
				user_uid varchar(100) NOT NULL,
				company_name varchar(100) NOT NULL,
				price NUMERIC NOT NULL,
				shares NUMERIC NOT NULL,
				timestamp NUMERIC NOT NULL,
				action varchar(100) NOT NULL,
				accepted BOOLEAN NOT NULL
			);
		""")
		self.conn.commit()
	
	def put_order(
		self,
		user_uid: str,
		share_number: float,
		trade_price: float,
		comp_name: str
	):
		if share_number > 0:
			action = "buy"
		elif share_number < 0:
			action = "sell"
		
		order_id = str(uuid.uuid4())

		self.cur.execute(f"""
			INSERT INTO orders VALUES(
				'{order_id}',
				'{user_uid}',
				'{comp_name}',
				{round(trade_price, 2)},
				{abs(round(share_number, 2))},
				{round(float(time.time()), 2)},
				'{action}',
				{False}
			);
		""")
		self.conn.commit()
	
	def cancel_order(
		self,
		order_id
	):
		self.cur.execute(f"""
			DELETE FROM orders WHERE order_id='{order_id}';
		""")
		self.conn.commit()
	
	def get_all_active_orders(self):
		self.cur.execute(f"""
			SELECT order_id, user_uid,company_name,price, shares, timestamp, action
			FROM orders WHERE accepted={False};
		""")
		active_orders = self.cur.fetchall()
		print(active_orders)

	def trade_stock(
		self,
		user_uid: str,
		share_number: float,
		target_price: float,
		comp_name: str
	):
		self.cur.execute(f"""
		  SELECT cashvalue from users WHERE uid='{user_uid}';
		""")
		cash_value = float(self.cur.fetchone()[0])

		self.cur.execute(f"""
		  SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{comp_name}';
		""")
		portfolio_data = self.cur.fetchone()
		if portfolio_data != None:
			shares_holding = float(portfolio_data[0])
		print(portfolio_data)

		trade_value = share_number * target_price

		if trade_value > cash_value and share_number > 0:
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

import psycopg2
conn = psycopg2.connect(
    host="localhost",
    database="aspectdatabase",
    user="postgres",
    password="Xiaokeai0717"
)
cur = conn.cursor()

house = AuctionHouse(conn, cur)
# house.create_order_table()
house.put_order("Avril", 10, 100, "wrkn")
house.put_order("Friday", 20, 200, "sgo")
house.put_order("GameMaster", 30, 300, "ast")

house.get_all_active_orders()
# house.cancel_order("9e9bf8fb-87eb-428a-8a99-37a7158eb9c9")