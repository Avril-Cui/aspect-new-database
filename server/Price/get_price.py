from Price.alg_price import  DayPriceGenerator, WaveModifier, StockSimulator

def get_stock_price(
        file_names, params,
        intensity, length, weights,
        mid_prices, mid_starts,
        event_intensity,
        target_price, sigma):
    price_list = []
    for i in range(len(file_names)):
        name = file_names[i]
        macro = params[name]["macro"]
        stock_simulator = DayPriceGenerator(macro)
        base_price = stock_simulator.price_loop()

        wave_1 = {
            'price_list': base_price,
            'start_point': 0,
            'duration': length[i],
            'weight': weights[i],
            'intensity_factor': intensity
        }

        wave_2 = {
            'price_list': mid_prices[i],
            'start_point': mid_starts[i],
            'duration': length[i],
            'weight': 1-weights[i],
            'intensity_factor': intensity
        }

        Combinator = WaveModifier()
        combinated_price = Combinator.price_wave_addition(
            0, event_intensity[i], length[i], wave_1, wave_2)
        if len(price_list) == 0:
            adjust_factor = target_price
        else:
            adjust_factor = price_list[-1]

        price_generator = StockSimulator(
            adjust_factor, combinated_price, sigma[i])
        result_price = price_generator.generate_price()
        price_list.extend(result_price)

    return price_list