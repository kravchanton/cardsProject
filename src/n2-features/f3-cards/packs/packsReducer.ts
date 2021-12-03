import {packsAPI, PacksTypeResponse} from "./packsApi";
import {Dispatch} from "redux";
import {InitialProfileType} from "../../../n1-main/m2-bll/profileReducer";
import {setIsError} from "../../../n1-main/m2-bll/authReducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";


export let initialState: PacksType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 0,
    packName: ''

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

        case 'packs/SET-PACK-NAME':
            return {...state, packName: action.packName}
        case 'packs/SET-PAGE':
            return {...state, page: action.page}
        default:
            return {...state}
    }

}
export const setPacks = (data: PacksTypeResponse) => {
    const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount} = data
    return ({
        type: 'packs/SET-PACKS',
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount
    } as const)
}

export const setPackNameForSearch = (packName: string) => {
    return ({type: 'packs/SET-PACK-NAME', packName} as const)
}
export const setPageForPagination = (page: number) => {
    return ({type: 'packs/SET-PAGE', page} as const)
}

export type SetPacksType = ReturnType<typeof setPacks>
export type SetPackNameForSearchType = ReturnType<typeof setPackNameForSearch>
export type SetPageForPaginationType = ReturnType<typeof setPageForPagination>
type ActionsType = SetPacksType | SetPackNameForSearchType | SetPageForPaginationType

export const getPacksTC = () => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppStoreType) => {
        const state = getState()
        let packName = state.packs.packName
        let page = state.packs.page
        packsAPI.getCards(packName, page).then(res => {
            dispatch(setPacks(res.data))
        })
    }
}

export const addPackTC = (name: string) => {
    return (dispatch: Dispatch<any>, getState: () => AppStoreType) => {
        packsAPI.postCards(name).then((res) => {
            dispatch(getPacksTC())
        })
            .catch(e => {
                    e.response ? dispatch(setIsError(e.response.data.error))
                        : dispatch(setIsError(e.message + ', more details in the console'));
                }
            )
    }
}

export type CardsType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}

export type PacksType = {
    cardPacks: CardsType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    packName: string
}