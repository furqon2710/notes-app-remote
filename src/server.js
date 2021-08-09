const Hapi = require('@hapi/hapi');
const routes = require('./route');

const init = async () => {
    
    const server = Hapi.server({
        port : 5000 ,
        host : 'localhost',
        routes: {
            cors: {
            origin: ['*'],
            },
        },
    })

    server.route(routes);

    await server.start();
    console.log(`Server has been deployed on ${server.info.uri}`);
};

init();
