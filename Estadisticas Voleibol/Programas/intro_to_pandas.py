# -*- coding: utf-8 -*-
"""
Created on Mon Nov  2 14:15:18 2020

@author: 2rome
"""
import pandas as pd
import numpy as np


x = [1,2,54,2,3]
y = ["cat", "dog", "bird", "aaa", "you"]
z = ["juan","paco", "pedro", "luis", "irene"]

datos = {"numeros": x, "palabras": y, "amigos": z}


df = pd.DataFrame(datos)

df2 = df.sort_values(by = ["numeros", "palabras"])