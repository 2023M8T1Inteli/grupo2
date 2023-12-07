import math
import time
import pygame
pygame.init()
pygame.mixer.init()
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('geracao_codigo1')


img = {1: pygame.image.load('src/pygame/1.jpg'), 2: pygame.image.load('src/pygame/2.jpg') }
audio = {1: pygame.mixer.Sound('src/pygame/1.mp3')}


def play_audio(audio):
    audio.play()
    time.sleep(5)
    audio.stop()


def show_image(image):
    screen.fill((0, 0, 0))
    screen.blit(image, (300, 200))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
        a = 1
        b = 1
        show_image(img[b])
    pygame.display.update()
pygame.quit()