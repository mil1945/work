import {CANDIDATES_PAGE, SPECIALTY_PAGE} from "./routar-tab.constant";

const isCandidatesAction = () => ({
    type: CANDIDATES_PAGE,
});

const isSpecialtyAction = () => ({
    type: SPECIALTY_PAGE,
});

export function isCandidates() {
    return (dispatch: any) => {
        dispatch(isCandidatesAction());
    }
}

export function isSpecialty() {
    return (dispatch: any) => {
        dispatch(isSpecialtyAction());
    }
}