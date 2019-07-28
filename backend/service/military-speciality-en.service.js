import mongoose from 'mongoose';
import '../model/military-speciality-en.model.js';

export default class MilitarySpecialityEnService {
    constructor() {
        this.MilitarySpecialityEn = mongoose.model('MilitarySpecialityEn');
    }

    createMilitarySpecialityEn({
                                 codeMilitarySpecialityEn,
                                 competenceMilitarySpecialityEn,
                             }) {
        const militarySpeciality = new this.MilitarySpecialityEn({
            initialDate: new Date(),
            codeMilitarySpecialityEn,
            competenceMilitarySpecialityEn,
        });

        return militarySpeciality.save();
    }

    update(data, id) {
        return this.MilitarySpecialityEn.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.MilitarySpecialityEn.remove({_id: id});
    }

    findAll() {
        return this.MilitarySpecialityEn.find()
    }
}

