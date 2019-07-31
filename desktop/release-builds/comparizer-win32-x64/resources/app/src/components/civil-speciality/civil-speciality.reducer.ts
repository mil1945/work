import {ADD_CIVIL_SPECIALITY} from "./civil-speciality.constant";

const emptyCivilSpeciality = {
    codeCivilSpeciality : '',
    nameCivilSpeciality: '',
    competenceCivilSpeciality: [],
};

const initialState = {
    civilSpeciality: [
        {
            codeCivilSpeciality : '',
            nameCivilSpeciality: '',
            competenceCivilSpeciality: [],
        },
    ],
};

export default function civilSpecialityReducer(state = initialState, action: any) {
    switch (action.type) {
        case (ADD_CIVIL_SPECIALITY): {
            const civilSpeciality = action.payload.reduce((res: any, elem: any) => {
                if (!elem.hasOwnProperty('_id')) {
                    return res;
                }

                res.push(elem);
                return res;
            }, []);

            civilSpeciality.unshift(emptyCivilSpeciality);
            return {
                ...state,
                civilSpeciality
            }
        }
        default:
            return state;
    }
}
