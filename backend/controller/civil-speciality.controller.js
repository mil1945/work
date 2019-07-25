import CivilSpecialityService from '../service/civil-speciality.service.js';
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

    updateCivilSpecialityById(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;

        let {civilSpeciality} = req.body;
        const {id} = req.params;

        this.civilSpecialityService.update(civilSpeciality, id).then(() => {
            this.civilSpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        });
    }

    deleteCivilSpecialityById(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        const {id} = req.params;

        this.civilSpecialityService.delete(id).then(() => {
            this.civilSpecialityService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        })
    }

    async createCivilSpeciality(req, res) {
        this.civilSpecialityService = new CivilSpecialityService;
        let {civilSpeciality} = req.body;

        this.civilSpecialityService.createCivilSpeciality(civilSpeciality)
            .then(() => {
                this.civilSpecialityService.findAll().then((enr) => {
                    res.status(200).json(enr).end();
                });
            });

        let translate = civilSpeciality.competenceCivilSpeciality.reduce((res, civilSpeciality) => {
            const translate = getTranslate(civilSpeciality);
            res.push(translate);
            return res;
        }, []);

        translate = await Promise.all(translate);
        translate = translate.map(elem => elem[0]);

        his.civilSpecialityService.createCivilSpecialityEn({
            codeCivilSpecialityEn: civilSpeciality.codeCivilSpeciality,
            competenceCivilSpeciality: translate
        })
    }
}
