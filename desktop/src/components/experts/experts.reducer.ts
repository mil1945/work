import {ADD_EXPERTS} from "./experts.constant";

const emptyExperts = {
    healthStatus : '',
    physicalStatus: '',
    profPsychStatus: '',
    socialSelectionStatus: '',
    educationLevel: ''
};

const initialState = {
    experts: [
        {
            healthStatus: '',
            physicalStatus: '',
            profPsychStatus: '',
            socialSelectionStatus: '',
            educationLevel: ''
        },
    ],
};

export default function expertsReducer(state = initialState, action: any) {
    switch (action.type) {
        case (ADD_EXPERTS): {
            const experts = action.payload.reduce((res: any, elem: any) => {
                if (!elem.hasOwnProperty('_id')) {
                    return res;
                }

                res.push(elem);
                return res;
            }, []);

            experts.unshift(emptyExperts);
            return {
                ...state,
                experts
            }
        }
        default:
            return state;
    }
}
