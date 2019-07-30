import {ADD_EXPERTS} from "./experts.constant";

const addExpertsAction = (data: any) => ({
    type: ADD_EXPERTS,
    payload: data
});

export function addExperts(experts: any) {
    return (dispatch: any) => {
        dispatch(addExpertsAction(experts));
    }
}
