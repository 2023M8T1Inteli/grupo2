import math
import time
import pygame
pygame.init()
pygame.mixer.init()
width, height = 800, 600
ticks = 0
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('geracao_codigo1')


img = {1: pygame.image.load('1.jpg'), 2: pygame.image.load('2.jpg')}
audio = {1: pygame.mixer.Sound('1.mp3'), 2: pygame.mixer.Sound('2.mp3')}


def play_audio(audio):
    audio.play()


def show_image(image):
    screen.fill((0, 0, 0))
    screen.blit(image, (300, 200))


def ler():
    return int(input())


def ler_varios(quad, qtd, tol):
    count = 0
    while count < qtd:
        click = ler()
        if click == quad:
            count += 1
    if tol > 0:
        tol -= 1
    return True


def mostrar(cod):
    image = pygame.image.load(f'src/pygame/{cod}.jpg')
    show_image(image)


def tocar(cod):
    audio = pygame.mixer.Sound(f'src/pygame/{cod}.mp3')
    play_audio(audio)


def mostrar_tocar(cod_img, cod_aud):
    mostrar(cod_img)
    tocar(cod_aud)


def esperar(t):
    time.sleep(t / 1000)


running = True
a = 1
b = 2

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_1:
                show_image(img[b])
                tocar(audio[b])

            if event.key == pygame.K_2:
                show_image(img[a])
                tocar(audio[a])

    pygame.display.update()

pygame.quit()