const INDICATORS = {
    educationLevel: 0,
    healthStatus: 0,
    physicalStatus: 0,
    profPsychStatus: 0,
    socialSelectionStatus: 0
};

export const getIntegralIndex = (enrollee, averageMark) => {
    const sumExpertMarks = Object.values(averageMark).reduce((averageMark, averageMarkElement) => averageMark + averageMarkElement, 0);
    const weights = Object.values(averageMark).map(ExpertMark => ExpertMark / sumExpertMarks);

    return enrollee.map(enrollee => {
        return Object.keys(INDICATORS).reduce((indicators, indicatorElement, index) => {
            return indicators + enrollee[indicatorElement] * weights[index];
        }, 0);
    });
};

export default getIntegralIndex;