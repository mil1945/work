import Express from 'express';
import bodyParser from 'body-parser';
import {config} from './constant/config.js';
import cors from 'cors';
import EnrolleeController from './controller/enrollee.controller';
import ExpertsController from './controller/experts.controller';
import ProcessController from './controller/process.controller.js';
import MilitarySpecialityController from './controller/military-speciality.controller.js';
import CivilSpecialityController from './controller/civil-speciality.controller.js';
import UtilController from './controller/util.controller.js';
import RangingController from './controller/ranging.controller.js';

import * as dbUtils from './utils/db.utils.js';

class Application {
    constructor() {
        this.app = Express();
        this.app.use(bodyParser.json());

        this.app.use(cors({
            origin: true,
            //credentials: true
        }));

        this.port = process.env.PORT || config.port;

        dbUtils.dbCreateConnection();

        this.enrolleeController = new EnrolleeController;
        this.expertsController = new ExpertsController;
        this.processController = new ProcessController;
        this.militarySpecialityController = new MilitarySpecialityController;
        this.civilSpecialityController = new CivilSpecialityController;
        this.utilController = new UtilController;
        this.rangingController = new RangingController;

        this.startRoutes();

        this.app.listen(this.port, () => {
            console.log(`App start on port ${this.port}`);
        });
    }

    startRoutes() {
        this.app.get('/enrollee', this.enrolleeController.allEnrollee.bind(this));
        this.app.post('/enrollee', this.enrolleeController.createEnrollee.bind(this));
        this.app.post('/enrollee/:id', this.enrolleeController.updateEnrolleeById.bind(this));
        this.app.delete('/enrollee/:id', this.enrolleeController.deleteEnrolleeById.bind(this));

        this.app.get('/experts', this.expertsController.allExperts.bind(this));
        this.app.post('/experts', this.expertsController.createExperts.bind(this));
        this.app.post('/experts/:id', this.expertsController.updateExpertsById.bind(this));
        this.app.delete('/experts/:id', this.expertsController.deleteExpertsById.bind(this));

        this.app.post('/process', this.processController.createRangingData.bind(this));
        this.app.get('/process', this.processController.getRangingData.bind(this));

        this.app.get('/ranging/:fieldName/:sortType', this.rangingController.getFilterData.bind(this));

        this.app.get('/military-speciality', this.militarySpecialityController.allMilitarySpeciality.bind(this));
        this.app.post('/military-speciality', this.militarySpecialityController.createMilitarySpeciality.bind(this));
        this.app.post('/military-speciality/:id', this.militarySpecialityController.updateMilitarySpecialityById.bind(this));
        this.app.delete('/military-speciality/:id', this.militarySpecialityController.deleteMilitarySpecialityById.bind(this));

        this.app.get('/civil-speciality', this.civilSpecialityController.allCivilSpeciality.bind(this));
        this.app.post('/civil-speciality', this.civilSpecialityController.createCivilSpeciality.bind(this));
        this.app.post('/civil-speciality/:id', this.civilSpecialityController.updateCivilSpecialityById.bind(this));
        this.app.delete('/civil-speciality/:id', this.civilSpecialityController.deleteCivilSpecialityById.bind(this));

        this.app.get('/util/clear', this.utilController.clearAll.bind(this)); // for debug
    }
}

new Application();
