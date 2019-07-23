import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ExpertsSchema = new Schema({
    educationLevel: {type: Number},
    healthStatus: {type: Number},
    physicalStatus: {type: Number},
    profPsychStatus: {type: Number},
    socialSelectionStatus: {type: Number},
});

const Experts = mongoose.model('Experts', ExpertsSchema);