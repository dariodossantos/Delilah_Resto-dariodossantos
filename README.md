# Proyecto Acamica "Delilah Restó" 🍽
Este proyecto esta orientado unicamente al BackEnd.

# Documentación de la API 📖
Para utilizar, y probar los servicios, debemos Ingresar a [Swagger](https://editor.swagger.io/) y copiar el contenido del documento "doc-api.yaml" o importar el mismo desde Swagger.
Se desplegaran todos los EndPoint de la aplicacion.


# Instalando el proyecto :arrows_clockwise:
###### Clonar Repositorio de GitHub
[Presione Aqui](https://github.com/dariodossantos/Delilah_Resto-dariodossantos.git) para clonar el repositorio desde GitHub o desde la consola (desde la carpeta donde se desea generar el proyecto local) con el siguiente comando: 
<br><br>
`git clone https://github.com/dariodossantos/Delilah_Resto-dariodossantos.git`
<br><br>
###### Instalar dependencias
Dentro de la carpeta donde clonamos el repositorio dirigirse a la carpeta Servidor (cd .\Delilah_Resto-dariodossantos\Servidor\) y ejecutar el comando para instalar las dependencias del proyecto
<br><br>
`npm i`
<br><br>
Luego ejecutar el siguiente comando para arrancar el servidor:
<br><br>
`npm run dev`
<br><br>
###### Crear Base de datos MySql
1) -> Tener instalado un gestor de base de datos como XAMPP, WAMP o LAMP
2) -> Inicializar los servicios Apache y MySql
    * Tomando como ejemplo WAMP, estos se inicializan desde el boton "Start"
    * Luego abrir el panel de control del servicio de MySql. Con el boton Admin o desde este [LINK](http://localhost/phpmyadmin/index.php)
3) -> Dirigirse a la opcion Importar y en la seccion "Seleccionar Archivo" por favor importar "Base_de_datos_RESTO", la misma ya generara la base de datos con sus tablas.
<br><br>
LISTO PARA USAR :bowtie: !!!
<br><br>
# Algunas consideraciones
Al importar el archivo SQL este ya generara por default dos usuarios, uno con rol de usuario (Usuario: user - Pass: 123456) y otro con rol administrador (Usuario: admin - Pass: 123456).
<br><br>
Todo se puede probar desde Swagger, ya que el mismo esta apuntando al server y tambien se encuentra la explicacion de como utilizar cada EndPonit.
