import math
import time
import pygame
pygame.init()
pygame.mixer.init()
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('geracao_codigo2')


img = {1: pygame.image.load('src/pygame/1.jpg'), 2: pygame.image.load('src/pygame/2.jpg') }
audio = {1: pygame.mixer.Sound('src/pygame/1.mp3')}


def play_audio(audio):
    audio.play()


def show_image(image):
    screen.fill((0, 0, 0))
    screen.blit(image, (300, 200))

    pygame.display.flip()
a = 0
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            a = event.key
            running = False
quad_cont0 = 0
tol_cont0 = 0
b = False
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == a:
                quad_cont0 += 1
            else:
                tol_cont0 += 1
            if quad_cont0 == 3:
                b = True
                running = False
            elif tol_cont0 == 5:
                running = False
            if b:
                show_image(img[2])
                time.sleep(1)
pygame.quit()