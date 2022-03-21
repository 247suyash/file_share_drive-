"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({

  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, },
  password: { type: String, required: false, default: "" },
  plan: { type: String, enum: ['none', 'free', 'basic', 'standard'], default: 'none' },
  upload: {type: Number, required: false, default:0 },
  sharePublic: {type: Number, required: false, default:0 },
  sharePrivate: {type: Number, required: false, default:0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserModelSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre('findOneAndUpdate', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

module.exports = mongoose.model('user', UserModelSchema);