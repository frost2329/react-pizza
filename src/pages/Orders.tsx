import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectOrdersData, selectPizzaData} from "../redux/selectors";
import React, {useEffect, useState} from "react";
import {fetchOrders} from "../redux/orders/ordersSlice";
import {useAppDispatch} from "../redux/store";
import s from './Orders.module.scss';
import styles from "./NotFound.module.scss";

const Orders: React.FC = () => {
    const dispatch = useAppDispatch()
    const ordersState = useSelector(selectOrdersData)
    const {typesNames} = useSelector(selectPizzaData)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    if (ordersState.orders.length <= 0) {
        return <div className={styles.root}>
            <h1>
                <span>😢 </span>
                <br/>
                У вас пока еще нет заказов
            </h1>
            <p className={styles.description}>
                Исправте это немедленно
            </p>
        </div>
    }
    return <div className="content">
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        История заказов
                    </h2>
                </div>
                <div>
                    {ordersState.orders
                        .map((order: any) => {
                            return (
                                <div key={order.id} className={s.orderBlock}>
                                    <div className={s.orderTop}>
                                        <span className={s.orderNumber}>{`#${order.id}`}</span>
                                        <span>{` Сумма заказа ${order.totalSum} Р`}</span>
                                    </div>
                                    <div className={"order-items"}>
                                        {order.items.map((item: any, index:number) => {
                                            return (
                                                <div key={index} className={`cart__item ${s.orderItem}`}>
                                                    <div className={s.itemLeft}>
                                                        <div className={`cart__item-img ${s.itemImg}`}>
                                                            <img className="pizza-block__image" src={item.imageUrl}
                                                                 alt="Pizza"/>
                                                        </div>
                                                        <div className={s.itemInfo}>
                                                            <h3>{item.title}</h3>
                                                            <p>{`${typesNames[item.type]} размер ${item.size}`}</p>
                                                        </div>
                                                    </div>
                                                    <div className="cart__item-count">
                                                        <b>{item.count} шт</b>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link to="/" className="button button--outline button--add go-back-btn">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Orders