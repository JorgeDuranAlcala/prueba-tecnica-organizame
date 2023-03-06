<h1 align="center"> API de productos </h1>
<p>
  Prueba tecnica backend Node.js para Organizame
</p>

## Pensamientos

Primero que todo quiero explicar mi proceso de pensamiento el cual fue completamente basado (aunque no en su totalidad) en lo aprendido en leer el libro del bastante conocido "Uncle bob" llamado Clean Architecture y por supuesto los principios del DDD (Domain-Driven-Design), Al principio considere esta solucion algo ariesgada de implementar ya que toma un tiempo considerable de energia en planificar lo que se va a estructurar en el codigo, pero apesar de todo me siento muy orgulloso con el resultado, trata de enfocarme mas en la escalabilidad del proyecto y que basicamente fuera Framework-Agnostic, y tambien en la calidad de los test tanto Unit-tests como Integration-tests.

## Filosofia

la filosofia detras de esta solucion es tener un proyecto que sea altamente mantenible e extensible en el tiempo mientras las funcionalidades van creciendo, y por supuesto seguir los aspectos mas importantes de los principios SOLID.

## architecture

<img src="./assets/onion-architecture.png"  alt="onion-architecture"/>

## Instalacion

debes tener instalado [node.js](https://nodejs.org/en/) para poder ejecutar el proyecto.

## Como correr el proyecto

### clona el repositorio

```bash
  git clone https://github.com/JorgeDuranAlcala/prueba-tecnica-organizame.git
```

### variables de entorno (OPCIONAL)

opcionalmente puedes crear un archivo .env en el cual agregar la variables de entorno como la version de la api

```bash
  API_VERSION=1
```

### importante
Las rutas cambiaran dependiendo si decidiste añadir el archivo .env, si no añadiste la variable API_VERSION en el .env, la ruta sera del siguiente modo por defecto:

```bash
[domain-name | http://localhost:4000]/api/vbeta/
```

### install dependencies

```bash
npm install
```

## Inicializacion

```bash
  npm start
```

## Correr tests

```bash
  npm run test
```

## External dependencies

- compression
- jest
- supertest
- uuid
- cross-env
- class-transformer
- class-validator
- express
- ts-node
- helmet
- reflect-metadata
- ts-node

## Usage

#### Crear un producto

#### Body format

##### importante

El sku no se puede repetir ya que es unico, ningun dato puede estar vacio todos son requeridos, y para crear un producto se recomienda primero crear un categoria ya que no se pueden agregar productos sin categorias

```javascript
 body: {
     nombre_producto: "Producto A",
		 descripcion: "Desc producto A",
		 precio: 33.33,
     sku: "TOM1",
		 categoria: "{IdCategoria}"
  }
```

```bash
/POST "[nombre-dominio | http://localhost:4000]/api/v1/product/"
```

#### Response format

```javascript
{
  id: "g323hdsdb",
  product: Product
}
```

### Obtener todos los productos

```bash
/GET "[domain-name]/api/v1/product/"
```

#### Response format

```javascript
{
  products: Product[]
}
```

### Obtener producto por su Id

```bash
/GET "[domain-name]/api/v1/product/{id}"
```

#### Response format

```javascript
{
	id: "g3g4g44",
  product: Product
}
```
### Eliminar producto por su Id

```bash
/DELETE "[domain-name]/api/v1/product/{id}"
```

#### Response format

```javascript
{
	id: "g3g4g44",
  removed: boolean
}
```

### Obtener producto por su nombre o descripcion

```bash
/GET "[domain-name]/api/v1/productSearch?q={myquery}"
```

#### Response format

```javascript
body: {
  products: Product[]
}
```

### Actualizar producto

#### Body format

```javascript
body: {
   nombre_producto: "Product AAA"
}
```

```bash
/PUT "[domain-name]/api/v1/product/{id}",
```

#### Response format

```javascript
{
  id: "d33d33",
	message: "Content of the product updated correctly" 
}
```

### Export 


```bash
/GET "[domain-name]/api/v1/productExport",
```

#### Response format

Un archivo .csv con la data de los productos

#### Crear Categoria

#### Body format

##### importante

El nombre_corto no se puede repetir ya que es unico, ningun dato puede estar vacio todos son requeridos.

```javascript
 body: {
     nombre_corto: "GRAL",
     descripcion: "Desc categoria Y",
     nombre_categoria: "Categoria Y"
  }
```

```bash
/POST "[nombre-dominio | http://localhost:4000]/api/v1/categoria/"
```

#### Response format

```javascript
{
  id: "g323hdsdb",
  categoria: Categoria
}
```

### Obtener todas las categorias

```bash
/GET "[domain-name]/api/v1/categoria/"
```

#### Response format

```javascript
{
  categorias: Categoria[]
}
```

### Obtener categoria por su Id

```bash
/GET "[domain-name]/api/v1/categoria/{id}"
```

#### Response format

```javascript
{
  id: "g3g4g44",
  categoria: Categoria
}
```
### Eliminar producto por su Id

```bash
/DELETE "[domain-name]/api/v1/categoria/{id}"
```

#### Response format

```javascript
{
  id: "g3g4g44",
  removed: boolean
}
```

### Obtener categorias por su nombre o descripcion

```bash
/GET "[domain-name]/api/v1/searchCategoria?q={myquery}"
```

#### Response format

```javascript
{
  categorias: Categoria[]
}
```

### Actualizar producto

#### Body format

```javascript
{
  descripcion: "nueva descripcion Y"
}
```

```bash
/PUT "[domain-name]/api/v1/categoria/{id}",
```

#### Response format

```javascript
{
  id: "d33d33",
  message: "Content of the categoria updated correctly" 
}
```
### Logear Usuarios

#### Body format

```javascript
{
  "user": "admin",
  "password": "4321"
}
```

```bash
/POST "[domain-name]/api/v1/auth/login",
```

#### Response format

```javascript
{
  user: "admin",
  role: "admin"
}
```
