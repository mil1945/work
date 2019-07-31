import {ADD_MILITARY_SPECIALITY} from "./military-speciality.constant";

const emptyMilitarySpeciality = {
    codeMilitarySpeciality : '',
    nameMilitarySpeciality: '',
    competenceMilitarySpeciality: [],
};

const initialState = {
    militarySpeciality: [
        {
            codeMilitarySpeciality : '',
            nameMilitarySpeciality: '',
            competenceMilitarySpeciality: [],
        },
    ],
};

export default function militarySpecialityReducer(state = initialState, action: any) {
    switch (action.type) {
        case (ADD_MILITARY_SPECIALITY): {
            const militarySpeciality = action.payload.reduce((res: any, elem: any) => {
                if (!elem.hasOwnProperty('_id')) {
                    return res;
                }

                res.push(elem);
                return res;
            }, []);

            militarySpeciality.unshift(emptyMilitarySpeciality);
            return {
                ...state,
                militarySpeciality
            }
        }
        default:
            return state;
    }
}
