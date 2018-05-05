import matplotlib.pyplot as plt
from random_walk import RandomWalk

# 只要程序处于活动状态，就不断地模拟随机漫步
while True:
    # 创建一个RandomWalk实例，并将其包含的点都绘制出来
    rw = RandomWalk()
    rw.fill_walk()
    # 设置绘图窗口的尺寸
    plt.figure(figsize=(10, 6))

    # plt.scatter(rw.x_values, rw.y_values, s=15)
    # 使用颜色映射来指出漫步中各点的先后顺序，并删除每个点的黑色轮廓，让它们的颜色更明显。
    # 为根据漫步中各点的先后顺序进行着色，我们传递参数c ，并将其设置为一个列表，其中包含各点的先后顺序
    # 传递实参edgecolor=none 以删除每个点周围的轮廓
    point_numbers = list(range(rw.num_points))
    plt.scatter(rw.x_values, rw.y_values, c=point_numbers, cmap=plt.cm.Blues,
                edgecolor='none', s=15)

    # 突出起点和终点 并使其比其他点大（s=100 ）
    plt.scatter(0, 0, c='green', edgecolors='none', s=100)
    plt.scatter(rw.x_values[-1], rw.y_values[-1], c='red', edgecolors='none',s=100)

    # 隐藏坐标轴
    plt.axes().get_xaxis().set_visible(False)
    plt.axes().get_yaxis().set_visible(False)

    plt.show()
    keep_running = input("Make another walk? (y/n): ")
    if keep_running == 'n':
        break
