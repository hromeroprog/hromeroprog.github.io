# -*- coding: utf-8 -*-
"""
Created on Wed Aug 12 10:51:51 2020

@author: 2rome
"""

# import matplotlib.pyplot as plt
# import numpy as np

# data = np.random.random(size=(3, 3))

# d = [[[0,0,0],[255,255,255],[0,255,255]]]
# data = d
# plt.imshow(data, interpolation='nearest')
# # plt.xticks(np.arange(0.0, 2.5, 1), np.arange(0.5, 2, 0.5))
# # plt.yticks(np.arange(2, -0.5, -1), np.arange(0.5, 2, 0.5))


import numpy as np
from PIL import Image
import math
import time


def next_term(c_point, current_term):
    #  next_term = current_term**2 + c_point
    a =  c_point[0] + current_term[0]**2 - current_term[1]**2
    b = c_point[1] + (2*current_term[0]*current_term[1])
    return [a, b]

def module(point):
    return point[0]**2 + point[1]**2
    
def process_image(data):
    Image.MAX_IMAGE_PIXELS = None
    image = Image.fromarray(data)
    image.show()
    return image

def compute_complex_points_to_process(pixels_per_side, wide):
    curr_point = -wide/2
    result = []
    jump = wide/pixels_per_side
    precision = len(str(jump))
    while curr_point < wide/2:
        result.append(curr_point)
        curr_point += jump
        curr_point = float(f'%.{precision}f'%(curr_point))
    return result
        
    
def diverge(point, max_compute = 75, max_value = 80):
    cont = 1
    p = point
    
    while True:
        if cont >= max_compute:
            break
        if module(p) > 4:
            break

        p = next_term(point, p)
        cont += 1
    return cont
          
def red_green_mode(pixels, diverge_ratio, max_compute, row, col):
    if diverge_ratio < max_compute/3:
        pixels[row,col] = [255*diverge_ratio/(max_compute/3), 0, 0]
    elif diverge_ratio < 2*max_compute/3:
        pixels[row,col] = [255, 255*diverge_ratio/(2*max_compute/3), 0]
    else:
        pixels[row,col] = [255, 255, 255*diverge_ratio/max_compute]
        
def red_blue_mode(pixels, diverge_ratio, max_compute, row, col):
    if diverge_ratio < max_compute/3:
        pixels[row,col] = [255*diverge_ratio/(max_compute/3), 0, 0]
    elif diverge_ratio < 2*max_compute/3:
        pixels[row,col] = [255, 255*diverge_ratio/(2*max_compute/3), 0]
    else:
        pixels[row,col] = [255, 255, 255*diverge_ratio/max_compute]
        
def blue_mode(pixels, diverge_ratio, max_compute, row, col):
    if diverge_ratio < max_compute/3:
        pixels[row,col] = [0, 0, 255*diverge_ratio/(max_compute/3)]
    elif diverge_ratio < 2*max_compute/3:
        pixels[row,col] = [0, 255*diverge_ratio/(2*max_compute/3), 255]
    else:
        pixels[row,col] = [255*diverge_ratio/max_compute, 255, 255]

def green_red_mode(pixels, diverge_ratio, max_compute, row, col):
    if diverge_ratio < max_compute/3:
        pixels[row,col] = [0, 255*diverge_ratio/(max_compute/3), 0]
    elif diverge_ratio < 2*max_compute/3:
        pixels[row,col] = [255*diverge_ratio/(2*max_compute/3), 255, 0]
    else:
        pixels[row,col] = [255, 255, 255*diverge_ratio/max_compute]

def switch_mode(pixels, diverge_ratio, max_compute, row, col, mode):
        if mode == 'red_green':
            pixel_values = red_green_mode(pixels, diverge_ratio, max_compute, row, col)
        if mode == 'red_blue':
            pixel_values = red_blue_mode(pixels, diverge_ratio, max_compute, row, col)
        if mode == 'green_red':
            pixel_values = green_red_mode(pixels, diverge_ratio, max_compute, row, col)
            
    
    
        if diverge_ratio < max_compute/3:
            pixels[row,col] = [0, 255*diverge_ratio/(max_compute/3), 0]
        elif diverge_ratio < 2*max_compute/3:
            pixels[row,col] = [255*diverge_ratio/(2*max_compute/3), 255, 0]
        else:
            pixels[row,col] = [255, 255, 255*diverge_ratio/max_compute]
    


        


def compute_mandelbrot(pixels_per_side = 1000, x_wide = 4, y_wide = 4):
    pixels = np.zeros((pixels_per_side, pixels_per_side, 3), dtype=np.uint8)
    
    x_numbers = compute_complex_points_to_process(pixels_per_side, x_wide)
    y_numbers = compute_complex_points_to_process(pixels_per_side, y_wide)
    
    matrix = [[a,-b] for b in y_numbers for a in x_numbers]
    print("Starting computation")
    
    for cont, point in enumerate(matrix):
        if cont%(len(matrix)//50) == 0:
            print(f"{cont}/{len(matrix)}  points processed...  ({int(100*cont/len(matrix))}%)")
        row = cont//pixels_per_side
        col = cont%pixels_per_side
        
        max_compute = 250
        diverge_ratio = diverge(point, max_compute = max_compute)
        
       
        if diverge_ratio == max_compute:
            pixels[row,col] = [255,255,255]
        else:
            # red_mode(pixels, diverge_ratio, max_compute, row, col)
            blue_mode(pixels, diverge_ratio, max_compute, row, col)
            # green_mode(pixels, diverge_ratio, max_compute, row, col)
             
    return pixels
    

if __name__ == '__main__':
    start_time = time.time()
    data = compute_mandelbrot(pixels_per_side = 500)
    mandelbrot = process_image(data)
    end_time = time.time()
    
    print(f"Time = {(end_time- start_time)} s")
    