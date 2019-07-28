import MilitarySpecialityService from '../service/military-speciality.service.js';
import {getTranslate} from "../utils/yandex-translate.util";
import MilitarySpecialityEnService from "../service/military-speciality-en.service";

export default class MilitarySpecialityController {
    constructor() {
    }

    allMilitarySpeciality(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityService.findAll().then((enr) => {
            res.status(200).json(enr).end();
        });
    }

    async updateMilitarySpecialityById(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityEnService = new MilitarySpecialityEnService;

        let {militarySpeciality} = req.body;
        const {id} = req.params;

        let translate = militarySpeciality.competenceMilitarySpeciality.reduce((res, militarySpeciality) => {
            const translate = getTranslate(militarySpeciality);
            res.push(translate);
            return res;
        }, []);

        translate = await Promise.all(translate);
        translate = translate.map(elem => elem[0]);

        this.militarySpecialityService.update(militarySpeciality, id).then(() => {
            this.militarySpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });

            this.militarySpecialityService.getByData(militarySpeciality).then(militarySpeciality => {

                console.log('militarySpeciality');
                console.log(militarySpeciality);

                this.militarySpecialityEnService.update({
                    codeMilitarySpecialityEn: militarySpeciality.codeMilitarySpeciality,
                    competenceMilitarySpecialityEn: translate
                }, militarySpeciality.idMilitarySpecialityEn)
                    .then(() => {
                        this.militarySpecialityEnService.findAll().then((enr) => { // delete
                            console.log(enr)
                        });
                    });
            });
        });
    }

    deleteMilitarySpecialityById(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityEnService = new MilitarySpecialityEnService;

        const {id} = req.params;

        this.militarySpecialityService.getById(id).then((militarySpeciality) => {
            this.militarySpecialityEnService.delete(militarySpeciality.idMilitarySpecialityEn).then(() => {
                this.militarySpecialityEnService.findAll().then((result) => {
                    console.log(result);
                });

                this.militarySpecialityService.delete(id).then(() => {
                    this.militarySpecialityService.findAll().then((enr) => {
                        res.status(200).json(enr).end();
                    });
                })
            });
        });
    }

    async createMilitarySpeciality(req, res) {
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityEnService = new MilitarySpecialityEnService;

        let {militarySpeciality} = req.body;

        let translate = militarySpeciality.competenceMilitarySpeciality.reduce((res, militarySpeciality) => {
            const translate = getTranslate(militarySpeciality);
            res.push(translate);
            return res;
        }, []);

        translate = await Promise.all(translate);
        translate = translate.map(elem => elem[0]);

        this.militarySpecialityEnService.createMilitarySpecialityEn({
            codeMilitarySpecialityEn: militarySpeciality.codeMilitarySpeciality,
            competenceMilitarySpecialityEn: translate,
        }).then((militarySpecialityEn) => {
            militarySpeciality['idMilitarySpecialityEn'] = militarySpecialityEn._id;
            this.militarySpecialityService.createMilitarySpeciality(militarySpeciality)
                .then(() => {
                    this.militarySpecialityService.findAll().then((enr) => {
                        res.status(200).json(enr).end();
                    });
                });
        });
    }
}
