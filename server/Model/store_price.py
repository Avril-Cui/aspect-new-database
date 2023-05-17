from prepare_prices import index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price

price_list = [index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price]
names = ["index", "ast", "dsc", "fsin", "hhw", "jky", "sgo", "wrkn"]

import psycopg2
conn = psycopg2.connect(
    host="localhost",
    database="aspectdatabase",
    user="postgres",
    password="Xiaokeai0717"
)
cur = conn.cursor()

cur.execute(f'DROP TABLE IF EXISTS prices;')
cur.execute(f"""
    CREATE TABLE prices (
    company_id varchar (100) PRIMARY KEY,
    price_list NUMERIC [] NOT NULL
    );
""")
conn.commit()

for i in range(len(price_list)):
    cur.execute(f"""
        INSERT INTO prices VALUES (
            '{names[i]}',
            ARRAY {price_list[i]}
        );
    """)
    conn.commit()
    print("stored")