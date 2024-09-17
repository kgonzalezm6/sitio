import requests
from bs4 import BeautifulSoup

# Pedir la URL al usuario
url = input("Ingresa la URL de la página web: ")

# Realizar la solicitud GET a la URL
response = requests.get(url)

# Comprobar que la solicitud fue exitosa
if response.status_code == 200:
    # Crear el objeto BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Buscar la imagen con la clase 'sc-7c0a9e7c-0 hXPlvk'
    img_tag = soup.find('img', class_='sc-7c0a9e7c-0 hXPlvk')
    
    if img_tag:
        # Obtener el valor del atributo 'src'
        img_src = img_tag['src']
        print("URL de la imagen encontrada:", img_src)
    else:
        print("No se encontró ninguna imagen con la clase especificada.")
else:
    print("Error al acceder a la página:", response.status_code)
