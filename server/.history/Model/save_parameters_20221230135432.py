import numpy as np
from pandas_datareader import data as pdr
import yfinance as yf
yf.pdr_override()

start_date = "1968/1/1"
end_date = "1970/1/1"
symbol = ['^GSPC']
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('normal1.csv')

start_date = "2021/4/9 "
end_date = "2021/10/25"
symbol = ['^GSPC']
index_data = pdr.get_data_yahoo(symbol, start_date, end_date)['Adj Close']
index_data.to_csv('normal2.csv')

# #Roaring Twenties
# start_date = "1927/1/1"
# end_date = "1929/5/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_roaring20 = index_data['Adj Close']
# index_price_df_roaring20.to_csv('roaring_twenties.csv')

#1930 Great Depression
# start_date = "1930/1/1"
# end_date = "1932/9/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_great_depression = index_data['Adj Close']
# index_price_df_great_depression.to_csv('1930_great_depression.csv')

# #1987 Auto-Trade
# start_date = "1987/11/1"
# end_date = "1990/1/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_auto_trade = index_data['Adj Close']
# index_price_df_auto_trade.to_csv('1987_auto_trade.csv')

# #1990 Tech Blossom
# start_date = "1995/5/1"
# end_date = "1997/5/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_tech_blossom = index_data['Adj Close']
# index_price_df_tech_blossom.to_csv('1990_tech_blossom.csv')

# #2000 Dot-Com Bubble
# start_date = "2000/5/1"
# end_date = "2002/5/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_tech_bubble = index_data['Adj Close']
# index_price_df_tech_bubble.to_csv('2000_dot_com_bubble.csv')

# #2008 CDO Crisis
# start_date = "2008/6/1"
# end_date = "2009/6/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_cdo = index_data['Adj Close']
# index_price_df_cdo.to_csv('2008_CDO_crisis.csv')

# #2019 Passive Trading
# start_date = "2019/4/1"
# end_date = "2020/1/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_passive_trading = index_data['Adj Close']
# index_price_df_passive_trading.to_csv('2019_passive_trading.csv')

# #2020 Covid Situation
# start_date = "2020/1/1"
# end_date = "2020/10/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('2020_COVID_situation.csv')

# #Normal
# start_date = "1968/1/1"
# end_date = "1970/1/1"
# symbol = ['^GSPC']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/index_data/normal_situation.csv')

#------------------------------------------------------------------------------------------------------------
#Surgo New Competition
# start_date = "2020/11/15"
# end_date = "2021/6/15"
# symbol = ['MRNA']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('server/Model/historical_price/SGO/new_competition.csv')

# #Share Purchase
# start_date = "2008/9/1"
# end_date = "2009/1/1"
# symbol = ['VWAGY']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('SGO_share_purchase.csv')

# #New Medicine Invention
# start_date = "2020/4/1"
# end_date = "2021/10/1"
# symbol = ['JNJ']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('SGO_new_medicine_invention.csv')
#------------------------------------------------------------------------------------------------------------
# #Wraken IPO
# start_date = "2012/5/18"
# end_date = "2013/7/1"
# symbol = ['FB']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('WRKN_IPO.csv')

# #Industry Boost
# start_date = "2019/1/1"
# end_date = "2020/1/1"
# symbol = ['AAPL']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('WRKN_industry_boost.csv')

# #Anti-Monopoly Fine
# start_date = "2021/2/1"
# end_date = "2022/1/1"
# symbol = ['BABA']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('WRKN_antimonopoly_fine.csv')

# #New Management Team
# start_date = "1993/6/1"
# end_date = "1994/10/1"
# symbol = ['IBM']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('WRKN_new_management_team.csv')

# #New Game Invention
# start_date = "2016/3/1"
# end_date = "2018/1/1"
# symbol = ['NTDOY']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price = index_data['Adj Close']
# index_price.to_csv('WRKN_inventing_new_game.csv')

# ##FSIN Advertisement
# start_date = "1986/11/1"
# end_date = "1987/4/1"
# symbol = ['NKE']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/FSIN/advertisement.csv')

# ##DSC M&A
# start_date = "2018/1/1"
# end_date = "2019/3/1"
# symbol = ['VOD']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/DSC/acquisition.csv')

# ##JKY Mortage Survival
# start_date = "2008/4/1"
# end_date = "2009/6/1"
# symbol = ['JPM']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/JKY/mortage_survival.csv')

# ##AST Boost
# start_date = "2020/7/1"
# end_date = "2021/3/1"
# symbol = ['BYDDY']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/AST/national_positive_policy.csv')

# ##HHW covid
# start_date = "2020/2/1"
# end_date = "2020/10/1"
# symbol = ['M']
# index_data = web.get_data_yahoo(symbol, start_date, end_date)
# index_price_df_covid = index_data['Adj Close']
# index_price_df_covid.to_csv('server/Model/historical_price/HHW/pandemic_lockdown.csv')
