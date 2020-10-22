# -*- coding: utf-8 -*-
"""
Created on Thu Oct 22 11:35:51 2020

@author: 2rome
"""
import pandas as pd
import numpy as np

datos_entrada = "Jornada_index.txt"
categorias_entrada = "Categorias_Estadisticas.txt"
carpeta_entrada = "./../Datos/"


def parse_categorias(fichero):
    with open(fichero, 'r') as file:
        categorias = file.readlines()
        categorias = list(map(lambda x: x.replace("\n", ""), categorias))
    return categorias

def parse_file(archivo_de_entrada, categorias):
    diccionario = {}
    lectura_limpia = []
    
    for categoria in categorias:
        diccionario[categoria] = []
        
        
    with open(archivo_de_entrada, 'r') as file:
        lectura = file.readlines()
    
    for linea in lectura:
        if linea != '\n':
            lectura_limpia.append(linea.replace("\n", "").replace("%", "").replace(",", "."))
        
    
    total_equipos = len(lectura_limpia)//len(categorias)
    
    reordenacion = [[] for i in range(total_equipos)]
    for indice, dato in enumerate(lectura_limpia):
        reordenacion[indice//len(categorias)].append(dato)
        
    for equipo in reordenacion:
        for indice,categoria in enumerate(categorias):
            if indice == 0:
                dato = equipo[indice]
            elif "." in equipo[indice]:
                dato = float(equipo[indice])
            else: 
                dato = int(equipo[indice])
            diccionario[categoria].append(dato)
    
    df = pd.DataFrame(diccionario)
        
    return df



if __name__ == '__main__':
    JORNADA = 1
    categorias = carpeta_entrada + categorias_entrada
    
    categorias = parse_categorias(categorias)
    fichero = (carpeta_entrada + datos_entrada).replace("index", str(JORNADA))
    
    df = parse_file(fichero, categorias)
    df.to_excel(f"../estadisticas_Jornada_{JORNADA}.xlsx", index = False)
    
    
    