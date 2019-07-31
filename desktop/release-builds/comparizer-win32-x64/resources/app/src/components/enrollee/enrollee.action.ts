import {ADD_ENROLLEE, LOADING_ENROLLEE} from "./enrollee.constant";

const addEnrolleeAction = (data: any) => ({
    type: ADD_ENROLLEE,
    payload: data
});

const isLoadingEnrolleeAction = () => ({
    type: LOADING_ENROLLEE,
});

export function addEnrollee(enrollee: any) {
    return (dispatch: any) => {
        dispatch(addEnrolleeAction(enrollee));
    }
}

export function isLoadingEnrollee() {
    return (dispatch: any) => {
        dispatch(isLoadingEnrolleeAction());
    }
}