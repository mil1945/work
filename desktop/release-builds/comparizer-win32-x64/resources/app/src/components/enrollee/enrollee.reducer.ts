import {ADD_ENROLLEE, LOADING_ENROLLEE} from "./enrollee.constant";

const emptyErollee = {
    _id: null,
    fullName: '',
    healthStatus : '',
    physicalStatus: '',
    profPsychStatus: '',
    socialSelectionStatus: '',
    educationLevel: '',
    recommendationsMilitarySpeciality: [],
    civilSpeciality: 0
};

const initialState = {
    enrollee: [
        {
            _id: null,
            fullName: '',
            healthStatus : '',
            physicalStatus: '',
            profPsychStatus: '',
            socialSelectionStatus: '',
            educationLevel: '',
            recommendationsMilitarySpeciality: [],
            civilSpeciality: 0
        },
    ],
    isLoadingEnrolle: false
};

export default function enrolleeReducer(state = initialState, action: any) {
    switch (action.type) {
        case (LOADING_ENROLLEE): {
            return {
                ...state,
                isLoadingEnrolle: true
            }
        }
        case (ADD_ENROLLEE): {
            const enrollee = action.payload.reduce((res: any, elem: any) => {
                if (elem._id === null) {
                    return res;
                }
                elem._id = typeof elem._id === 'string' ? elem._id : elem._id.$oid;

                res.push(elem);
                return res;
            }, []);

            enrollee.unshift(emptyErollee);

            return {
                ...state,
                enrollee,
                isLoadingEnrolle: false
            }
        }
        default:
            return state;
    }
}
