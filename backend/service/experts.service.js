import mongoose from 'mongoose';
import '../model/experts.model.js';

export default class ExpertsService {
    constructor() {
        this.Experts = mongoose.model('Experts');
    }

    createExperts({educationLevel,
                       healthStatus,
                       physicalStatus,
                       profPsychStatus,
                       socialSelectionStatus}) {
        const experts = new this.Experts({
            educationLevel,
            physicalStatus,
            healthStatus,
            profPsychStatus ,
            socialSelectionStatus ,
        });

        return experts.save();
    }

    update(data, id) {
        return this.Experts.updateOne({_id: id}, data);
    }

    delete(id) {
        return this.Experts.remove({_id: id});
    }

    findAll() {
        return this.Experts.find();
    }
}