import {ADD_CIVIL_SPECIALITY} from "./civil-speciality.constant";

const addCivilSpecialityAction = (data: any) => ({
    type: ADD_CIVIL_SPECIALITY,
    payload: data
});

export function addCivilSpeciality(civilSpeciality: any) {
    return (dispatch: any) => {
        dispatch(addCivilSpecialityAction(civilSpeciality));
    }
}
