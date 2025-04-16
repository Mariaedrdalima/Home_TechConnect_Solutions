#!/usr/bin/env python3

import os

# Caminho da pasta onde estão os arquivos
pasta = os.getcwd()  # Substitua pelo caminho da sua pasta

# Percorre todos os arquivos da pasta
for nome_arquivo in os.listdir(pasta):
    caminho_antigo = os.path.join(pasta, nome_arquivo)
    
    # Verifica se é um arquivo (ignora pastas)
    if os.path.isfile(caminho_antigo):
        nome, extensao = os.path.splitext(nome_arquivo)
        novo_nome = nome + extensao + "x" 
        caminho_novo = os.path.join(pasta, novo_nome)
        
        os.rename(caminho_antigo, caminho_novo)
        print(f'Renomeado: {nome_arquivo} -> {novo_nome}')