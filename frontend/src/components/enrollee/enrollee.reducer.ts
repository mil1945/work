import {ADD_ENROLLEE} from "./enrollee.constant";

const emptyErollee = {
    fullName: '',
    healthStatus : '',
    physicalStatus: '',
    profPsychStatus: '',
    socialSelectionStatus: '',
    educationLevel: '',
    civilSpeciality: 0
};

const initialState = {
    enrollee: [
        {
            fullName: '',
            healthStatus : '',
            physicalStatus: '',
            profPsychStatus: '',
            socialSelectionStatus: '',
            educationLevel: '',
            civilSpeciality: 0
        },
    ],
};

export default function enrolleeReducer(state = initialState, action: any) {
    switch (action.type) {
        case (ADD_ENROLLEE): {
            const enrollee = action.payload.reduce((res: any, elem: any) => {
                if (!elem.hasOwnProperty('_id')) {
                    return res;
                }

                res.push(elem);
                return res;
            }, []);

            enrollee.unshift(emptyErollee);

            return {
                ...state,
                enrollee
            }
        }
        default:
            return state;
    }
}
