export const getRangEnrollee = (enrollee, averageMark) => {

    const sumExpertMarks = Object.values(averageMark).reduce((averageMark, averageMarkElement) => averageMark + averageMarkElement, 0);
    const weights = Object.values(averageMark).map(ExpertMark => ExpertMark / sumExpertMarks);

    const sumEnrolleeParam = enrollee.reduce((sumEnrolleeParam, enrolleeParamElement) => {
        Object.entries(sumEnrolleeParam).forEach(param => {
            sumEnrolleeParam[param[0]] += +enrolleeParamElement[param[0]];
        });

        return sumEnrolleeParam
    }, {
        educationLevel: 0,
        healthStatus: 0,
        physicalStatus: 0,
        profPsychStatus: 0,
        socialSelectionStatus: 0
    });

    const healthStatusPriority = enrollee.map(enrollee => enrollee.healthStatus / sumEnrolleeParam.healthStatus);
    const educationLevelPriority =  enrollee.map(enrollee => enrollee.educationLevel / sumEnrolleeParam.educationLevel);
    const physicalStatusPriority =  enrollee.map(enrollee => enrollee.physicalStatus / sumEnrolleeParam.physicalStatus);
    const profPsychStatusPriority =  enrollee.map(enrollee => enrollee.profPsychStatus / sumEnrolleeParam.profPsychStatus);
    const socialSelectionStatusPriority =  enrollee.map(enrollee => enrollee.socialSelectionStatus / sumEnrolleeParam.socialSelectionStatus);

    const fullPriorityMatrix = [
        educationLevelPriority,
        healthStatusPriority,
        physicalStatusPriority,
        profPsychStatusPriority,
        socialSelectionStatusPriority
    ];

    return fullPriorityMatrix.reduce((rangEnrollee, priorityMarkElement, index) => {
        priorityMarkElement = priorityMarkElement.map(priorityMark => priorityMark * weights[index]);
        rangEnrollee = rangEnrollee.map((priorityMark, i) => priorityMark + priorityMarkElement[i]);

        return rangEnrollee;
    }, new Array(educationLevelPriority.length).fill(0));
};

export default getRangEnrollee;