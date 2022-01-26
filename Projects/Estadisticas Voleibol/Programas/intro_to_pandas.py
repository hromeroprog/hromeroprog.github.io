# -*- coding: utf-8 -*-
"""
Created on Mon Nov  2 14:15:18 2020

@author: 2rome
"""

result = 1
personas = 12

a = 365-personas+1
for i in range(a, 365, 1):
    print(i)
    result = result*(a/365)

print (1- result)