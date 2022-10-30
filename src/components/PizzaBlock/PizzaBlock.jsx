import {useState} from "react";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../../redux/slices/cartSlice";

function PizzaBlock(p) {
    const dispatch = useDispatch()
    const [pizzaCount, setPizzaCount] = useState(0)
    const [currentSize, setCurrentSize] = useState(26)
    const [currentType, setCurrentType] = useState(0)

    let onAddPizzaToCart = () => {
        dispatch(addItemToCart({
            id: p.id,
            imageUrl: p.imageUrl,
            title: p.title,
            type: currentType,
            size: currentSize,
            price: p.price,
        }));
        setPizzaCount(pizzaCount+1)
    }
    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={p.imageUrl} alt="Pizza"/>
            <h4 className="pizza-block__title">{p.title}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {p.types.map((type, index)=> {
                            return(<li key={index}
                                       onClick={()=>{setCurrentType(index)}}
                                       className={currentType===index?'active':''}>{p.typesNames[type]}</li>)
                        })}
                </ul>
                <ul>
                    {p.sizes.map((size, index)=> {
                            return(<li key={index}
                                       onClick={()=>{setCurrentSize(size)}}
                                       className={currentSize===size?'active':''}>{size} см.
                            </li>)
                        })}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {p.price} ₽</div>
                <button onClick={onAddPizzaToCart} className="button button--outline button--add">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"/>
                    </svg>
                    <span>Добавить</span>
                    {pizzaCount>0&&<i>{pizzaCount}</i>}
                </button>
            </div>
        </div>
    );
}

export default PizzaBlock