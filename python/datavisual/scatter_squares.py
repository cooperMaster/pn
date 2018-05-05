import matplotlib.pyplot as plt
'''
　使用scatter() 绘制散点图并设置其样式
'''
x_values = list(range(1, 1001))
y_values = [x**2 for x in x_values]
# plt.scatter(x_values, y_values, c='red', edgecolor='none', s=40)
# 参数c 设置成了一个 y 值列表，并使用参数cmap 告诉pyplot 使用哪个颜色映射
plt.scatter(x_values, y_values, c=y_values, cmap=plt.cm.Blues,edgecolor='none', s=40)
# 设置图表标题并给坐标轴加上标签
plt.title("Square Numbers", fontsize=24)
plt.xlabel("Value", fontsize=14)
plt.ylabel("Square of Value", fontsize=14)
# 设置刻度标记的大小
plt.tick_params(axis='both', which='major', labelsize=14)
# 设置每个坐标轴的取值范围
# 函数axis() 要求提供四个值：x 和 y 坐标轴的最小值和最大值
plt.axis([0, 1100, 0, 1100000])
plt.show()