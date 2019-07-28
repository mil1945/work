import EnrolleeService from "../service/enrollee.service";
import RangingUtils from "../utils/ranging.utils";
import RangingService from "../service/ranging.service";
import CivilSpecialityService from "../service/civil-speciality.service";
import CivilSpecialityEnService from "../service/civil-speciality-en.service";
import ExpertsService from "../service/experts.service";
import MilitarySpecialityService from "../service/military-speciality.service";
import MilitarySpecialityEnService from "../service/military-speciality-en.service";

export default class UtilController {
    constructor() {
    }

    async clearAll(req, res) {
        this.enrolleeService = new EnrolleeService;
        this.rangingService = new RangingService;
        this.civilSpecialityService = new CivilSpecialityService;
        this.civilSpecialityEnService = new CivilSpecialityEnService;
        this.expertsService = new ExpertsService;
        this.militarySpecialityService = new MilitarySpecialityService;
        this.militarySpecialityEnService = new MilitarySpecialityEnService;

        await this.enrolleeService.deleteAll();
        const enrollee = await this.enrolleeService.findAll();

        await this.rangingService.deleteAll();
        const ranging = await this.rangingService.findAll();

        await this.civilSpecialityService.deleteAll();
        const civilSpeciality = await this.civilSpecialityService.findAll();

        await this.civilSpecialityEnService.deleteAll();
        const civilSpecialityEn = await this.civilSpecialityEnService.findAll();

        await this.expertsService.deleteAll();
        const experts = await this.expertsService.findAll();

        await this.militarySpecialityService.deleteAll();
        const militarySpeciality = await this.militarySpecialityService.findAll();

        await this.militarySpecialityEnService.deleteAll();
        const militarySpecialityEn = await this.militarySpecialityEnService.findAll();

        const rangingDataDB = await this.rangingService.findAll();
        res.status(200).json({
            enrollee,
            ranging,
            civilSpeciality,
            civilSpecialityEn,
            experts,
            militarySpeciality,
            militarySpecialityEn
        }).end();
    }
}
