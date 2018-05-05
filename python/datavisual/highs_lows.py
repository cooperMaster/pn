import csv
from matplotlib import pyplot as plt
from datetime import datetime

filename = 'sitka_weather_2014.csv'
with open(filename) as f:
    reader = csv.reader(f)
    header_row = next(reader)
    for index, column_header in enumerate(header_row):
        print(index, column_header)

    dates,highs,lows = [],[],[]
    for row in reader:
        try:
            current_date = datetime.strptime(row[0], "%Y-%m-%d")
            high = int(row[1])
            low = int(row[3])
        except ValueError:
            print(current_date, 'missing data')
        else:
            dates.append(current_date)
            highs.append(high)
            lows.append(low)
    print(highs)

# 根据数据绘制图形
fig = plt.figure(dpi=128, figsize=(10, 6))
plt.plot(dates,highs, c='red', alpha=0.5)
plt.plot(dates,lows, c='blue', alpha=0.5)
# alpha 指定颜色的透明度。Alpha 值为0表示完全透明，1（默认设置）表示完全不透明
'''
向fill_between() 传递了一个 x 值系列：列表dates ，还传递了两个 y 值系列：highs 和lows 。
实参facecolor 指定了填充区域的颜色，我们还将alpha设置成了较小的值0.1，
让填充区域将两个数据系列连接起来的同时不分散观察者的注意力。
'''
plt.fill_between(dates, highs, lows, facecolor='blue', alpha=0.1)
# 设置图形的格式
plt.title("Daily high and low temperatures-2014", fontsize=24)
plt.xlabel('', fontsize=16)
fig.autofmt_xdate()
plt.ylabel("Temperature (F)", fontsize=16)
plt.tick_params(axis='both', which='major', labelsize=16)
plt.show()