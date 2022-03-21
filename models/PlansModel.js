"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlansModel = new Schema({
  free:{type:String , plan:"free"},
  basic:{type:String , plan:"basic"},
  standard:{type:String , plan:"standard"},
  premium:{type:String , plan:"premium"},
    
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PlansModel.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

PlansModel.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

PlansModel.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('plan', PlansModel);