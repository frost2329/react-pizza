import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";
import Paginator from "../components/Paginator/Paginator";
import {AppContext} from "../App";

function Home() {
    const {searchValue, currentPage, setCurrentPage} = React.useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [pizzas, setPizzas] = useState([])
    const [currentSort, setCurrentSort] = useState({name: 'популярности', sortProperty: 'rating'})
    const [currentCategory, setCurrentCategory] =useState(0);
    useEffect(() => {
        setIsLoading(true)
        let sort = 'sortBy=' + (currentSort.sortProperty.replace('-', ''))
        let order = 'order=' + (currentSort.sortProperty.includes('-') ? 'desc' : 'asc')
        let category = currentCategory === 0 ?'' :'category='+currentCategory
        let limit = 'limit=' + 4
        let page = 'page=' + currentPage
        let search = 'search=' + searchValue
        let url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items?${page}&${limit}&${category}&${sort}&${order}&${search}`;

            console.log(url)
            axios.get(url)
            .then((res) => {
                console.log(res.data)
                setPizzas(res.data)
                    setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [currentSort, currentCategory, currentPage, searchValue])

    return (<div className="content">
        <div className="container">
            <div className="content__top">
                <Categories currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
                <Sort currentSort={currentSort} setCurrentSort={setCurrentSort}/>
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
            <Paginator currentPage={currentPage} totalCount={10} sizePage={4} onPageNumber={setCurrentPage}/>
        </div>
    </div>)
}
export default Home