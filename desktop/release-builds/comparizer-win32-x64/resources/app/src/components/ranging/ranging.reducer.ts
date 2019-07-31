import {
    ADD_RANGING,
    LOADING_RANGING
} from "./ranging.constant";
import {formatDate} from '../../helpers/formatDate';

export const initialState = {
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
        case (ADD_RANGING): {

            console.log('rangingReducer 1');
            console.log(action.payload);

            const ranging = action.payload.map((element: any) => {
                const key = typeof element._id === 'string' ? element._id : element._id.$oid;
                const date = typeof element.date === 'string' && element.date !== '' ? formatDate(new Date(element.date)) : formatDate(new Date(element.date.$date));
                const recommendationsMilitarySpeciality = element.recommendationsMilitarySpeciality.join(', ');

                return {
                    ...element,
                    key,
                    date,
                    recommendationsMilitarySpeciality
                }
            });

            console.log('rangingReducer 2');
            console.log(ranging);

            return {
                ...state,
                ranging,
                loadingRanging: false
            };
        }
        case (LOADING_RANGING): {
            return {
                ...state,
                loadingRanging: true
            };
        }
        default:
            return state;
    }
}