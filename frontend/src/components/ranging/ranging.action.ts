import {ADD_RANGING} from "./ranging.constant";

const addRangingAction = (data: any) => ({
    type: ADD_RANGING,
    payload: data
});

export function addRanging(ranging: any) {
    return (dispatch: any) => {
        dispatch(addRangingAction(ranging));
    }
}
