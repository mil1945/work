import mongoose from 'mongoose';
import '../model/civil-speciality.model.js';

export default class CivilSpecialityEnService {
    constructor() {
        this.CivilSpecialityEn = mongoose.model('CivilSpecialityEn');
    }

    createCivilSpecialityEn({
                              codeCivilSpecialityEn,
                              competenceCivilSpecialityEn,
                          }) {
        const civilSpecialityEn = new this.CivilSpecialityEn({
            initialDate: new Date(),
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

    findAll() {
        return this.CivilSpecialityEn.find()
    }
}
