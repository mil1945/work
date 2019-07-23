import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const RangingSchema = new Schema({
    fullName: {type: String},
    date: {type: Date},
    rang: {type: Number},
    integralIndex: {type: Number},
    recommendationsMilitarySpeciality: {type: Number}, // изменить
    recommendationsSubdivision: {type: Number}, // изменить
    idEnrollee: {type: String}
});

const Ranging = mongoose.model('Ranging', RangingSchema);