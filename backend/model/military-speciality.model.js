import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MilitarySpecialitySchema = new Schema({
    initialDate: {type: Date},
    codeMilitarySpeciality: {type: Number},
    nameMilitarySpeciality: {type: String},
    competenceMilitarySpeciality: {type: Array}, // массив
    idMilitarySpecialityEn: {type: String},
});

const MilitarySpeciality = mongoose.model('MilitarySpeciality', MilitarySpecialitySchema);
