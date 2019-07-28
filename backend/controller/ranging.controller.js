import RangingService from "../service/ranging.service";

export default class UtilController {
    constructor() {
    }

    async getFilterData(req, res) {
        this.rangingService = new RangingService;
        const {fieldName, sortType} = req.params;
        console.log(fieldName, sortType);

        const data = await this.rangingService.filterAsc();

        res.status(200).json({data}).end();
    }
}
