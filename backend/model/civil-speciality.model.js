import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CivilSpecialitySchema = new Schema({
    initialDate: {type: Date},
    codeCivilSpeciality: {type: Number},
    nameCivilSpeciality: {type: String},
    competenceCivilSpeciality: {type: Array}, // массив
});

const CivilSpeciality = mongoose.model('CivilSpeciality', CivilSpecialitySchema);
