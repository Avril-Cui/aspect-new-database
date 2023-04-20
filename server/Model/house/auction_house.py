import time
import uuid

class AuctionHouse:
	def __init__(self, conn, cur):
		self.conn = conn
		self.cur = cur
		self.bot_initial_asset = 100000000000000
	
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
		  SELECT cashvalue from users WHERE uid='{user_uid}';
		""")
		cash_value = float(self.cur.fetchone()[0])

		self.cur.execute(f"""
		  SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{comp_name}';
		""")
		portfolio_data = self.cur.fetchone()
		if portfolio_data != None:
			shares_holding = float(portfolio_data[0])

		trade_value = share_number * trade_price

		if trade_value > cash_value and share_number > 0:
			return "Invalid 2"

		elif share_number > 0:
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
			if portfolio_data != None:
				self.cur.execute(f"""
					UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
					WHERE uid='{user_uid}';
				""")
				self.conn.commit()
			else:
				self.cur.execute(f"""
					UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
					WHERE uid='{user_uid}';
				""")
				self.conn.commit()

		else:
			if portfolio_data != None:
				if abs(share_number) > shares_holding:
					return "Invalid 1"
				else:
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
					self.cur.execute(f"""
						UPDATE users SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
						WHERE uid='{user_uid}';						
					""")
					self.conn.commit()
			else:
				return "Invalid 1"

	def cancel_order(
		self,
		order_id
	):
		self.cur.execute(f"""
			DELETE FROM orders WHERE order_id='{order_id}';
		""")
		self.conn.commit()
	
	def get_order_book(self, comp_name):
		self.cur.execute(f"""
			SELECT sum (shares) AS total_shares from orders WHERE action='buy';
		""")
		total_buy_shares = float(self.cur.fetchone()[0])

		self.cur.execute(f"""
			SELECT sum (shares) AS total_shares from orders WHERE action='sell';
		""")
		if self.cur.fetchone()[0] != None:
			total_sell_shares = float(self.cur.fetchone()[0])
		else:
			total_sell_shares = 0

		self.cur.execute(f"""
			SELECT price, shares, RANK() OVER (ORDER BY price DESC) as rank FROM orders WHERE 
			accepted={False} AND company_name='{comp_name}' AND action='buy';
		""")
		buy_orders = list(self.cur.fetchall())
		buy_five_orders = []
		price = buy_orders[0][0]

		for index in range(len(buy_orders)):
			if buy_orders[index][0] != price or index==0:
				buy_five_orders.append([float(buy_orders[index][0]), float(buy_orders[index][1]), round(float(buy_orders[index][1])/total_buy_shares * 100, 2)])
				price = buy_orders[index][0]
			else:
				buy_five_orders[-1][1] += float(buy_orders[index][1])
				buy_five_orders[-1][2] = round(buy_five_orders[-1][1]/total_buy_shares * 100, 2)

		try:
			lowest_buy = buy_five_orders[-1][0]
		except:
			lowest_buy = 100

		if len(buy_five_orders) <= 5:
			for i in range(5-len(buy_five_orders)):
				buy_five_orders.append([float(lowest_buy)-0.01*(i+1), 0, 0])


		self.cur.execute(f"""
			SELECT price, shares, RANK() OVER (ORDER BY price DESC) as rank FROM orders WHERE 
			accepted={False} AND company_name='{comp_name}' AND action='sell';
		""")
		sell_orders = list(self.cur.fetchall())
		sell_five_orders = []
		price = sell_orders[0][0]

		for index in range(len(sell_orders)):
			if sell_orders[index][0] != price or index==0:
				sell_five_orders.append([float(sell_orders[index][0]), float(sell_orders[index][1]), round(float(sell_orders[index][1])/total_sell_shares * 100, 2)])
				price = sell_orders[index][0]
			else:
				sell_five_orders[-1][1] += float(sell_orders[index][1])
				sell_five_orders[-1][2] = round(sell_five_orders[-1][1]/total_sell_shares * 100, 2)

		try:
			highest_sell = sell_orders[0][0]
		except:
			highest_sell = 100
		if len(sell_five_orders) <= 5:
			for i in range(5-len(sell_five_orders)):
				sell_five_orders.insert(0, [float(highest_sell)+0.01*(i+1), 0, 0])
		
		order_book = [sell_five_orders, buy_five_orders]
		return order_book
	
	def get_all_active_orders(self, comp_name):
		self.cur.execute(f"""
			SELECT order_id, user_uid, company_name, price, shares, timestamp, action
			FROM orders WHERE accepted={False} AND company_name='{comp_name}';
		""")
		active_orders = self.cur.fetchall()
		return active_orders

	def accept_order(self, price, trade_action, user_uid, comp_name, shares):
		if trade_action == "sell":
			action = "buy"
		elif trade_action == "buy":
			action = "sell"
		cur.execute(f"""
			SELECT order_id, user_uid FROM orders WHERE price={price} AND action='{action}';
		""")
		ids = list(cur.fetchall())
		share_number = 0
		for index in range(len(ids)):
			order_id = ids[index][0]
			cur.execute(f"""
				SELECT shares FROM orders WHERE order_id='{order_id}' AND action='{action}' AND price={price};
			""")
			shares=float(cur.fetchone()[0])
			if action == "buy":
				share_number+=shares
			elif action == "sell":
				share_number-=shares
		
		if abs(share_number) > abs(shares):
			cur.execute(f"""
				SELECT cashvalue from users WHERE uid='{user_uid}';
			""")
			cash_value = float(cur.fetchone()[0])
			cur.execute(f"""
				SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{comp_name}';
			""")
			portfolio_data = cur.fetchone()
			if portfolio_data != None:
				shares_holding = float(portfolio_data[0])
			trade_value = shares * price
			invalid = False
			if trade_value > cash_value and shares > 0:
				invalid = True
				return "Invalid 2"  
			elif shares > 0:
				if portfolio_data != None:
					cur.execute(f"""
						INSERT INTO trade_history VALUES (
							'{user_uid}',
							'{comp_name}',
							{round(float(time.time()), 2)},
							{round(shares,2)},
							{round(trade_value,2)}
						);
						UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
						WHERE uid='{user_uid}';
						UPDATE portfolio SET shares_holding = (shares_holding+{round(shares,2)})
						WHERE uid='{user_uid}' and company_id='{comp_name}';
						UPDATE portfolio SET cost = (cost+{round(shares,2)})
						WHERE uid='{user_uid}' and company_id='{comp_name}';
					""")
					conn.commit()
				else:
					cur.execute(f"""
						INSERT INTO trade_history VALUES (
							'{user_uid}',
							'{comp_name}',
							{round(float(time.time()), 2)},
							{round(shares,2)},
							{round(trade_value,2)}
						);
						UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
						WHERE uid='{user_uid}';
						INSERT INTO portfolio VALUES (
							'{user_uid}',
							'{comp_name}',
							{round(shares,2)},
							{round(trade_value,2)}
						);
					""")
					conn.commit()
			else:
				if portfolio_data != None:
					if abs(shares) > shares_holding:
						invalid = True
						return "Invalid 1"
					else:
						cur.execute(f"""
							INSERT INTO trade_history VALUES (
								'{user_uid}',
								'{comp_name}',
								{round(float(time.time()), 2)},
								{round(shares,2)},
								{round(trade_value,2)}
							);
							UPDATE users SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
							WHERE uid='{user_uid}';
							UPDATE portfolio SET shares_holding = (shares_holding+{round(shares,2)})
							WHERE uid='{user_uid}' and company_id='{comp_name}';
							UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
							WHERE uid='{user_uid}' and company_id='{comp_name}';
							
						""")
						conn.commit()
				else:
					invalid = True
					return "Invalid 1"

			if invalid == False:
				cur.execute(f"""
					SELECT order_id, user_uid FROM orders WHERE price={price} AND action='{action}';
				""")
				ids = list(cur.fetchall())
				total_shares = 0
				for index in range(len(ids)):
					if total_shares <= shares:
						order_id = ids[index][0]
						user_uid = ids[index][1]
						cur.execute(f"""
							UPDATE orders SET accepted={True} WHERE order_id='{order_id}';
						""")
						conn.commit()  
						cur.execute(f"""
							SELECT SUM (shares) as total_shares FROM orders WHERE action='{action}' AND price={price} AND user_uid='{user_uid}';
						""")
						conn.commit()
						order_shares = float(cur.fetchone()[0])
						trade_value = order_shares * price
						if total_shares + order_shares > shares and total_shares < shares:
							trade_share_number = shares - total_shares
							if action == 'buy':
								cur.execute(f"""
									INSERT INTO trade_history VALUES (
										'{user_uid}',
										'{comp_name}',
										{round(float(time.time()), 2)},
										{round(trade_share_number,2)},
										{round(trade_value,2)}
									);
									UPDATE portfolio SET shares_holding = (shares_holding+{round(trade_share_number,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
									UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
								""")
								conn.commit()
							else:
								cur.execute(f"""
									INSERT INTO trade_history VALUES (
										'{user_uid}',
										'{comp_name}',
										{round(float(time.time()), 2)},
										{-round(trade_share_number,2)},
										{-round(trade_value,2)}
									);
									UPDATE portfolio SET shares_holding = (shares_holding-{round(trade_share_number,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
									UPDATE portfolio SET cost = (cost-{round(trade_value,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
								""")
								conn.commit()
						else:
							if action == 'buy':
								cur.execute(f"""
									INSERT INTO trade_history VALUES (
										'{user_uid}',
										'{comp_name}',
										{round(float(time.time()), 2)},
										{round(order_shares,2)},
										{round(trade_value,2)}
									);
									UPDATE portfolio SET shares_holding = (shares_holding+{round(order_shares,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
									UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
								""")
								conn.commit()
							else:
								cur.execute(f"""
									INSERT INTO trade_history VALUES (
										'{user_uid}',
										'{comp_name}',
										{round(float(time.time()), 2)},
										{-round(order_shares,2)},
										{-round(trade_value,2)}
									);
									UPDATE portfolio SET shares_holding = (shares_holding-{round(order_shares,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
									UPDATE portfolio SET cost = (cost-{round(trade_value,2)})
									WHERE uid='{user_uid}' and company_id='{comp_name}';
								""")
								conn.commit()
							total_shares += order_shares

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

	def get_user_pending_orders(self, user_uid):
		self.cur.execute(f"""
			SELECT order_id, company_name, price, shares FROM orders WHERE accepted={False} and user_uid='{user_uid}';
		""")
		pending_orders = self.cur.fetchall()
		return pending_orders

	def create_bot_table(self):
		self.cur.execute('DROP TABLE IF EXISTS bots;')
		self.cur.execute("""
			CREATE TABLE bots (
			bot_id varchar (100) PRIMARY KEY,
			bot_name varchar (100) NOT NULL,
			cashValue NUMERIC NOT NULL);
		""")
		self.conn.commit()

	def intialize_bot(self, bot_id, bot_name):
		self.cur.execute(f"""
			INSERT INTO bots
			VALUES (
				'{bot_id}', '{bot_name}', {self.bot_initial_asset}
			);
		""")
		self.conn.commit()
	
	def get_total_rank(self ):
		self.cur.execute(f"""
			SELECT bot_name, cashvalue, RANK() OVER (ORDER BY cashvalue DESC) as rank FROM bots;
		""")
		result = list(self.cur.fetchall())
		ranking = {}
		for index in range(len(result)):
			ranking[result[index][0]] = {
				"cash_value": float(round(result[index][1], 2)),
				"value_change": float(round(result[index][1]-self.bot_initial_asset, 2)),
				"pct_change": float(round((result[index][1]-self.bot_initial_asset)/self.bot_initial_asset, 4)),
				"ranking": int(round(result[index][2]))
			}
		return ranking

import psycopg2
conn = psycopg2.connect(
	host="localhost",
	database="aspectdatabase",
	user="postgres",
	password="Xiaokeai0717"
)
cur = conn.cursor()

house = AuctionHouse(conn, cur)
house.create_order_table()
# house.put_order("Avril", 10, 100, "wrkn")
# house.put_order("Friday", 20, 200, "wrkn")
# house.put_order("GameMaster", 30, 300, "wrkn")
# house.put_order("Face", 50, 300, "wrkn")
# house.put_order("Fuqi", -30, 99, "wrkn")
# house.put_order("Face", -10, 180, "wrkn")

# house.put_order("Avril", 40, 100, "ast")
# house.put_order("Friday", 10, 200, "ast")
# house.put_order("GameMaster", 80, 300, "ast")
# house.put_order("Face", 10, 300, "ast")
# house.put_order("Fuqi", -60, 99, "ast")
# house.put_order("Face", -10, 180, "ast")

# house.put_order("Avril", 30, 100, "dsc")
# house.put_order("Friday", 10, 200, "dsc")
# house.put_order("GameMaster", 60, 300, "dsc")
# house.put_order("Face", 80, 300, "dsc")
# house.put_order("Fuqi", -20, 99, "dsc")
# house.put_order("Face", -90, 180, "dsc")

# # house.get_order_book("wrkn")
# # house.cancel_order("9e9bf8fb-87eb-428a-8a99-37a7158eb9c9")