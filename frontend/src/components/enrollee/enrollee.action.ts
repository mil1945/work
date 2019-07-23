import {ADD_ENROLLEE} from "./enrollee.constant";

const addEnrolleeAction = (data: any) => ({
    type: ADD_ENROLLEE,
    payload: data
});

export function addEnrollee(enrollee: any) {
    return (dispatch: any) => {
        dispatch(addEnrolleeAction(enrollee));
    }
}
