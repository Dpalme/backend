Diego Palmerín Bonada A01747290
Zoe Caballero Domínguez A01747247

### Post
Crea un nuevo documento en la base de datos.

**Endpoint:** "/playlist" o "/media"

**Método** POST

**Body**
Para Playlist:
{
    "name":"Nombre Playlist",
    "owner": "User"
    "privacy": "Public"
    "description": "This is a playlist"
    "items": "[001, 002, 003]"
}
Para Media:
{
    "name": "Hamlet"
    "type": "Book"
    "author": "Shakespeare"
    "description": "Drama Play. Everyone dies"
}

**Validaciones**
***Playlist***
Name: Name must be string. Name must be between 5 and 50 characters.
Owner: Must be a valid owner
Privacy: Value can only be "Public" or "Private"
Description: Description must be between 10 and 250 characters

***Media***
Name: Name must be string. Name must be between 5 and 50 characters.
Type: Value can only be "Book" or "Song"
Author: Must be string. Must be between 5 and 50 characters.
Description: Description must be between 10 and 250 characters


### Get
Regresa los datos registrados en la base de datos. La persona usuaria puede mandar un id en específico.

**Endpoint:** "/playlist" o "/media"

**Método** GET

**Body**
{
    "id":"1234567"
}

**Validaciones**
Id: que el id se encuentre en la base de datos
Usuario: que la información sea de la persona usuaria actual.

### Put
Actualiza la información de un documento dado. 

**Endpoint:** "/playlist" o "/media"

**Método** PUT

**Body**
{
    "id":"1234567",
    "name":"New Name"
}

**Validaciones**
Id: que el id se encuentre en la base de datos
Usuario: que la información sea de la persona usuaria actual.

### Del
Elimina el documento que tiene el id mandado por la persona usuaria.

**Endpoint:** "/playlist" o "/media"

**Método** DEL

**Body**
{
    "id":"1234567"
}

**Validaciones**
Id: que el id se encuentre en la base de datos
Usuario: que la información sea de la persona usuaria actual.

