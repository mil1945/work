import {
    ADD_RANGING
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
};

export default function rangingReducer(state = initialState, action: any) {
    switch (action.type) {
        case (ADD_RANGING): {
            const ranging = action.payload.map((element: any) => {
                const key = typeof element._id === 'string' ? element._id : element._id.$oid;
                const date = typeof element.date === 'string' ? element.date : new Date(element.date.$date).getTime();

                return {
                    ...element,
                    key,
                    date,
                }
            });

            return {
                ...state,
                ranging
            }
        }
        default:
            return state;
    }
}