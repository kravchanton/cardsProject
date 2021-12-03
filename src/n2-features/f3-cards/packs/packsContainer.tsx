import {FormEvent, useEffect, useState} from "react";
import {addPackTC, getPacksTC, setPackNameForSearch, setPageForPagination} from "./packsReducer";
import {Packs} from "./packs";
import {useDispatch} from "react-redux";


export const PacksContainer = () => {

    const [name, setName] = useState<string>('')
    const [packName, setPackName] = useState<string>('')
    const dispatch = useDispatch()
    const addPack = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addPackTC(name));
        setName('');

    }

    const setPage = (page: number) => {
        dispatch(setPageForPagination(page))
        dispatch(getPacksTC())
    }
    useEffect(() => {
        setTimeout(() => {
            dispatch(setPackNameForSearch(packName))
            dispatch(setPageForPagination(1))
            dispatch(getPacksTC())
        }, 0)
    }, [packName])



    return <Packs setName={setName} name={name} addPack={addPack} packName={packName} setPackName={setPackName} setPage={setPage}/>
}