# Proyecto Vue Factura

## Configuracion.
```
npm install
```

### Iniciar Proyecto.
```
npm run serve
```
- Debera primero Registrarse, con solo colocar el nombre, un correo valido y el password ya quedaras registrado.
- Luego debe iniciar sesion con el correo que se coloco en el momento del registro.
- En la pantalla a continuacion del login es el listado de las facturas. donde se puede apreciar los campos de la tabla.
- para registrar una factura debera dar click en el boton de color verde que se llama Nueva Factura.
- Al dar click en dichi boton se abrira un modal con el formulario para registrar una factura.
- Debe llenar los campos que ahi dice.
- El campo valor y total a pagar estan bloqueados ya que esos se llenan de acuerdo al valor del iva y 
  los productos que se vayan agregando al dar click en el boton Nuevo item de color verde.
  por defecto sale uno. si quiere agregar mas debe dar click en el boton ya mencionado anteriormente.
- A medida que se vaya llenando los campos correspondientes a los productos de la factura, el valor y valor total iran cambiando 
  dependiendo de los datos de la cantidad y valor unitario.
- Dar click en el boton azul llamado guardar para realizar el proceso de registro de factura y sus respectivos productos.
- En la lista de facturas para ver los productos de cada uno, en la columna detalles de dicha tabla, se puede apreciar un icono de una flecha o el icono de     mayor que ">" . Al dar click sobre dicho icono se desplegara una tabla hacia abajo.
- La tabla contiene una pequeña caja de texto que permite realizar busquedas por el numero de la factura, el emisor y comprador.
- Si desea organizar los datos de la tabla, en el nombre de la columna numero de factura en la parte derecha, se puede apreciar un icono como de dos           flechas, una para arriba y otra para abajo. Al dar click en alguna de las dos los datos de la tabla se organizara como desea.
- Puede hacer el procesi de elminacion de una factura y puede hacer el proceso de actualizacion, que es bastante similar a cuando se crea una factura         nueva. 
- En la parte superior de la tabla lista existe un boton rojo que se llama logout, sirve para salir y cerrar sesion.
