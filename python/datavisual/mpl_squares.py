import matplotlib.pyplot as plt

squares = [1, 4, 9, 16, 25]
#plt.plot(squares, linewidth=5)

'''
当你向plot() 提供一系列数字时，它假设第一个数据点对应的 x 坐标值为0，
但我们的第一个点对应的 x 值为1。为改变这种默认行为，我们可以给plot() 
同时提供输入值和输出值：
'''
input_values = [1, 2, 3, 4, 5]
plt.plot(input_values,squares, linewidth=5)
# 设置图表标题，并给坐标轴加上标签
plt.title("Square Numbers", fontsize=24)
plt.xlabel("Value", fontsize=14)
plt.ylabel("Square of Value", fontsize=14)
# 设置刻度标记的大小
plt.tick_params(axis='both', labelsize=14)
plt.show()