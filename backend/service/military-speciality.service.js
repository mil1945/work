import mongoose from 'mongoose';
import '../model/military-speciality.model.js';

export default class MilitarySpecialityService {
    constructor() {
        this.MilitarySpeciality = mongoose.model('MilitarySpeciality');
    }

    createMilitarySpeciality({codeMilitarySpeciality,
                                 nameMilitarySpeciality,
                                 competenceMilitarySpeciality,
                                 idMilitarySpecialityEn
                             }) {
        const militarySpeciality = new this.MilitarySpeciality({
            initialDate: new Date(),
            codeMilitarySpeciality,
            nameMilitarySpeciality,
            competenceMilitarySpeciality,
            idMilitarySpecialityEn
        });

        return militarySpeciality.save();
    }

    update(data, id) {
        return this.MilitarySpeciality.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.MilitarySpeciality.remove({_id: id});
    }

    deleteAll() {
        return this.MilitarySpeciality.remove();
    }

    getById(id) {
        return this.MilitarySpeciality.findOne({
            _id: id
        });
    }

    getByData(data) {
        return this.MilitarySpeciality.findOne(data);
    }

    findAll() {
        return this.MilitarySpeciality.find()
    }
}
