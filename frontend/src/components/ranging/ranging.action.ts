import {ADD_RANGING, LOADING_RANGING} from "./ranging.constant";

const addRangingAction = (data: any) => ({
    type: ADD_RANGING,
    payload: data
});

const isLoadingAction = () => ({
    type: LOADING_RANGING,
});

export function addRanging(ranging: any) {
    return (dispatch: any) => {
        dispatch(addRangingAction(ranging));
    }
}

export function isLoadingRanging() {
    return (dispatch: any) => {
        dispatch(isLoadingAction());
    }
}