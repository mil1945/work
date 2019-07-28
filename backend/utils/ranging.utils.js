const INDICATORS = {
    educationLevel: 0,
    healthStatus: 0,
    physicalStatus: 0,
    profPsychStatus: 0,
    socialSelectionStatus: 0
};

export default class RangingUtils {
    constructor(averageMark, enrollee) {
        this.sumExpertMarks = Object.values(averageMark).reduce((averageMark, averageMarkElement) => averageMark + averageMarkElement, 0);
        this.weights = Object.values(averageMark).map(expertMark => expertMark / this.sumExpertMarks);
        this.enrollee = enrollee;
    }

    getRangingData() {
        const integralIndex = this.getIntegralIndex();
        const rangEnrollee = this.getRangEnrollee();

        return this.enrollee.map((enrollee, index) => ({
                fullName: enrollee.fullName,
                date: enrollee.initialDate,
                rang: rangEnrollee[index],
                integralIndex: integralIndex[index],
                recommendationsMilitarySpeciality: 0,
                recommendationsSubdivision: 0,
                idEnrollee: enrollee._id
        }));
    }

    getRangEnrollee() {
        const sumEnrolleeParam = this.enrollee.reduce((sumEnrolleeParam, enrolleeParamElement) => {
            Object.entries(sumEnrolleeParam).forEach(param => {
                sumEnrolleeParam[param[0]] += +enrolleeParamElement[param[0]];
            });

            return sumEnrolleeParam
        }, {
            healthStatus: 0,
            physicalStatus: 0,
            profPsychStatus: 0,
            socialSelectionStatus: 0,
            educationLevel: 0,
        });

        const healthStatusPriority = this.enrollee.map(enrollee => enrollee.healthStatus / sumEnrolleeParam.healthStatus);
        const educationLevelPriority =  this.enrollee.map(enrollee => enrollee.educationLevel / sumEnrolleeParam.educationLevel);
        const physicalStatusPriority =  this.enrollee.map(enrollee => enrollee.physicalStatus / sumEnrolleeParam.physicalStatus);
        const profPsychStatusPriority =  this.enrollee.map(enrollee => enrollee.profPsychStatus / sumEnrolleeParam.profPsychStatus);
        const socialSelectionStatusPriority =  this.enrollee.map(enrollee => enrollee.socialSelectionStatus / sumEnrolleeParam.socialSelectionStatus);

        const fullPriorityMatrix = [
            healthStatusPriority,
            physicalStatusPriority,
            profPsychStatusPriority,
            socialSelectionStatusPriority,
            educationLevelPriority,
        ];

        return fullPriorityMatrix.reduce((rangEnrollee, priorityMarkElement, index) => {
            priorityMarkElement = priorityMarkElement.map(priorityMark => priorityMark * this.weights[index]);
            rangEnrollee = rangEnrollee.map((priorityMark, i) => +(priorityMark + priorityMarkElement[i]).toFixed(3));

            return rangEnrollee;
        }, new Array(educationLevelPriority.length).fill(0));
    };

    getIntegralIndex() {
        return this.enrollee.map(enrollee => {
            return Object.keys(INDICATORS).reduce((indicators, indicatorElement, index) => {
                return +(indicators + enrollee[indicatorElement] * this.weights[index]).toFixed(3);
            }, 0);
        });
    };
}