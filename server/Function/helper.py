import time
class helper:
    def get_current_prices(company_list, start_time, flat_list):
        current_time = time.time()
        index_tmp = int(current_time-start_time)
        current_prices = {}
        for company in company_list:
          current_prices[company] = round(float(flat_list[company][index_tmp]), 2)
        return current_prices