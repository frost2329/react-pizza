import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import {useState, } from "react";
import React from "react";
export const AppContext = React.createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const onChangeSearchValue = (value) => {
        setCurrentPage(1)
        setSearchValue(value)
    }
    return (
        <div className="wrapper">
            <AppContext.Provider value={{searchValue, currentPage, setCurrentPage, onChangeSearchValue}}>
            <Header />
            <Routes>
                <Route path='/' element={<Home currentPage={currentPage}
                                               setCurrentPage={setCurrentPage}
                                               searchValue={searchValue} />}/>
                <Route path='cart' element={<Cart />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            </AppContext.Provider>
        </div>
    );
}

export default App;
