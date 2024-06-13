# SistemaReservasFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Pasos para subir al azure:

# Angular:

Crear web app static con las respectivas configuraciones.

Luego compilar el dist con ng build

Después en el yaml del archivo, se debe apuntar a : app_location:"/dist/sistema_reservas_frontend/browser" # App source code path

Luego crear el archivo proxy.conf.json

Agrega la configuración del proxy inverso para enrutar las solicitudes a tu backend en el angular.json.

```
"architect": {
  "serve": {
    "options": {
      "proxyConfig": "proxy.conf.json"
    }
  }
}
```
```
"architect": {
  "build": {
    "configurations": {
      "production": {
        "fileReplacements": [
          // Aquí van las reglas de reemplazo de archivos
        ]
      }
    }
  }
}
```
```
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
  },
  {
    "replace": "proxy.conf.json",
    "with": "proxy.conf.json"
  }
]
```
```
"architect": {
  "build": {
    "configurations": {
      "production": {
        "fileReplacements": [
          // ...
        ],
        "allowedHosts": ["reservasahbackend.azurewebsites.net"] // Aqui va la ruta del backend
      }
    }
  }
}
```

Dentro del workflow, en este caso dist/sistemas_reservas_frontend/browser
debemos agregar el archivo staticwebapp.config.json con el siguiente contenido, 
esto con la finalidad de que cuando recarguemos la página no genere 404, ya que el archivo
que sirve nuestra app angular es el index.html

````
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif}", "/css/*"]
  }
}
````
