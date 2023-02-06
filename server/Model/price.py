from Model.prepare_prices import index_price, ast_price, dsc_price, fsin_price, hhw_price, jky_price, sgo_price, wrkn_price
import psycopg2
import os
import numpy as np

DATABASE_HOST = os.getenv('DATABASE_HOST')
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
DATABASE_NAME = os.getenv("DATABASE_NAME")

conn = psycopg2.connect(
    host=DATABASE_HOST if DATABASE_HOST!=None else "localhost",
    database=DATABASE_NAME if DATABASE_NAME!=None else "aspectdatabase",
    user=DATABASE_USER if DATABASE_USER!=None else "postgres",
    password=DATABASE_PASSWORD if DATABASE_PASSWORD!=None else "Xiaokeai0717"
)

conn.autocommit = True

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
    INSERT INTO prices VALUES (
        'ast',
        ARRAY {ast_price}
    );
    INSERT INTO prices VALUES (
        'dsc',
        ARRAY {dsc_price}
    );
    INSERT INTO prices VALUES (
        'fsin',
        ARRAY {fsin_price}
    );
    INSERT INTO prices VALUES (
        'hhw',
        ARRAY {hhw_price}
    );
    INSERT INTO prices VALUES (
        'jky',
        ARRAY {jky_price}
    );
    INSERT INTO prices VALUES (
        'sgo',
        ARRAY {sgo_price}
    );
    INSERT INTO prices VALUES (
        'wrkn',
        ARRAY {wrkn_price}
    );
    
""")
conn.commit()

def get_price_from_database(company_name):
    cur.execute(f"""
            SELECT price_list FROM prices WHERE company_id='{company_name}';
        """)
    price_list = list(cur.fetchone()[0])
    price_list = [float(i) for i in price_list]
    return price_list