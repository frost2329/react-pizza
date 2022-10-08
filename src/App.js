import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";
import {useState} from "react";


function App() {
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const onChangeSearchValue = (value) => {
        setCurrentPage(1)
        setSearchValue(value)
    }
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} onChangeSearchValue={onChangeSearchValue}/>
            <Routes>
                <Route path='/' element={<Home currentPage={currentPage}
                                               setCurrentPage={setCurrentPage}
                                               searchValue={searchValue} />}/>
                <Route path='cart' element={<Cart />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </div>
    );
}

export default App;
