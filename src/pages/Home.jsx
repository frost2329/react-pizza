import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import Paginator from "../components/Paginator/Paginator";

import {useSelector, useDispatch} from 'react-redux'
import {setPizzas} from '../redux/slices/pizzasSlice'
import {setSort, setCategory} from '../redux/slices/filterSlice'

function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const pizzas = useSelector((state) => state.pizzas.items)

    let {currentSort, currentCategory, searchValue, currentPageNumber} = useSelector((state) => state.filter)
    useEffect(() => {
        setIsLoading(true)
        let sort = 'sortBy=' + (currentSort.sortProperty.replace('-', ''))
        let order = 'order=' + (currentSort.sortProperty.includes('-') ? 'desc' : 'asc')
        let category = currentCategory === 0 ? '' : 'category=' + currentCategory
        let limit = 'limit=' + 4
        let page = 'page=' + currentPageNumber
        let search = 'search=' + searchValue
        let url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items?${page}&${limit}&${category}&${sort}&${order}&${search}`;

        axios.get(url).then((res) => {
            dispatch(setPizzas(res.data))
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [currentSort, currentCategory, currentPageNumber, searchValue])

    return (<div className="content">
        <div className="container">
            <div className="content__top">
                <Categories currentCategory={currentCategory}
                            setCurrentCategory={(value) => dispatch(setCategory(value))}/>
                <Sort currentSort={currentSort} setCurrentSort={(value) => dispatch(setSort(value))}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, i) => <LoadingBlock key={i}/>)
                    : pizzas.map((obj) => <PizzaBlock key={obj.id}
                                                      price={obj.price}
                                                      title={obj.title}
                                                      imageUrl={obj.imageUrl}
                                                      sizes={obj.sizes}
                                                      types={obj.types}/>)}
            </div>
            <Paginator currentPageNumber={currentPageNumber} totalCount={10} sizePage={4}/>
        </div>
    </div>)
}

export default Home