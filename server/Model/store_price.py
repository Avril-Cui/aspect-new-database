
from get_parameters import index_params_index
import matplotlib.pyplot as plt
from modified_wave import DayPriceGenerator, StockSimulator

file_names_index = ['normal1', 'mete1_1', 'mete1_2', 'mete2', 'mete3', 'mete4', 'mete5']
event_name = "mete1_2"
macro = index_params_index[event_name]["macro"]
stock_simulator = DayPriceGenerator(macro)
price = stock_simulator.price_loop()
per_second_simulator = StockSimulator(1000, price, 5)
price_list = per_second_simulator.generate_price()

plt.figure()
plt.plot(price_list)
plt.figure()
plt.plot(price)
plt.show()

# import psycopg2

# conn = psycopg2.connect(
#     host="localhost",
#     database="aspectdatabase",
#     user="postgres",
#     password="Xiaokeai0717"
# )

# cur = conn.cursor()

# cur.execute(f'DROP TABLE IF EXISTS test_prices;')
# cur.execute(f"""
#     CREATE TABLE test_prices (
#     company_id varchar (100) PRIMARY KEY,
#     price_list NUMERIC [] NOT NULL
#     );
# """)
# conn.commit()

# cur.execute(f"""
#     INSERT INTO test_prices VALUES (
#         'index',
#         ARRAY {price_list}
#     );
# """)
# conn.commit()