import {applyMiddleware, combineReducers, createStore} from "redux";
import {testReducer} from "./test-reducer";
import thunkMiddleware from "redux-thunk";
import {registrationReducer} from "./registrationReducer";
import {recoveryReducer} from "./recovery-reducer";
import {authReducer} from "./authReducer";
import {profileReducer} from "./profileReducer";
import {packsReducer} from "../../n2-features/f3-cards/packs/packsReducer";

const reducers = combineReducers({
    testReducer: testReducer,
    registration: registrationReducer,
    recoveryPassword: recoveryReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer

})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev