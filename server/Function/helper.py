import time
class helper:
    def get_current_prices(company_list, start_time, price_list):
        current_time = time.time()
        index_lst = int(int((current_time-start_time))/86400)
        index_tmp = int(current_time-start_time-index_lst*86400)
        if index_tmp <= 36000:
            current_prices = {}
            if company_list != []:
                for company in company_list:
                    current_prices[company] = float(price_list[company][index_lst][index_tmp])
            return current_prices
        elif index_tmp > 36000 and index_tmp <= 86400:
            current_prices = {}
            if company_list != []:
                for company in company_list:
                    current_prices[company] = float(price_list[company][index_lst][-1])
            return current_prices
