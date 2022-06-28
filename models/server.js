const express = require('express');
const cors= require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:        '/api/auth',
            buscar:      '/api/buscar',
            catergorias: '/api/categorias',
            productos:   '/api/productos',
            usuarios:    '/api/usuarios',

        }
        // this.usuariosPath = '/api/usuarios';
        // this.authPath     ='/api/auth';
        

        //Conectar a la base de datos
        this.conectarDB();


        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //CORS
        this.app.use( cors() );


        //Directorio publico
        this.app.use( express.static('public'));

        //Lectura y parseo del body
        this.app.use( express.json() );
    }
    
    routes(){

        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.catergorias, require('../routes/categorias'));
        
        
        
      
    }
    listen(){
        this.app.listen( this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


module.exports = Server;