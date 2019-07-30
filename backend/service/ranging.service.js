import mongoose from 'mongoose';
import '../model/ranging.model.js';
import {ORDER} from "../constant/ranging.constant";

export default class RangingService {
    constructor() {
        this.Ranging = mongoose.model('Ranging');
    }

    createRanging({
                      fullName,
                      date,
                      rang,
                      integralIndex,
                      recommendationsMilitarySpeciality,
                      recommendationsSubdivision,
                      idEnrollee
                  }) {
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

    filter(fieldName, order) {
        const sortParam = {};
        sortParam[fieldName] = order;

        console.log('filter sortParam');
        console.log(sortParam);

        return this.Ranging.aggregate(
            [
                {$sort: sortParam}
            ]
        )
    }

    findAll() {
        return this.Ranging.find();
    }
}