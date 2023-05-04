import time
import uuid
import random

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
	
	def create_bot_order_table(self):
		self.cur.execute(f'DROP TABLE IF EXISTS bot_orders;')
		self.cur.execute(f"""
			CREATE TABLE bot_orders (
				order_id varchar(100) PRIMARY KEY,
				bot_id varchar(100) NOT NULL,
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
		# self.cur.execute(f"""
		# 	UPDATE portfolio SET pending_shares_holding = (shares_holding)
		# 	WHERE uid='{user_uid}' and company_id='{comp_name}';
		# """)
		# self.conn.commit()

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
		
		self.cur.execute(f"""
		  SELECT pending_shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{comp_name}';
		""")
		pending_portfolio_data = self.cur.fetchone()
		if pending_portfolio_data != None:
			pending_shares_holding = float(pending_portfolio_data[0])

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

		elif share_number < 0:
			if portfolio_data != None:
				if abs(share_number) > shares_holding or abs(share_number) > pending_shares_holding:
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
						UPDATE portfolio SET pending_shares_holding = (pending_shares_holding-{abs(round(share_number,2))})
						WHERE uid='{user_uid}' and company_id='{comp_name}';
					""")
					self.conn.commit()	
			else:
				return "Invalid 1"

	def cancel_order(
		self,
		order_id
	):

		self.cur.execute(f"""
			SELECT user_uid, price, shares, action, company_name FROM orders WHERE order_id='{order_id}';
		""")
		result = self.cur.fetchone()
		user_uid = result[0]
		price = result[1]
		shares = result[2]
		action = result[3]
		company_name = result[4]
		trade_value = price * shares
		self.cur.execute(f"""
			DELETE FROM orders WHERE order_id='{order_id}';
		""")
		self.conn.commit()
		if action == "buy":
			self.cur.execute(f"""
				UPDATE users SET cashvalue = (cashvalue+{round(trade_value, 2)})
				WHERE uid='{user_uid}';
			""")
			self.conn.commit()
		elif action == "sell":
			self.cur.execute(f"""
				UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(shares,2)})
				WHERE uid='{user_uid}' and company_id='{company_name}';
			""")
			self.conn.commit()
	
	def automated_cancel_order(
		self,
		order_id
	):
		self.cur.execute(f"""
			SELECT user_uid, price, shares, action, company_name FROM orders WHERE order_id='{order_id}';
		""")
		result = self.cur.fetchone()
		user_uid = result[0]
		price = result[1]
		shares = result[2]
		action = result[3]
		company_name = result[4]
		trade_value = price * shares
		self.cur.execute(f"""
			DELETE FROM orders WHERE order_id='{order_id}';
		""")
		self.conn.commit()
		if action == "buy":
			self.cur.execute(f"""
				UPDATE users SET cashvalue = (cashvalue+{round(trade_value, 2)})
				WHERE uid='{user_uid}';
			""")
			self.conn.commit()
		elif action == "sell":
			self.cur.execute(f"""
				UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(shares,2)})
				WHERE uid='{user_uid}' and company_id='{company_name}';
			""")
			self.conn.commit()
	
	def automated_cancel_bot_order(
		self,
		time_difference = 20
	):
		current_time = time.time()
		self.cur.execute(f"""
			SELECT order_id, bot_id, price, shares, action, company_name FROM bot_orders 
			WHERE {current_time}-timestamp > {time_difference};
		""")
		result = self.cur.fetchone()
		order_id = result[0]
		bot_id = result[1]
		price = result[2]
		shares = result[3]
		action = result[4]
		company_name = result[5]
		trade_value = price * shares
		self.cur.execute(f"""
			DELETE FROM bot_orders WHERE order_id='{order_id}';
		""")
		self.conn.commit()
		if action == "buy":
			self.cur.execute(f"""
				UPDATE bots SET cashvalue = (cashvalue+{round(trade_value, 2)})
				WHERE bot_id='{bot_id}';
			""")
			self.conn.commit()
		elif action == "sell":
			self.cur.execute(f"""
				UPDATE bot_portfolio SET pending_shares_holding = (pending_shares_holding+{round(shares,2)})
				WHERE bot_id='{bot_id}' and company_id='{company_name}';
			""")
			self.conn.commit()
	
	def accept_order(self, price, share_number, available_shares, action, user_uid, company):
		if share_number > available_shares:
			return "Invalid 3"
		else:
			if action == "buy": #action is buy, user wants to sell
				share_number = share_number * -1
			
			self.cur.execute(f"""
				SELECT cashvalue from users WHERE uid='{user_uid}';
			""")
			cash_value = float(self.cur.fetchone()[0])
			self.cur.execute(f"""
				SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{company}';
			""")
			portfolio_data = self.cur.fetchone()
			if portfolio_data != None:
				shares_holding = float(portfolio_data[0])
			
			trade_value = abs(share_number) * price
			
			invalid = False
			if trade_value > cash_value and share_number > 0:
				invalid = True
				return "Invalid 2"  
			
			elif share_number == 0:
				pass
			elif share_number > 0:
				if portfolio_data != None:
					self.cur.execute(f"""
						INSERT INTO trade_history VALUES (
							'{user_uid}',
							'{company}',
							{round(float(time.time()), 2)},
							{round(share_number,2)},
							{round(trade_value,2)}
						);
						UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
						WHERE uid='{user_uid}';
						UPDATE portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
						WHERE uid='{user_uid}' and company_id='{company}';
						UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(share_number,2)})
						WHERE uid='{user_uid}' and company_id='{company}';
						UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
						WHERE uid='{user_uid}' and company_id='{company}';
					""")
					self.conn.commit()
				else:
					self.cur.execute(f"""
						INSERT INTO trade_history VALUES (
							'{user_uid}',
							'{company}',
							{round(float(time.time()), 2)},
							{round(share_number,2)},
							{round(trade_value,2)}
						);
						UPDATE users SET cashvalue = (cashvalue-{round(trade_value, 2)})
						WHERE uid='{user_uid}';
						INSERT INTO portfolio VALUES (
							'{user_uid}',
							'{company}',
							{round(share_number,2)},
							{round(share_number,2)},
							{round(trade_value,2)}
						);
					""")
					self.conn.commit()
			else:
				if portfolio_data != None:
					if abs(share_number) > shares_holding:
						invalid = True
						return "Invalid 1"
					else:
						self.cur.execute(f"""
							INSERT INTO trade_history VALUES (
								'{user_uid}',
								'{company}',
								{round(float(time.time()), 2)},
								{round(share_number,2)},
								{round(trade_value,2)}
							);
							UPDATE users SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
							WHERE uid='{user_uid}';
							UPDATE portfolio SET shares_holding = (shares_holding-{abs(round(share_number,2))})
							WHERE uid='{user_uid}' and company_id='{company}';
							UPDATE portfolio SET pending_shares_holding = (pending_shares_holding-{abs(round(share_number,2))})
							WHERE uid='{user_uid}' and company_id='{company}';
							UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
							WHERE uid='{user_uid}' and company_id='{company}';
							
						""")
						self.conn.commit()
				else:
					invalid = True
					return "Invalid 1"

			if invalid == False:
				shares = 0
				self.cur.execute(f"""
					SELECT order_id, shares, bot_id FROM bot_orders WHERE price='{price}' AND action='{action}' AND accepted={False};
				""")
				result_orders = list(self.cur.fetchall())
				for i in range(len(result_orders)):
					order_id = result_orders[i][0]
					order_share = result_orders[i][1]
					bot_id = result_orders[i][2]
					if shares + order_share <= share_number:					
						self.cur.execute(f"""
							UPDATE bot_orders SET accepted={True} WHERE order_id='{order_id}';
						""")
						self.conn.commit()  
						trade_value = float(abs(order_share)) * float(price)
						self.cur.execute(f"""
							SELECT shares_holding from bot_portfolio WHERE bot_id='{bot_id}' and company_id='{company}';
						""")
						portfolio_data = self.cur.fetchone()
						if action == 'buy':
							if portfolio_data != None:
								self.cur.execute(f"""
									INSERT INTO bot_trade_history VALUES (
										'{bot_id}',
										'{company}',
										{round(float(time.time()), 2)},
										{round(order_share,2)},
										{round(trade_value,2)}
									);
									UPDATE bot_portfolio SET shares_holding = (shares_holding+{abs(round(order_share,2))})
									WHERE bot_id='{bot_id}' and company_id='{company}';
									UPDATE bot_portfolio SET cost = (cost+{round(trade_value,2)})
									WHERE bot_id='{bot_id}' and company_id='{company}';
								""")
								self.conn.commit()
							else:
								self.cur.execute(f"""
									INSERT INTO bot_trade_history VALUES (
										'{bot_id}',
										'{company}',
										{round(float(time.time()), 2)},
										{abs(round(order_share,2))},
										{round(trade_value,2)}
									);
									INSERT INTO bot_portfolio VALUES (
										'{bot_id}',
										'{company}',
										{abs(round(order_share,2))},
										{round(trade_value,2)}
									);
								""")
								self.conn.commit()
						elif action == "sell":
							self.cur.execute(f"""
								INSERT INTO bot_trade_history VALUES (
									'{bot_id}',
									'{company}',
									{round(float(time.time()), 2)},
									{-abs(round(order_share,2))},
									{-round(trade_value,2)}
								);
								UPDATE bot_portfolio SET shares_holding = (shares_holding-{abs(round(order_share,2))})
								WHERE bot_id='{bot_id}' and company_id='{company}';
								UPDATE bot_portfolio SET cost = (cost-{round(trade_value,2)})
								WHERE bot_id='{bot_id}' and company_id='{company}';
							""")
							self.conn.commit()
						shares += order_share
					else:
						trade_share = share_number - shares
						self.cur.execute(f"""
							UPDATE bot_orders SET shares={float(order_share)-float(trade_share)} WHERE order_id='{order_id}';
						""")
						self.conn.commit()  
						trade_value = abs(trade_share) * price
						self.cur.execute(f"""
							SELECT shares_holding from bot_portfolio WHERE bot_id='{bot_id}' and company_id='{company}';
						""")
						portfolio_data = self.cur.fetchone()
						if action == 'buy':
							if portfolio_data != None:
								self.cur.execute(f"""
									INSERT INTO bot_trade_history VALUES (
										'{bot_id}',
										'{company}',
										{round(float(time.time()), 2)},
										{round(trade_share,2)},
										{round(trade_value,2)}
									);
									UPDATE bot_portfolio SET shares_holding = (shares_holding+{abs(round(trade_share,2))})
									WHERE bot_id='{bot_id}' and company_id='{company}';
									UPDATE bot_portfolio SET cost = (cost+{round(trade_value,2)})
									WHERE bot_id='{bot_id}' and company_id='{company}';
								""")
								self.conn.commit()
							else:
								self.cur.execute(f"""
									INSERT INTO bot_trade_history VALUES (
										'{bot_id}',
										'{company}',
										{round(float(time.time()), 2)},
										{abs(round(trade_share,2))},
										{round(trade_value,2)}
									);
									INSERT INTO bot_portfolio VALUES (
										'{bot_id}',
										'{company}',
										{abs(round(trade_share,2))},
										{round(trade_value,2)}
									);
								""")
								self.conn.commit()
						elif action == "sell":
							self.cur.execute(f"""
								INSERT INTO bot_trade_history VALUES (
									'{bot_id}',
									'{company}',
									{round(float(time.time()), 2)},
									{-abs(round(trade_share,2))},
									{-round(trade_value,2)}
								);
								UPDATE bot_portfolio SET shares_holding = (shares_holding-{abs(round(trade_share,2))})
								WHERE bot_id='{bot_id}' and company_id='{company}';
								UPDATE bot_portfolio SET cost = (cost-{round(trade_value,2)})
								WHERE bot_id='{bot_id}' and company_id='{company}';
							""")
							self.conn.commit()

	def get_order_book(self, comp_name):
		self.cur.execute(f"""
			SELECT sum (shares) AS total_shares from bot_orders WHERE action='buy' and accepted='{False}';
		""")
		shares = self.cur.fetchone()[0]
		if shares != None:
			total_buy_shares = float(shares)
		else:
			total_buy_shares = 0
		self.cur.execute(f"""
			SELECT sum (shares) AS total_shares from bot_orders WHERE action='sell' and accepted='{False}';
		""")
		shares = self.cur.fetchone()[0]
		if shares != None:
			total_sell_shares = float(shares)
		else:
			total_sell_shares = 0
		
		#order book format [price, shares, percentage_shares]
		cur.execute(f"""
			SELECT price, shares, RANK() OVER (ORDER BY price DESC) as rank FROM bot_orders WHERE 
			accepted={False} AND company_name='{comp_name}' AND action='buy';
		""")
		buy_orders = list(cur.fetchall())
		buy_order_book = []
		if buy_orders != []:
			price = buy_orders[0][0]
			shares = buy_orders[0][1]
			for index in range(1, len(buy_orders)):
				pct_shares = round(float(shares)/float(total_buy_shares) * 100, 2)
				if buy_orders[index][0] == price:
					shares += buy_orders[index][1]
				else:
					buy_order_book.append([float(price), float(shares), pct_shares])
					price = buy_orders[index][0]
					shares = buy_orders[index][1]
					
				if index + 1 == len(buy_orders):
					buy_order_book.append([float(price), float(shares), pct_shares])
			if len(buy_orders) == 1:
				pct_shares = round(float(shares)/float(total_buy_shares) * 100, 2)
				buy_order_book.append([float(price), float(shares), pct_shares])
		
		cur.execute(f"""
			SELECT price, shares, RANK() OVER (ORDER BY price DESC) as rank FROM bot_orders WHERE 
			accepted={False} AND company_name='{comp_name}' AND action='sell';
		""")
		sell_orders = list(cur.fetchall())
		sell_order_book = []
		if sell_orders != []:
			price = sell_orders[0][0]
			shares = sell_orders[0][1]
			for index in range(1, len(sell_orders)):
				pct_shares = round(float(shares)/float(total_sell_shares) * 100, 2)
				if sell_orders[index][0] == price:
					shares += sell_orders[index][1]
				else:
					sell_order_book.append([float(price), float(shares), pct_shares])
					price = sell_orders[index][0]
					shares = sell_orders[index][1]

				if index + 1 == len(sell_orders):
					sell_order_book.append([float(price), float(shares), pct_shares])
			if len(sell_orders) == 1:
				pct_shares = round(float(shares)/float(total_sell_shares) * 100, 2)
				sell_order_book.append([float(price), float(shares), pct_shares])
		
		if len(buy_order_book) < 5:
			for _ in range(5-len(buy_order_book)):
				buy_order_book.append([0, 0, 0])
		if len(sell_order_book) < 5:
			for _ in range(5-len(sell_order_book)):
				sell_order_book.append([0, 0, 0])
		
		order_book = [sell_order_book[-5:], buy_order_book[:5]]
		return order_book

	def trade_stock(
		self,
		user_uid: str,
		share_number: float,
		target_price: float,
		comp_name: str,
		share_range1=50,
		share_range2=120
	):
		available_shares = random.randint(share_range1, share_range2)

		if abs(share_number) > available_shares:
			return "Invalid 3"
		else:
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
						UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(share_number,2)})
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
							UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(share_number,2)})
							WHERE uid='{user_uid}' and company_id='{comp_name}';
							UPDATE portfolio SET cost = (cost+{round(target_price*share_number,2)})
							WHERE uid='{user_uid}' and company_id='{comp_name}';
							
						""")
						self.conn.commit()
				else:
					return "Invalid 1"

	def get_user_pending_orders(self, user_uid):
		self.cur.execute(f"""
			SELECT order_id, company_name, price, shares, action FROM orders WHERE accepted={False} and user_uid='{user_uid}';
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

	def initialize_bot(self, bot_name, initial_price):
		self.cur.execute(f"""
			INSERT INTO bots
			VALUES (
				'{bot_name}', '{bot_name}', {self.bot_initial_asset}
			);
		""")
		self.conn.commit()
		company_lst = ["ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"]
		for company in company_lst:
			self.cur.execute(f"""
				INSERT INTO bot_portfolio
				VALUES (
					'{bot_name}', '{company}', {50}, {initial_price[company] * 50}
				);
		""")
	
	def create_bot_portfolio_table(self):
		self.cur.execute(f'DROP TABLE IF EXISTS bot_portfolio;')
		self.cur.execute(f"""
			CREATE TABLE bot_portfolio (bot_id varchar (100),
			company_id varchar (100) NOT NULL,
			shares_holding NUMERIC NOT NULL,
			cost NUMERIC NOT NULL);
		""")
		self.conn.commit()
	
	def create_bot_trade_history_table(self ):
		self.cur.execute(f'DROP TABLE IF EXISTS bot_trade_history;')
		self.cur.execute(f"""
			CREATE TABLE bot_trade_history (
				bot_id varchar (100),
				company_id varchar (100),
				timestamp NUMERIC NOT NULL,
				shares NUMERIC NOT NULL,
				value NUMERIC NOT NULL
			);
		""")
		self.conn.commit()
	
	def get_total_rank(self):
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
	
	def bot_actions(
			self,
			action: dict,
			current_price: float
		):
		for company in action["trader"]:
			for bot in action["trader"][company]:
				self.cur.execute(f"""
					SELECT cashvalue from bots WHERE bot_id='{bot}';
				""")
				cash_value = float(self.cur.fetchone()[0])
				self.cur.execute(f"""
					SELECT shares_holding from bot_portfolio WHERE bot_id='{bot}' and company_id='{company}';
				""")
				portfolio_data = self.cur.fetchone()
				if portfolio_data != None:
					shares_holding = float(portfolio_data[0])
				
				share_number = float(action["trader"][company][bot]["share_number"])
				target_price = float(action["trader"][company][bot]["target_price"])
				if target_price == 0:
					target_price = float(current_price[company])

				trade_value = abs(share_number) * target_price

				if trade_value > cash_value and share_number > 0:
					return "Invalid 2"

				elif share_number == 0:
					pass

				elif share_number > 0:
					if portfolio_data != None:
						self.cur.execute(f"""
							INSERT INTO bot_trade_history VALUES (
								'{bot}',
								'{company}',
								{round(float(time.time()), 2)},
								{round(share_number,2)},
								{round(target_price*share_number,2)}
							);
							UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
							WHERE bot_id='{bot}';
							UPDATE bot_portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
							WHERE bot_id='{bot}' and company_id='{company}';
							UPDATE bot_portfolio SET cost = (cost+{round(target_price*share_number,2)})
							WHERE bot_id='{bot}' and company_id='{company}';
						""")
						self.conn.commit()
					else:
						self.cur.execute(f"""
							INSERT INTO bot_trade_history VALUES (
								'{bot}',
								'{company}',
								{round(float(time.time()), 2)},
								{round(share_number,2)},
								{round(target_price*share_number,2)}
							);
							UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
							WHERE bot_id='{bot}';
							INSERT INTO bot_portfolio VALUES (
								'{bot}',
								'{company}',
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
								INSERT INTO bot_trade_history VALUES (
									'{bot}',
									'{company}',
									{round(float(time.time()), 2)},
									{round(share_number,2)},
									{round(target_price*share_number,2)}
								);
								UPDATE bots SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
								WHERE bot_id='{bot}';
								UPDATE bot_portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
								WHERE bot_id='{bot}' and company_id='{company}';
								UPDATE bot_portfolio SET cost = (cost+{round(target_price*share_number,2)})
								WHERE bot_id='{bot}' and company_id='{company}';
								
							""")
							self.conn.commit()
					else:
						return "Invalid 1"

		for company in action["accepter"]:
			for bot in action["accepter"][company]:
				if float(action["accepter"][company][bot]["share_number"]) < 0: ##bot is sell -> accept buy orders
						bot_action = "buy"
				elif float(action["accepter"][company][bot]["share_number"]) > 0:
					bot_action = "sell"
				else:
					bot_action = None
				price = float(action["accepter"][company][bot]["target_price"])
				self.cur.execute(f"""
						SELECT order_id from orders WHERE price={price} AND action='{bot_action}' AND company_name='{company}' and accepted='{False}';
					""")
				ids = self.cur.fetchall()

				if ids != [] and bot_action != None:
					self.cur.execute(f"""
						SELECT order_id, user_uid FROM orders WHERE price={price} AND action='{bot_action}' AND company_name='{company}' and accepted='{False}';
					""")
					ids = list(self.cur.fetchall()) #(order_id, user_id)
					share_number = 0
					for index in range(len(ids)):
						order_id = ids[index][0]
						self.cur.execute(f"""
							SELECT shares FROM orders WHERE order_id='{order_id}' AND action='{bot_action}' AND price={price} AND company_name='{company}';
						""")
						shares=float(self.cur.fetchone()[0])
						if bot_action == "buy": #positive
							share_number+=shares
						elif bot_action == "sell": #negative
							share_number-=shares

					self.cur.execute(f"""
						SELECT cashvalue from bots WHERE bot_id='{bot}';
					""")
					cash_value = float(self.cur.fetchone()[0])
					self.cur.execute(f"""
						SELECT shares_holding from bot_portfolio WHERE bot_id='{bot}' and company_id='{company}';
					""")
					portfolio_data = self.cur.fetchone()
					if portfolio_data != None:
						shares_holding = float(portfolio_data[0])

					trade_value = abs(share_number) * price

					invalid = False
					if trade_value > cash_value and share_number > 0:
						invalid = True
						return "Invalid 2"  
					
					elif share_number == 0:
						pass
					elif share_number > 0:
						if portfolio_data != None:
							self.cur.execute(f"""
								INSERT INTO bot_trade_history VALUES (
									'{bot}',
									'{company}',
									{round(float(time.time()), 2)},
									{round(share_number,2)},
									{round(trade_value,2)}
								);
								UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
								WHERE bot_id='{bot}';
								UPDATE bot_portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
								WHERE bot_id='{bot}' and company_id='{company}';
								UPDATE bot_portfolio SET cost = (cost+{round(trade_value,2)})
								WHERE bot_id='{bot}' and company_id='{company}';
							""")
							self.conn.commit()
						else:
							self.cur.execute(f"""
								INSERT INTO bot_trade_history VALUES (
									'{bot}',
									'{company}',
									{round(float(time.time()), 2)},
									{round(share_number,2)},
									{round(trade_value,2)}
								);
								UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
								WHERE bot_id='{bot}';
								INSERT INTO bot_portfolio VALUES (
									'{bot}',
									'{company}',
									{round(share_number,2)},
									{round(trade_value,2)}
								);
							""")
							self.conn.commit()
					else:
						if portfolio_data != None:
							if abs(share_number) > shares_holding:
								invalid = True
								return "Invalid 1"
							else:
								self.cur.execute(f"""
									INSERT INTO bot_trade_history VALUES (
										'{bot}',
										'{company}',
										{round(float(time.time()), 2)},
										{round(share_number,2)},
										{round(trade_value,2)}
									);
									UPDATE bots SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
									WHERE bot_id='{bot}';
									UPDATE bot_portfolio SET shares_holding = (shares_holding+{round(share_number,2)})
									WHERE bot_id='{bot}' and company_id='{company}';
									UPDATE bot_portfolio SET cost = (cost+{round(trade_value,2)})
									WHERE bot_id='{user_uid}' and company_id='{company}';
									
								""")
								self.conn.commit()
						else:
							invalid = True
							return "Invalid 1"

					if invalid == False:
						for index in range(len(ids)):
							order_id = ids[index][0]
							user_uid = ids[index][1]
							self.cur.execute(f"""
								UPDATE orders SET accepted={True} WHERE order_id='{order_id}';
							""")
							self.conn.commit()  
							self.cur.execute(f"""
								SELECT shares FROM orders WHERE order_id='{order_id}';
							""")
							shares = float(self.cur.fetchone()[0])
							trade_value = shares * price
							self.cur.execute(f"""
								SELECT shares_holding from portfolio WHERE uid='{user_uid}' and company_id='{company}';
							""")
							portfolio_data = self.cur.fetchone()
							if bot_action == 'buy':
								if portfolio_data != None:
									self.cur.execute(f"""
										INSERT INTO trade_history VALUES (
											'{user_uid}',
											'{company}',
											{round(float(time.time()), 2)},
											{round(shares,2)},
											{round(trade_value,2)}
										);
										UPDATE portfolio SET shares_holding = (shares_holding+{round(shares,2)})
										WHERE uid='{user_uid}' and company_id='{company}';
										UPDATE portfolio SET pending_shares_holding = (pending_shares_holding+{round(shares,2)})
										WHERE uid='{user_uid}' and company_id='{company}';
										UPDATE portfolio SET cost = (cost+{round(trade_value,2)})
										WHERE uid='{user_uid}' and company_id='{company}';
									""")
									self.conn.commit()
								else:
									self.cur.execute(f"""
										INSERT INTO trade_history VALUES (
											'{user_uid}',
											'{company}',
											{round(float(time.time()), 2)},
											{round(shares,2)},
											{round(trade_value,2)}
										);
										INSERT INTO portfolio VALUES (
											'{user_uid}',
											'{company}',
											{round(shares,2)},
											{round(shares,2)},
											{round(trade_value,2)}
										);
									""")
									self.conn.commit()
							elif bot_action == "sell":
								self.cur.execute(f"""
									INSERT INTO trade_history VALUES (
										'{user_uid}',
										'{company}',
										{round(float(time.time()), 2)},
										{-round(shares,2)},
										{-round(trade_value,2)}
									);
									UPDATE portfolio SET shares_holding = (shares_holding-{round(shares,2)})
									WHERE uid='{user_uid}' and company_id='{company}';
									UPDATE portfolio SET pending_shares_holding = (pending_shares_holding-{round(shares,2)})
									WHERE uid='{user_uid}' and company_id='{company}';
									UPDATE portfolio SET pending_shares_holding = (pending_shares_holding-{round(shares,2)})
									WHERE uid='{user_uid}' and company_id='{company}';
									UPDATE portfolio SET cost = (cost-{round(trade_value,2)})
									WHERE uid='{user_uid}' and company_id='{company}';
								""")
								self.conn.commit()
				else:
					pass

		for company in action["bidder"]:
			for bot in action["bidder"][company]:
				if float(action["bidder"][company][bot]["share_number"]) > 0:
					bot_action = "buy"
				elif float(action["bidder"][company][bot]["share_number"]) < 0:
					bot_action = "sell"
				else:
					bot_action = None
				
				if bot_action != None:
					order_id = str(uuid.uuid4())

					self.cur.execute(f"""
						SELECT cashvalue from bots WHERE bot_id='{bot}';
					""")
					cash_value = float(self.cur.fetchone()[0])

					self.cur.execute(f"""
						SELECT shares_holding from bot_portfolio WHERE bot_id='{bot}' and company_id='{company}';
					""")
					portfolio_data = self.cur.fetchone()
					if portfolio_data != None:
						shares_holding = float(portfolio_data[0])
					
					share_number = float(action["bidder"][company][bot]["share_number"])
					target_price = float(action["bidder"][company][bot]["target_price"])

					trade_value = abs(share_number) * target_price

					if trade_value > cash_value and share_number > 0:
						return "Invalid 2"

					elif share_number > 0:
						self.cur.execute(f"""
							INSERT INTO bot_orders VALUES(
								'{order_id}',
								'{bot}',
								'{company}',
								{round(target_price, 2)},
								{abs(round(share_number, 2))},
								{round(float(time.time()), 2)},
								'{bot_action}',
								{False}
							);
						""")
						self.conn.commit()
						if portfolio_data != None:
							self.cur.execute(f"""
								UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
								WHERE bot_id='{bot}';
							""")
							self.conn.commit()
						else:
							self.cur.execute(f"""
								UPDATE bots SET cashvalue = (cashvalue-{round(trade_value, 2)})
								WHERE bot_id='{bot}';
							""")
							self.conn.commit()

					else:
						if portfolio_data != None:
							if abs(share_number) > shares_holding:
								return "Invalid 1"
							else:
								self.cur.execute(f"""
									INSERT INTO bot_orders VALUES(
										'{order_id}',
										'{bot}',
										'{company}',
										{round(target_price, 2)},
										{abs(round(share_number, 2))},
										{round(float(time.time()), 2)},
										'{bot_action}',
										{False}
									);
								""")
								self.conn.commit()	
								self.cur.execute(f"""
									UPDATE bots SET cashvalue = (cashvalue+{abs(round(trade_value, 2))})
									WHERE bot_id='{bot}';						
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