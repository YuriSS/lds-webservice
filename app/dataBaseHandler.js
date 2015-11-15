module.exports = function(mongoose, config) {
    mongoose.connect(config.db_host);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Conectado ao MongoDB');
    });
};