import CivilSpecialityService from '../service/civil-speciality.service.js';
import CivilSpecialityEnService from '../service/civil-speciality-en.service.js';
import {getTranslate} from "../utils/yandex-translate.util";

export default class CivilSpecialityController {
    constructor() {
    }

    allCivilSpeciality(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        this.civilSpecialityService.findAll().then((enr) => {
            res.status(200).json(enr).end();
        });
    }

    async updateCivilSpecialityById(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        this.civilSpecialityEnService = new CivilSpecialityEnService;

        let {civilSpeciality} = req.body;
        const {id} = req.params;

        console.log('civilSpeciality');
        console.log(civilSpeciality);

        let translate = civilSpeciality.competenceCivilSpeciality.reduce((res, civilSpeciality) => {
            const translate = getTranslate(civilSpeciality);
            res.push(translate);
            return res;
        }, []);

        translate = await Promise.all(translate);
        translate = translate.map(elem => elem[0]);

        this.civilSpecialityService.update(civilSpeciality, id).then(() => {
            this.civilSpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });

            this.civilSpecialityService.getByData(civilSpeciality).then(civilSpeciality => {
                this.civilSpecialityEnService.update({
                    codeCivilSpecialityEn: civilSpeciality.codeCivilSpeciality,
                    competenceCivilSpecialityEn: translate
                }, civilSpeciality.idCivilSpecialityEn)
                    .then(() => {
                        this.civilSpecialityEnService.findAll().then((enr) => { // delete
                            console.log(enr)
                        });
                    });
            });
        });
    }

    deleteCivilSpecialityById(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        this.civilSpecialityEnService = new CivilSpecialityEnService;

        const {id} = req.params;

        this.civilSpecialityService.getById(id).then(civilSpeciality => {
            this.civilSpecialityEnService.delete(civilSpeciality.idCivilSpecialityEn).then(() => {
                this.civilSpecialityEnService.findAll().then((result) => {
                    console.log(result);
                });

                this.civilSpecialityService.delete(id).then(() => {
                    this.civilSpecialityService.findAll().then((enr) => {
                        res.status(200).json(enr).end();
                    });
                });
            })
        });
    }

    async createCivilSpeciality(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        this.civilSpecialityEnService = new CivilSpecialityEnService;

        let {civilSpeciality} = req.body;

        let translate = civilSpeciality.competenceCivilSpeciality.reduce((res, civilSpeciality) => {
            const translate = getTranslate(civilSpeciality);
            res.push(translate);
            return res;
        }, []);

        translate = await Promise.all(translate);
        translate = translate.map(elem => elem[0]);

        this.civilSpecialityEnService.createCivilSpecialityEn({
            codeCivilSpecialityEn: civilSpeciality.codeCivilSpeciality,
            competenceCivilSpecialityEn: translate
        }).then((civilSpecialityEn) => {
            console.log('res create');
            console.log(civilSpecialityEn);
            civilSpeciality['idCivilSpecialityEn'] = civilSpecialityEn._id;
            this.civilSpecialityService.createCivilSpeciality(civilSpeciality)
                .then(() => {
                    this.civilSpecialityService.findAll().then((enr) => {
                        res.status(200).json(enr).end();
                    });
                });
        })
    }
}
