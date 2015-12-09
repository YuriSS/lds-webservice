function InstitutionSchema(mongoose) {

    var institutionSchema = mongoose.Schema({
        type: String,
        name: String,
        address: String,
        phone: String,
        description: String,
        validation: {type: Boolean, default: false},
        validation_at: Date,
        created_at: {type: Date, default: new Date()},
        geolocation: {type: [Number], index: '2d'}
    });

    var Institution = mongoose.model('Institution', institutionSchema);

    return {
        findAll: function(callback) {
            Institution.find(callback);
        },
        findNear: function(callback, geo) {
            console.log(geo);
            Institution.find({geolocation: { $nearSphere: geo}}, callback);
        },
        save: function(callback, body) {
            new Institution(body).save(callback);
        },
        update: function(callback, body, id) {
            if(!id) {
                return callback('Error: não foi passado o body ou o ObjectId');
            }
            Institution.update({'_id': id}, body, {multi: false}, callback);
        },
        remove: function(callback, id) {
            Institution.findById(id, function(err, data) {
                if(err) {
                    return callback(err);
                }
                data.remove(callback);
            })
        }
    };

};

module.exports = InstitutionSchema;
