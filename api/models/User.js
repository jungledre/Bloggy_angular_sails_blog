/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    firstName:{
      type:'string'
    },
    lastName:{
      type:'string'
    },
    email:{
      type:'email',
      required:true,
      unique:true
    },
    password:{
      type:'string',
      required:true
    },
    toJSON: function(){
      var userObj = this.toObject();
      delete userObj.password;
      return userObj
    }
  },
  beforeCreate:function(values,callback){
    bcrypt.hash(values.password, 10, function(err, hash){
      if(err) return callback(err);
      values.password = hash
      callback();
    });
  }
};

