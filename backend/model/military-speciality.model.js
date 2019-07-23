import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MilitarySpecialitySchema = new Schema({
    initialDate: {type: Date},
    codeMilitarySpeciality: {type: Number},
    nameMilitarySpeciality: {type: String},
    competenceMilitarySpeciality: {type: Array}, // массив
});

const MilitarySpeciality = mongoose.model('MilitarySpeciality', MilitarySpecialitySchema);
