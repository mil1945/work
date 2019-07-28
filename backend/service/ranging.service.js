import mongoose from 'mongoose';
import '../model/ranging.model.js';

export default class RangingService {
    constructor() {
        this.Ranging = mongoose.model('Ranging');
    }

    createRanging({fullName,
                  date,
                  rang,
                  integralIndex,
                  recommendationsMilitarySpeciality,
                  recommendationsSubdivision,
                  idEnrollee}) {
        const ranging = new this.Ranging({
            fullName,
            date,
            rang,
            integralIndex,
            recommendationsMilitarySpeciality,
            recommendationsSubdivision,
            idEnrollee
        });

        return ranging.save();
    }

    update(data, id) {
        return this.Ranging.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.Ranging.remove({_id: id});
    }

    deleteAll() {
        return this.Ranging.remove();
    }

    filterAsc() {
        return this.Ranging.aggregate(
            [
                { $sort : { fullName : -1} }
            ]
        )
    }

    findAll() {
        return this.Ranging.find();
    }
}