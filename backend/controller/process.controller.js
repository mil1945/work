import EnrolleeService from "../service/enrollee.service";
import RangingUtils from "../utils/ranging.utils";
import RangingService from "../service/ranging.service";

export default class ProcessController {
    constructor() {
    }

    async createRangingData(req, res) {
        this.enrolleeService = new EnrolleeService;
        this.rangingService = new RangingService;

        const {averageMark} = req.body;
        const enrollee = await this.enrolleeService.findAll();

        this.rangingUtils = new RangingUtils(averageMark, enrollee);
        const rangingData = this.rangingUtils.getRangingData();

        await this.rangingService.deleteAll();
        const rangingDataArr = rangingData.map(rangingData => {
            return this.rangingService.createRanging(rangingData);
        });

        await Promise.all(rangingDataArr);

        const rangingDataDB = await this.rangingService.findAll();
        res.status(200).json({rangingData: rangingDataDB}).end();
    }

    getRangingData(req, res) {
        this.rangingService = new RangingService;
        this.rangingService.findAll().then((rang) => {
            res.status(200).json({rangingData: rang}).end();
        });
    }
}
