function UsersSchema(mongoose) {

    var usersSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String
    });

    var Users = mongoose.model('Users', usersSchema);

    return {
        findAll: function(callback) {
            Users.find(callback);
        },
        save: function(callback, body) {
            new Users(body).save(callback);
        },
        update: function(callback, body, id) {
            if(!id) {
                return callback('Error: não foi passado o body ou o ObjectId');
            }
            Users.update({'_id': id}, body, {multi: false}, callback);
        },
        remove: function(callback, id) {
            Users.findById(id, function(err, data) {
                if(err) {
                    return callback(err);
                }
                data.remove(callback);
            })
        }
    };

};

module.exports = UsersSchema;