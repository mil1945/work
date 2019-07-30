import {ADD_MILITARY_SPECIALITY} from "./military-speciality.constant";

const addMilitarySpecialityAction = (data: any) => ({
    type: ADD_MILITARY_SPECIALITY,
    payload: data
});

export function addMilitarySpeciality(militarySpeciality: any) {
    return (dispatch: any) => {
        dispatch(addMilitarySpecialityAction(militarySpeciality));
    }
}
