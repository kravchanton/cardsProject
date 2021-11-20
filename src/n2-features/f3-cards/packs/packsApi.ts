import axios from "axios";





const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const packsAPI = {
    getCards() {
        return instance.get<PacksType>('/cards/pack')
    },
    postCards(name: string) {
        return instance.post('/cards/pack', {cardsPack: {name}})

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
    type:  string
    created:  string
    updated:  string
    __v: number
}

export type PacksType = {
    cardPacks: CardsType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}