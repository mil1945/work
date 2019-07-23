import MilitarySpecialityService from '../service/military-speciality.service.js';

export default class MilitarySpecialityController {
    constructor() {
    }

    allMilitarySpeciality(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityService.findAll().then((enr) => {
            res.status(200).json(enr).end();
        });
    }

    updateMilitarySpecialityById(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;

        let {militarySpeciality} = req.body;
        const {id} = req.params;

        this.militarySpecialityService.update(militarySpeciality, id).then(() => {
            this.militarySpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        });
    }

    deleteMilitarySpecialityById(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        const {id} = req.params;

        this.militarySpecialityService.delete(id).then(() => {
            this.militarySpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        })
    }

    createMilitarySpeciality(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        let {militarySpeciality} = req.body;
        this.militarySpecialityService.createMilitarySpeciality(militarySpeciality)
            .then(() => {
                this.militarySpecialityService.findAll().then((enr) => {
                    res.status(200).json(enr).end();
                });
            });
    }
}
