echo "IMPORTANTE: EJECUTAR CON PERMISOS DE ADMINISTRADOR"
echo "Para que funcione el instalador correctamente, se deben tener instalados los siguientes paquetes:"
echo "- Apache2"
echo "- MySQL Server"
echo "- PHP7.4 con las extensiones correspondientes de MySQL"
echo ""
echo "El script instalará el proyecto en /var/www/ y configurará Apache."
echo "También creará una nueva base de datos con su usuario correspondiente. Para esto necesita conectarse a MySQL con una cuenta de usuario y contraseña que ya existan."
echo ""
echo "Si deseas descargar sólo el proyecto sin configurar nada, especifica aquí una ruta de descarga."
echo "Para una instalación normal, déjalo vacío."
read -p "¿Ruta de descarga?: " ruta
echo ""

echo "--------- Clonando repositorio del proyecto... ---------"
echo ""

if [ ! -z "$ruta" ]
then
    git clone https://github.com/AnaAbadLorenzo/PDP_PRINTS.git $ruta
    echo "---------- Descarga completada."
    exit 0
else
    git clone https://github.com/AnaAbadLorenzo/PDP_PRINTS.git /var/www/PDP_PRINTS
    echo ""
fi

echo "Hecho."
echo ""

echo "--------- Configurando Apache... ---------"
echo ""

cp /var/www/PDP_PRINTS/PDP/REST/Back/Instalacion/pdp_prints.conf /etc/apache2/sites-available/pdp_prints.conf
sudo a2ensite pdp_prints.conf

echo "Hecho."
echo ""

echo "--------- Reiniciando Apache... ---------"
echo ""

sudo systemctl restart apache2

echo "Hecho."
echo ""

echo "--------- Instalando base de datos... ---------"
echo ""

read -p "Introduce tu usuario MySQL: " usuario
echo "A continuación se te pedirá la contraseña del usuario especificado."
sudo mysql -u $usuario -p < /var/www/PDP_PRINTS/PDP/REST/Back/Instalacion/pdp_prints.sql
echo ""

echo "Hecho."
echo ""

echo "--------- Instalación completada."
echo "Se puede acceder a la página principal introduciendo en el navegador la siguiente URL:"
echo "http://localhost/PDP_PRINTS/PDP/REST/Front/index.html"
echo ""