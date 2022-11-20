import React, {useState} from 'react';
import styles from './FullPizza.module.scss';
import {fetchPizzaById} from "../redux/pizza/pizzasSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {selectPizzaData} from "../redux/selectors";
import {Status} from "../redux/pizza/pizzaTypes";
import {addItemToCart} from "../redux/cart/cartSlice";

const FullPizza:React.FC = () => {
    const dispatch = useAppDispatch();
    const {typesNames, fullPizza, status} = useSelector(selectPizzaData)
    const {id} = useParams();
    const [pizzaCount, setPizzaCount] = useState(0)
    const [currentSize, setCurrentSize] = useState(26)
    const [currentType, setCurrentType] = useState(0)
    let onAddPizzaToCart = () => {
        dispatch(addItemToCart({
            id: fullPizza.id,
            imageUrl: fullPizza.imageUrl,
            title: fullPizza.title,
            type: currentType,
            size: currentSize,
            price: fullPizza.price,
            count:0
        }));
        setPizzaCount(pizzaCount + 1)
    }
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
                    <div className="pizza-block__selector">
                        <ul>
                            {fullPizza.types.map((type, index) => {
                                return (<li key={index}
                                            onClick={() => {
                                                setCurrentType(index)
                                            }}
                                            className={currentType === index ? 'active' : ''}>{typesNames[type]}</li>)
                            })}
                        </ul>
                        <ul>
                            {fullPizza.sizes.map((size, index) => {
                                return (<li key={index}
                                            onClick={() => {
                                                setCurrentSize(size)
                                            }}
                                            className={currentSize === size ? 'active' : ''}>{size} см.
                                </li>)
                            })}
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">от {fullPizza.price} ₽</div>
                        <button onClick={onAddPizzaToCart} className="button button--outline button--add">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"/>
                            </svg>
                            <span>Добавить</span>
                            {pizzaCount > 0 && <i>{pizzaCount}</i>}
                        </button>
                    </div>
                </div>
            </div>
        )
};

export default FullPizza;
