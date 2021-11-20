import {CardsType, packsAPI, PacksType} from "./packsApi";
import {Dispatch} from "redux";
import {InitialProfileType} from "../../../n1-main/m2-bll/profileReducer";
import {setIsError} from "../../../n1-main/m2-bll/authReducer";


export let initialState: PacksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}


export const packsReducer = (state: PacksType = initialState, action: ActionsType): PacksType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {
                ...state, cardPacks: [...action.cardPacks],
                cardPacksTotalCount: action.cardPacksTotalCount,
                maxCardsCount: action.maxCardsCount,
                minCardsCount: action.minCardsCount,
                page: action.page,
                pageCount: action.pageCount

            }
        default:
            return {...state}
    }

}
export const setPacks = (data: PacksType) => {
    const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount} = data
    return ({type: 'packs/SET-PACKS', cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount} as const)
}

export type SetPacksType = ReturnType<typeof setPacks>
type ActionsType = SetPacksType

export const getPacksTC = () => {
    return(dispatch: Dispatch<ActionsType>) => {
    packsAPI.getCards().then(res => {
        dispatch(setPacks(res.data))
    })
}
}

export const addPackTC = (name: string) => {
    return (dispatch: Dispatch<any>) => {
        packsAPI.postCards(name).then((res) =>
        {dispatch(getPacksTC())})
            .catch(e => {
                    e.response ? dispatch(setIsError(e.response.data.error))
                        : dispatch(setIsError(e.message + ', more details in the console'));
                }
            )
    }
}

