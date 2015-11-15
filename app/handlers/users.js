var path = require('path');

function usersHandler(baseHandler) {

    var schema = require('./../collections/schema_users')(baseHandler.mongoose);
    var router = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(null, schema.findAll));

    router.post('/', baseHandler.handlingResponse(['body'], schema.save));

    router.put('/:id', baseHandler.handlingResponse(['body'], schema.update, ['params', 'id']));

    router.delete('/:id', baseHandler.handlingResponse(['params', 'id'], schema.remove));

    baseHandler.app.use(path.join(baseHandler.config.uri, 'usuario'), router);

};

module.exports = usersHandler;