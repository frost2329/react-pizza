import React, {useEffect} from 'react';
import styles from './FullPizza.module.scss';
import {fetchPizzaById} from "../redux/pizza/pizzasSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {selectPizzaData} from "../redux/slices/selectors";
import {Status} from "../redux/pizza/pizzaTypes";

const FullPizza = () => {
    const dispatch = useAppDispatch();
    const {typesNames, fullPizza, status} = useSelector(selectPizzaData)
    const {id} = useParams();
    if (!fullPizza.id && id) {
        dispatch(fetchPizzaById(id))
    }
    if (status === Status.LOADING || !fullPizza) {
        return <div>Загрузка...</div>
    } else
        return (
            <div className={styles.root}>
                <div className={styles.imageBlock}>
                    <img src={fullPizza.imageUrl} alt="Pizza"/>
                </div>
                <div className={styles.descriptionBlock}>
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
