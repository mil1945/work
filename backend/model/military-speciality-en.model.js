import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MilitarySpecialityEnSchema = new Schema({
    codeMilitarySpecialityEn: {type: Number},
    competenceMilitarySpecialityEn: {type: Array}, // массив
});

const MilitarySpecialityEn = mongoose.model('MilitarySpecialityEn', MilitarySpecialityEnSchema);
