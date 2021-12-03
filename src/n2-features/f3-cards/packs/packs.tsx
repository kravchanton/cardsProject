import s from './packs.module.scss'
import {ChangeEvent, FormEvent, MouseEventHandler, useEffect} from "react";
import {getPacksTC, PacksType} from "./packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export type PacksPropsType = {
    setName: (s: string) => void
    name: string
    addPack: (e: FormEvent<HTMLFormElement>) => void
    setPackName: (s: string) => void
    packName: string
    setPage: (t: number) => void
}
export const Packs = (props: PacksPropsType) => {

const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount} = useSelector<AppStoreType, PacksType>(state => state.packs)
    function isoDate(msSinceEpoch: string) {
        let d = new Date(msSinceEpoch);
        return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCDate() +  ' T ' +
            d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
    }
    function pagination (page: number, pagesCount: number) {
        if(page === 1 && page+2 < pagesCount) {
            return [page, ++page, ++page]
        }
        else if(page === 2 && page+2 < pagesCount) {
            return [page-1, page, ++page, ++page]
        }
        else if(page > 2 && page+2 < pagesCount) {
            return [page -2, page-1, page, ++page, ++page]

        }
        else if(page > 2 && page+2 ===  pagesCount) {
            return [page -2, page-1, page, ++page, ++page]

        }
        else if(page > 2 && page+1 === pagesCount) {
            return [page -2, page-1, page]

        }
        else if(page > 2 && page === pagesCount) {
            return [page -2, page-1]

        }
        else {
            return []

        }
    }
    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    props.setName(e.currentTarget.value)
    }
    const searchPackName = (e: ChangeEvent<HTMLInputElement>) => {
    props.setPackName(e.currentTarget.value)
    }
let a;
    return <>
        <div className={s.addPacks}>
            <form onSubmit={props.addPack}><input value={props.name} onChange={changeName}/> <button>Add new pack</button></form></div>
        <div className={s.tableContainer}>
            <div><input type='search' placeholder='Search' value={props.packName} onChange={searchPackName}/></div>
            { cardPacks.map(t =>
            <div className={s.row}>
                <div>{t.name}</div>
                <div>{t.cardsCount}</div>
                <div>{isoDate(t.updated)}</div>
                <div>{'Created by'}</div>
            </div>
            )}
            <div className={s.pagination}> {pagination(page,pagesCount).map(t => <span onClick={() => props.setPage(t)}> {t} </span>)}... <span onClick={() => props.setPage(pagesCount)}>{pagesCount}</span></div>
        </div>

    </>
}