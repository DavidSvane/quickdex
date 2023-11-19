import os
from PIL import Image


path = 'C:/Users/david/OneDrive/Programming/Projects/QuickDex/img/anim/'


def listImageDimensions():
    for filename in os.listdir(path):
        im = Image.open(path + filename)
        width, height = im.size
        print('%s: {w: %s, h: %s},' % (filename[0:4], width, height))


listImageDimensions()
