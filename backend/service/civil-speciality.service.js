import mongoose from 'mongoose';
import '../model/civil-speciality.model.js';

export default class CivilSpecialityService {
    constructor() {
        this.CivilSpeciality = mongoose.model('CivilSpeciality');
    }

    createCivilSpeciality({
        codeCivilSpeciality,
        nameCivilSpeciality,
        competenceCivilSpeciality,
    }) {
        const civilSpeciality = new this.CivilSpeciality({
            initialDate: new Date(),
            codeCivilSpeciality,
            nameCivilSpeciality,
            competenceCivilSpeciality,
        });

        return civilSpeciality.save();
    }

    update(data, id) {
        return this.CivilSpeciality.updateOne({
            _id: id
        }, data);
    }

    delete(id) {
        return this.CivilSpeciality.remove({
            _id: id
        });
    }

    findAll() {
        return this.CivilSpeciality.find()
    }
}
