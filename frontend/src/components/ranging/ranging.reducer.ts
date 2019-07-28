import {
    ADD_RANGING,
    LOADING_RANGING
} from "./ranging.constant";

const initialState = {
    ranging: [{
        key: '1',
        fullName: '',
        date: '',
        rang: 0,
        integralIndex: 0,
        recommendationsMilitarySpeciality: 0, // изменить
        recommendationsSubdivision: 0, // изменить
    }, ],
    loadingRanging: false
};

export default function rangingReducer(state = initialState, action: any) {
    switch (action.type) {
        case (LOADING_RANGING): {
            return {
                ...state,
                loadingRanging: true
            }
        }
        case (ADD_RANGING): {
            const ranging = action.payload.map((element: any) => {
                const key = typeof element._id === 'string' ? element._id : element._id.$oid;
                const date = typeof element.date === 'string' ? element.date : new Date(element.date.$date).getTime();
                const recommendationsMilitarySpeciality = element.recommendationsMilitarySpeciality.join(', ')

                return {
                    ...element,
                    key,
                    date,
                    recommendationsMilitarySpeciality
                }
            });

            return {
                ...state,
                ranging,
                loadingRanging: false
            }
        }
        default:
            return state;
    }
}