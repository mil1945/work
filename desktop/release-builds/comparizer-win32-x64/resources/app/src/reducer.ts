import {combineReducers} from 'redux';
import enrolleeReducer from './components/enrollee/enrollee.reducer';
import expertsReducer from "./components/experts/experts.reducer";
import rangingReducer from "./components/ranging/ranging.reducer";
import civilSpecialityReducer from "./components/civil-speciality/civil-speciality.reducer";
import militarySpecialityReducer from "./components/military-speciality/military-speciality.reducer";
import routerTabReducer from "./components/router-tab/router-tab.reducer"

export default combineReducers({
    enrolleeReducer,
    expertsReducer,
    rangingReducer,
    militarySpecialityReducer,
    civilSpecialityReducer,
    routerTabReducer
});
