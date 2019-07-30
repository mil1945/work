import RangingService from "../service/ranging.service";
import {ORDER} from "../constant/ranging.constant";

export default class UtilController {
    constructor() {
    }

    async getFilterData(req, res) {
        this.rangingService = new RangingService;
        const {fieldName, sortType} = req.params;

        console.log(fieldName, sortType, ORDER[sortType]);

        const data = fieldName === 'undefined' || sortType === 'undefined' ?
            await this.rangingService.findAll() :
            await this.rangingService.filter(fieldName, ORDER[sortType]);

        res.status(200).json({rangingData: data}).end();
    }
}
