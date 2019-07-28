import mongoose from 'mongoose';
import '../model/civil-speciality-en.model.js';

export default class CivilSpecialityEnService {
    constructor() {
        this.CivilSpecialityEn = mongoose.model('CivilSpecialityEn');
    }

    createCivilSpecialityEn({
                                codeCivilSpecialityEn,
                                competenceCivilSpecialityEn,
                            }) {
        const civilSpecialityEn = new this.CivilSpecialityEn({
            codeCivilSpecialityEn,
            competenceCivilSpecialityEn,
        });

        return civilSpecialityEn.save();
    }

    update(data, id) {
        return this.CivilSpecialityEn.updateOne({
            _id: id
        }, data);
    }

    delete(id) {
        return this.CivilSpecialityEn.remove({
            _id: id
        });
    }

    deleteAll() {
        return this.CivilSpecialityEn.remove();
    }

    findAll() {
        return this.CivilSpecialityEn.find()
    }
}
