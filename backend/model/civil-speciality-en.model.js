import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CivilSpecialityEnSchema = new Schema({
    codeCivilSpecialityEn: {type: Number},
    competenceCivilSpecialityEn: {type: Array},
});

const CivilSpecialityEn = mongoose.model('CivilSpecialityEn', CivilSpecialityEnSchema);
