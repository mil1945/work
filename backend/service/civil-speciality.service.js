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
                              idCivilSpecialityEn
                          }) {
        const civilSpeciality = new this.CivilSpeciality({
            initialDate: new Date(),
            codeCivilSpeciality,
            nameCivilSpeciality,
            competenceCivilSpeciality,
            idCivilSpecialityEn
        });

        console.log('createCivilSpeciality idCivilSpecialityEn');
        console.log(idCivilSpecialityEn);

        return civilSpeciality.save();
    }

    getById(id) {
        return this.CivilSpeciality.findOne({
            _id: id
        });
    }

    getByData(data) {
        return this.CivilSpeciality.findOne(data);
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

    deleteAll() {
        return this.CivilSpeciality.remove();
    }

    findAll() {
        return this.CivilSpeciality.find()
    }
}
