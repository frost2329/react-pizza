import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";

function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [pizzas, setPizzas] = useState([])
    const [currentSort, setCurrentSort] = useState({name: 'популярности', sortProperty: 'rating'})
    const [currentCategory, setCurrentCategory] =useState('');

    useEffect(() => {
        setIsLoading(true)
        let sort = currentSort.sortProperty.replace('-', '')
        let order = currentSort.sortProperty.includes('-') ? 'desc' : 'asc'
        let category = currentCategory === 0 ?'':currentCategory;
        let url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items?sortBy=${sort}&category=${category}&order=${order}`;
        console.log(url)
        axios.get(url)
            .then((res) => {
                console.log(res.data)
                setPizzas(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [currentSort, currentCategory])

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
        </div>
    </div>)
}
export default Home