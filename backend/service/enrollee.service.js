import mongoose from 'mongoose';
import '../model/enrollee.model.js';

export default class EnrolleeService {
    constructor() {
        this.Enrollee = mongoose.model('Enrollee');
    }

    createEnrollee({
                       educationLevel,
                       fullName,
                       healthStatus,
                       physicalStatus,
                       profPsychStatus,
                       socialSelectionStatus,
                       civilSpeciality
                   }) {
        const enrollee = new this.Enrollee({
            initialDate: new Date(),
            fullName,
            educationLevel,
            physicalStatus,
            healthStatus,
            profPsychStatus,
            socialSelectionStatus,
            civilSpeciality,
            integralIndex: 0,
            rank: 0
        });

        return enrollee.save();
    }

    update(data, id) {
        return this.Enrollee.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.Enrollee.remove({_id: id});
    }

    deleteAll() {
        return this.Enrollee.remove();
    }

    findAll() {
        return this.Enrollee.find()
    }
}