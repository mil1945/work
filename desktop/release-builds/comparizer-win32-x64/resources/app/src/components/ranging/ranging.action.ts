import {ADD_RANGING, LOADING_RANGING} from "./ranging.constant";

export const addRangingAction = (data: any) => ({
    type: ADD_RANGING,
    payload: data
});

export const isLoadingAction = () => ({
    type: LOADING_RANGING,
});

export function addRanging(ranging: any) {

    console.log('addRanging action');
    console.log(ranging);

    return (dispatch: any) => {
        dispatch(addRangingAction(ranging));
    }
}

export function isLoadingRanging() {
    return (dispatch: any) => {
        dispatch(isLoadingAction());
    }
}