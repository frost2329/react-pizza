import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import * as React from "react";
import FullPizza from "./pages/FullPizza";
import Orders from "./pages/Orders";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path="pizza/:id" element={<FullPizza />}/>
                <Route path='cart' element={<Cart />}/>
                <Route path='orders' element={<Orders />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
    );
}

export default App;
