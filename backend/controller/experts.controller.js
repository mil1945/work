import ExpertsService from '../service/experts.service.js';

export default class ExpertsController {
    constructor() {
    }

    allExperts(req, res) {
        this.expertsService = new ExpertsService;
        this.expertsService.findAll().then((enr) => {
            res.status(200).json(enr).end();
        });
    }

    updateExpertsById(req, res) {
        this.expertsService = new ExpertsService;

        let {experts} = req.body;
        const {id} = req.params;

        this.expertsService.update(experts, id).then(() => {
            this.expertsService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        });
    }

    deleteExpertsById(req, res) {
        this.expertsService = new ExpertsService;
        const {id} = req.params;

        this.expertsService.delete(id).then(() =>{
            this.expertsService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        })
    }

    createExperts(req, res) {
        this.expertsService = new ExpertsService;
        let {experts} = req.body;

        this.expertsService.createExperts(experts)
            .then((enr) => {
                this.expertsService.findAll().then((enr) => {
                    res.status(200).json(enr).end();
                });
            });
    }
}