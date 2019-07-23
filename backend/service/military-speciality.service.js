import mongoose from 'mongoose';
import '../model/military-speciality.model.js';

export default class MilitarySpecialityService {
    constructor() {
        this.MilitarySpeciality = mongoose.model('MilitarySpeciality');
    }

    createMilitarySpeciality({codeMilitarySpeciality,
                                 nameMilitarySpeciality,
                                 competenceMilitarySpeciality,
                             }) {
        const militarySpeciality = new this.MilitarySpeciality({
            initialDate: new Date(),
            codeMilitarySpeciality,
            nameMilitarySpeciality,
            competenceMilitarySpeciality,
        });

        return militarySpeciality.save();
    }

    update(data, id) {
        return this.MilitarySpeciality.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.MilitarySpeciality.remove({_id: id});
    }

    findAll() {
        return this.MilitarySpeciality.find()
    }
}

