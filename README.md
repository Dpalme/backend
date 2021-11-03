# Backend
CLI only playlists for books and songs
## Authors
* Diego Palmerín Bonada A01747290
* Zoe Caballero Domínguez A01747247

##Methods
### Post
Crea un nuevo documento en la base de datos.


####Playlist:

#####Crear Playlist
**path**: `/playlist`
**body**:
```
{
    name: "Nombre Playlist",
    privacy: "Public",
    description: "This is a playlist"
}
```

#####Agregar media a playlist
**path**: `/playlist/idPlaylist`
**body**:
```
{
    itemId: "id de documento"
}
```

#####Crear Media y agregarlo a playlist
**path**: `/playlist/idPlaylist`
**body**:
```
{
    name: "Hamlet"
    type: "Book",
    privacy: "Private",
    author: "Shakespeare"
    description: "Drama Play. Everyone dies"
}
```


####Media:
```
{
    name: "Hamlet"
    type: "Book",
    privacy: "Private",
    author: "Shakespeare"
    description: "Drama Play. Everyone dies"
}
```

####Validaciones

#####Playlist

`name`: Name must be string. Name must be between 5 and 50 characters.

`privacy`: Value can only be "Public" or "Private".

`description`: Description must be between 10 and 250 characters.

#####Media

`name`: Name must be string. Name must be between 5 and 50 characters.

`type`: Value can only be "Book" or "Song".

`privacy`: Value can only be "Public" or "Private".

`author`: Must be string. Must be between 5 and 50 characters.

`description`: Description must be between 10 and 250 characters.



### Get
Regresa los datos registrados en la base de datos. La persona usuaria puede mandar un id en específico.

**path**: `/playlist`

Sin ningún otro argumento, regresa todas las playlists asociadas con la sesión actual o públicas

Igualmente, puede recibir un id en el cuerpo
**body**
```
{
    id: "1234567"
}
```

**URL params**
`/playlist/id`

**Validaciones**

`id`: que el id se encuentre en la base de datos.

Dependiendo de la privacidad, se permitirá o no el acceso a esta información

### Put
Actualiza la información de un documento dado. 

**path**: `/playlist` o `/media`
**body**
```
{
    id: "1234567",
    name: "New Name"
}
```

####Validaciones

`id`: que el id se encuentre en la base de datos.
datos: que sean del tipo correcto y cumplan con sus limitaciones

###Delete
Elimina el documento que tiene el id mandado por la persona usuaria.

**path**: `/playlist` o `/media`
**body**
```
{
    id: "1234567"
}
```

**Validaciones**
`id`: que el id se encuentre en la base de datos.
