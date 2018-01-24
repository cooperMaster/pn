import pygame
from settings import Settings
from ship import Ship
import game_functions as gf
from pygame.sprite import Group
from game_stats import GameStats

def run_game():
    # 初始化游戏并创建一个屏幕对象
    pygame.init()
    ai_settings = Settings()
    screen = pygame.display.set_mode((ai_settings.screen_width, ai_settings.screen_height))

    # 创建一个用于存储游戏统计信息的实例
    stats = GameStats(ai_settings)

    # 创建一艘飞船
    ship = Ship(ai_settings,screen)
    # 创建一群外星人
    aliens = Group()
    gf.create_fleet(ai_settings,screen,ship,aliens)
    # 创建一个用于存储子弹的编组
    bullets = Group()
    pygame.display.set_caption("Alien Invasion")
    # 设置背景色
    bg_color = ai_settings.bg_color
    # 开始游戏的主循环
    while True:
        # 监视键盘和鼠标事件
        gf.check_events(ai_settings, screen, ship, bullets)
        ship.update()
        gf.update_bullets(aliens,bullets)
        gf.update_aliens(ai_settings,ship,aliens)
        if len(aliens) == 0:
            # 删除现有的子弹并新建一群外星人
            #bullets.empty()
            gf.create_fleet(ai_settings, screen, ship, aliens)


        # 每次循环时都重绘屏幕
        gf.update_screen(bg_color, screen, ship,aliens, bullets)
run_game()