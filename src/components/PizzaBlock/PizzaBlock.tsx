import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../redux/cart/cartSlice";
import {Link} from "react-router-dom";
import {PizzaItemType} from "../../redux/pizza/pizzaTypes";

type PizzaBlockProps = {
    item: PizzaItemType
    sizesNames: number[],
    typesNames: string[]
}
const PizzaBlock: React.FC<PizzaBlockProps> = ({item, sizesNames, typesNames}) => {
    const dispatch = useDispatch()
    const [pizzaCount, setPizzaCount] = useState(0)
    const [currentSize, setCurrentSize] = useState(item.sizes[0])
    const [currentType, setCurrentType] = useState(0)

    let onAddPizzaToCart = () => {
        dispatch(addItemToCart({
            id: item.id,
            imageUrl: item.imageUrl,
            title: item.title,
            type: currentType,
            size: currentSize,
            price: item.price,
            count:0
        }));
        setPizzaCount(pizzaCount + 1)
    }
    return (
        <div className="pizza-block">

            <Link to={`pizza/${item.id}`}> <img className="pizza-block__image" src={item.imageUrl} alt="Pizza"/></Link>
            <h4 className="pizza-block__title">{item.title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {item.types.map((type, index) => {
                        return (<li key={index}
                                    onClick={() => {
                                        setCurrentType(index)
                                    }}
                                    className={currentType === index ? 'active' : ''}>{typesNames[type]}</li>)
                    })}
                </ul>
                <ul>
                    {item.sizes.map((size, index) => {
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
                <div className="pizza-block__price">от {item.price} ₽</div>
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
    );
}

export default PizzaBlock