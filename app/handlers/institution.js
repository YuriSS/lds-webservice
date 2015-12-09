var path = require('path');

function instituicaoHandler(baseHandler) {

    var schema = require('./../collections/schema_institution')(baseHandler.mongoose);
    var router = baseHandler.express.Router();

    router.get('/', baseHandler.handlingResponse(null, schema.findAll));
    router.get('/near', baseHandler.handlingResponse(['body'], schema.findNear));

    router.post('/', baseHandler.handlingResponse(['body'], schema.save));

    router.put('/:id', baseHandler.handlingResponse(['body'], schema.update, ['params', 'id']));
	
	console.log(baseHandler.config.uri + '/instituicao');

    baseHandler.app.use(baseHandler.config.uri + '/instituicao', router);

};

module.exports = instituicaoHandler;
