from Model.prepare_prices import wrkn_price
import time
from itertools import accumulate
import matplotlib.pyplot as plt
from functools import reduce
import operator

price_lst = wrkn_price

index = [price_lst[x - y: x] for x, y in zip(
	accumulate([36000 for _ in range(len(price_lst)//36000)]), [36000 for _ in range(len(price_lst)//36000)])]


tick = []
for inx in range(len(index[7])):
	if inx % 200 == 0:
		tick.append(index[7][inx])

plt.figure()
plt.plot(tick)
plt.ticklabel_format(useOffset=False)
plt.grid(True)
plt.show()