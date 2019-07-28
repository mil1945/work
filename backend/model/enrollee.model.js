import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const EnrolleeSchema = new Schema({
    initialDate: {type: Date},
    fullName: {type: String},
    educationLevel: {type: Number},
    healthStatus: {type: Number},
    physicalStatus: {type: Number},
    profPsychStatus: {type: Number},
    socialSelectionStatus: {type: Number},
    integralIndex: {type: Number},
    civilSpeciality: {type: Number},
    rank: {type: Number},
    recommendationsMilitarySpeciality: {type: Array}, // изменить
});

const Enrollee = mongoose.model('Enrollee', EnrolleeSchema);
