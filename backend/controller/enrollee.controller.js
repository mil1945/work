import EnrolleeService from '../service/enrollee.service.js';

export default class EnrolleeController {
    constructor() {
    }

    allEnrollee(req, res) {
        this.enrolleeService = new EnrolleeService;
        this.enrolleeService.findAll().then((enr) => {
            res.status(200).json(enr).end();
        });
    }

    updateEnrolleeById(req, res) {
        this.enrolleeService = new EnrolleeService;

        let {enrollee} = req.body;
        const {id} = req.params;

        this.enrolleeService.update(enrollee, id).then(() => {
            this.enrolleeService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        });
    }

    deleteEnrolleeById(req, res) {
        this.enrolleeService = new EnrolleeService;
        const {id} = req.params;

        this.enrolleeService.delete(id).then(() => {
            this.enrolleeService.findAll().then((enr) => {
                res.status(200).json(enr).end();
            });
        })
    }

    createEnrollee(req, res) {
        this.enrolleeService = new EnrolleeService;
        let {enrollee} = req.body;

        console.log('createEnrollee');
        console.log(enrollee);

        this.enrolleeService.createEnrollee(enrollee)
            .then(() => {
                this.enrolleeService.findAll().then((enr) => {
                    console.log('createEnrollee findAll');
                    console.log(enr);

                    res.status(200).json(enr).end();
                });
            });
    }
}
