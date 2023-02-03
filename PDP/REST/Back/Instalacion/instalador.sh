echo "IMPORTANTE: EJECUTAR CON PERMISOS DE ADMINISTRADOR"
echo "Para que funcione el instalador correctamente, se deben tener instalados los siguientes paquetes:"
echo "- Apache2"
echo "- MySQL Server"
echo "- PHP7.4 con las extensiones correspondientes de MySQL"
echo ""
echo "El script instalará el proyecto en /var/www/html/ y configurará Apache."
echo "También creará una nueva base de datos con su usuario correspondiente. Para esto necesita conectarse a MySQL con una cuenta de usuario y contraseña que ya existan."
echo ""
echo "Si estás listo para instalar, pulsa Intro. Si no, escribe algo y pulsa Intro para salir del instalador."
read -p "¿Listo?: " ruta
echo ""

echo "--------- Clonando repositorio del proyecto... ---------"
echo ""

if [ ! -z "$ruta" ]
then
    exit 0
else
    if [ ! -z "$(ls -A /var/www/html/PDP_PRINTS)" ]
    then
        echo "Limpiando directorio..."
        rm -r /var/www/html/PDP_PRINTS
        echo ""
    fi
    git clone https://github.com/AnaAbadLorenzo/PDP_PRINTS.git /var/www/html/PDP_PRINTS
    echo ""
fi

echo "Hecho."
echo ""

echo "--------- Asignando IP a las URLs... ---------"
echo ""

$ip = "$(hostname -I)"
echo "La IP que se utilizará para recibir las peticiones será "
echo $ip
echo ""


echo "Hecho."
echo ""

echo "--------- Configurando Apache... ---------"
echo ""

cp /var/www/html/PDP_PRINTS/PDP/REST/Back/Instalacion/pdp_prints.conf /etc/apache2/sites-available/pdp_prints.conf
a2ensite pdp_prints.conf

echo "Hecho."
echo ""

echo "--------- Reiniciando Apache... ---------"
echo ""

systemctl restart apache2

echo "Hecho."
echo ""

echo "--------- Instalando base de datos primaria... ---------"
echo ""

read -p "Introduce tu usuario MySQL: " usuario
echo "A continuación se te pedirá la contraseña del usuario especificado."
mysql -u $usuario -p < /var/www/html/PDP_PRINTS/PDP/REST/Back/Instalacion/pdp_prints.sql
echo ""

echo "Hecho."
echo ""

echo "--------- Instalando base de datos de test... ---------"
echo ""

read -p "Introduce tu usuario MySQL: " usuario
echo "A continuación se te pedirá la contraseña del usuario especificado."
mysql -u $usuario -p < /var/www/html/PDP_PRINTS/PDP/REST/Back/Instalacion/pdp_prints_test.sql
echo ""

echo "Hecho."
echo ""

echo "--------- Instalación completada."
echo "Se puede acceder a la página principal introduciendo en el navegador la siguiente URL:"
echo "http://localhost/PDP_PRINTS/PDP/REST/Front/index.html"
echo ""