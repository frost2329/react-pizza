import React, {useRef} from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom";
import qs from 'qs'

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import Paginator from "../components/Paginator/Paginator";


import {setPizzas} from '../redux/slices/pizzasSlice'
import {setSort, setCategory, setFilters} from '../redux/slices/filterSlice'


function Home() {
    window._state = useSelector((state) => state)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const [isLoading, setIsLoading] = useState(true)

    const pizzas = useSelector((state) => state.pizzas.items)
    let {currentSort, currentCategory, searchValue, currentPageNumber} = useSelector((state) => state.filter)
    console.log('state: ')
    console.log(useSelector((state) => state.filter))

    const getPizzas = () => {
        setIsLoading(true)
        let category = currentCategory === 0 ? '' : 'category=' + currentCategory
        let sort = 'sortBy=' + (currentSort.sortProperty.replace('-', ''))
        let order = 'order=' + (currentSort.sortProperty.includes('-') ? 'desc' : 'asc')
        let limit = 'limit=' + 4
        let page = 'page=' + currentPageNumber
        let search = 'search=' + searchValue

        let url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items?${page}&${limit}&${category}&${sort}&${order}&${search}`;
        axios.get(url).then((res) => {
            dispatch(setPizzas(res.data))
            setIsLoading(false)
        })
    }

/*    // Кладет в адр строку параметры из стейта
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: currentSort.sortProperty,
                currentCategory,
                currentPageNumber,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [currentCategory, currentSort.sortProperty, currentPageNumber]);
    // Если есть параметры, забирает их и кладет в стейт
    useEffect(() => {
        if (window.location.search) {
            let paramsURL = qs.parse(window.location.search.substring(1));
            let sort = sortList.find((obj) => obj.sortProperty === paramsURL.sortProperty);
            const paramsForState = {
                currentSort: sort,
                currentCategory: Number(paramsURL.currentCategory),
                currentPageNumber: Number(paramsURL.currentPageNumber),
                };
            let paramsState = {currentSort, currentCategory, currentPageNumber}

            console.log(JSON.stringify(paramsState) === JSON.stringify(paramsForState))
            dispatch(
                setFilters(paramsForState),
            );
            isSearch.current = true;
        }
    }, []);
    // Если не первый рендер, то запрашиваем пиццы
    useEffect(() => {
        console.log(isSearch);
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false;
    }, [currentSort.sortProperty, currentCategory, currentPageNumber, searchValue])*/

    // Кладет в адр строку параметры из стейта
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: currentSort.sortProperty,
                currentCategory,
                currentPageNumber,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [currentCategory, currentSort.sortProperty, currentPageNumber]);
    // Если есть параметры, забирает их и кладет в стейт
    useEffect(() => {
        if (window.location.search) {
            let paramsURL = qs.parse(window.location.search.substring(1));
            let sort = sortList.find((obj) => obj.sortProperty === paramsURL.sortProperty);
            const paramsForState = {
                currentSort: sort,
                currentCategory: Number(paramsURL.currentCategory),
                currentPageNumber: Number(paramsURL.currentPageNumber),
            };
            let paramsState = {currentSort, currentCategory, currentPageNumber}

            console.log(JSON.stringify(paramsState) === JSON.stringify(paramsForState))
            if (JSON.stringify(paramsState) === JSON.stringify(paramsForState)) {
                    getPizzas()
            }else {
                dispatch(setFilters(paramsForState));
            }
            isSearch.current = true;
        }
    }, []);
    // Если не первый рендер, то запрашиваем пиццы
    useEffect(() => {
        console.log(isSearch);
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false;
    }, [currentSort.sortProperty, currentCategory, currentPageNumber, searchValue])

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