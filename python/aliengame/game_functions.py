import sys
import pygame
def check_events(ship):
    """响应按键和鼠标事件"""
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RIGHT:
                ship.rect.centerx += 1
            elif event.key == pygame.K_LEFT:
                ship.rect.centerx -= 1

def update_screen(bg_color, screen, ship):
    """更新屏幕上的图像，并切换到新屏幕"""
    # 每次循环时都重绘屏幕
    screen.fill(bg_color)
    ship.blitme()
    # 让最近绘制的屏幕可见
    pygame.display.flip()