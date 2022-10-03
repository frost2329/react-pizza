import './scss/app.scss';
import Header from "./components/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";


function App() {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('https://62f53aa6ac59075124ce14b4.mockapi.io/items')
            .then((res) => {
                setPizzas(res.data)
                setIsLoading(false)

            })
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path='/' element={<Home pizzas={pizzas} isLoading={isLoading}/>}/>
                <Route path='cart' element={<Cart/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
