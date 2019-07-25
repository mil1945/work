import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CivilSpecialityEnSchema = new Schema({
    codeCivilSpeciality: {type: Number},
    competenceCivilSpeciality: {type: Array},
});

const CivilSpecialityEn = mongoose.model('CivilSpecialityEn', CivilSpecialityEnSchema);
