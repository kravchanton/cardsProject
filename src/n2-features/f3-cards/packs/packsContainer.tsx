import {FormEvent, useEffect, useState} from "react";
import {addPackTC, getPacksTC} from "./packsReducer";
import {Packs} from "./packs";
import {useDispatch} from "react-redux";
import {LoginTC} from "../../../n1-main/m2-bll/authReducer";


export const PacksContainer = () => {

    const [name, setName] = useState<string>('')
    const [packName, setPackName] = useState<string>('')
    const dispatch = useDispatch()
    const addPack = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addPackTC(name));
        setName('');

    }
    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    return <Packs setName={setName} name={name} addPack={addPack}/>
}