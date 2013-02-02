var crypto = require('crypto'), 
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{type:String, required:true, unique:true, index:true, display:{help:'This must be a unique name'}},
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    password:{type:String},
    created_at:{type:Date},
    modified_at:{type:Date}
});


UserSchema.statics.findA_thru_H = function onFindAH(){
    return this.find().regex('username', /^[a-h]/i);
}

UserSchema.statics.findI_thru_P = function onFindIP(){
    return this.find().regex('username', /^[i-p]/i);
}
UserSchema.statics.findQ_thru_Z = function onFindQZ(){
    return this.find().regex('username', /^[q-z]/i);
}

function sha1b64(password) {
    return crypto.createHash('sha1').update(password).digest('base64');
}

UserSchema.pre('save', function (next) {

    var _this = this;
    if (this._doc.password && this._doc.password != '_default_'){
        this.password = sha1b64(_this._doc.password)
    }
    if (this.isNew)
        this.created_at = Date.now();
    else
        this.modfied_at = Date.now();
    next();
});

UserSchema.statics.findByUsernamePassword = function (username, password) {
    return  this.where({username:username, _password:sha1b64(password)});
}

var User = mongoose.model("users", UserSchema);

module.exports = User;
