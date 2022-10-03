import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";

function Home({pizzas, isLoading}) {
    return (<div className="content">
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
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