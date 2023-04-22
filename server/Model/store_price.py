from prepare_prices import index_price, ast_price, dsc_price

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

cur.execute(f"""
    INSERT INTO prices VALUES (
        'index',
        ARRAY {index_price}
    );
""")
conn.commit()