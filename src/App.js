import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    let [pizzas, setPizzas] =useState([])
    console.log(pizzas)
    useEffect(()=>{
        axios.get('https://62f53aa6ac59075124ce14b4.mockapi.io/items')
            .then((response)=>{
                setPizzas(response.data)
                console.log(response)
            })
    }, [])
    return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {pizzas.map((obj)=>{
                    return <PizzaBlock key={obj.id}
                                       price={obj.price}
                                       title={obj.title}
                                       imageUrl={obj.imageUrl}
                                       sizes={obj.sizes}
                                       types={obj.types}
                    />
                })}
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
