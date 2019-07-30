import {CANDIDATES_PAGE, SPECIALTY_PAGE} from "./routar-tab.constant";

const initialState = {
    isCandidates: false,
    isSpecialty: true,
    activeKey: '1'
};

export default function routerTabReducer(state = initialState, action: any) {
    switch (action.type) {
        case (CANDIDATES_PAGE): {
            return {
                ...state,
                isCandidates: true,
                isSpecialty: false,
                activeKey: '2'
            }
        }
        case (SPECIALTY_PAGE): {
            return {
                ...state,
                isCandidates: false,
                isSpecialty: true,
                activeKey: '1'
            }
        }
        default:
            return state;
    }
}