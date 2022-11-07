import React, {useEffect} from 'react';
import styles from './FullPizza.module.scss';
import {fetchPizzaById} from "../redux/slices/pizzasSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {selectPizzaData} from "../redux/slices/selectors";

const FullPizza = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const {typesNames, fullPizza, status} = useSelector(selectPizzaData)

    useEffect(() => {
        if (params.id) {
            dispatch(fetchPizzaById(params.id))
        }

    }, [])

    if (status === 'pending' || !fullPizza) {
        return <div>Загрузка...</div>
    }
    debugger
    return (
        <div className={styles.root}>
            <div className={styles.imageBlock}>
                <img src={fullPizza.imageUrl} alt="Pizza"/>
            </div>
            <div  className={styles.descriptionBlock}>
                <h1>{fullPizza.title}</h1>
                <div className={styles.types}>
                    {fullPizza.types.map((type, index) => {
                        return (<li key={index}>{typesNames[type]}</li>)
                    })}
                </div>
                <div className={styles.types}>
                    {fullPizza.sizes.map((size, index) => {
                        return (<li key={index}>{size} см.</li>)
                    })}
                </div>
            </div>
        </div>
    )
};

export default FullPizza;
