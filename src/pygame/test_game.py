import math
import time
import pygame
pygame.init()
pygame.mixer.init()
width, height = 800, 600
ticks = 0
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('geracao_codigo1')


img = {1: pygame.image.load('src/pygame/1.jpg'), 2: pygame.image.load('src/pygame/2.jpg') }
audio = {1: pygame.mixer.Sound('src/pygame/1.mp3'), 2: pygame.mixer.Sound('src/pygame/2.mp3')}


def play_audio(audio):
    audio.play()


def show_image(image):
    screen.fill((0, 0, 0))
    screen.blit(image, (300, 200))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
        a = 1
        b = 2
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_1:
                # a = 1
                show_image(img[b])
                play_audio(audio[b])

            if event.key == pygame.K_2:
                # b = 2
                show_image(img[a])
                play_audio(audio[a])
    pygame.display.update()
pygame.quit()