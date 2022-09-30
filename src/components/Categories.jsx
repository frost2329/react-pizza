import {useState} from "react";

function Categories() {
    const [currentCategory, setCurrentCategory] = useState(0)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((catName, index) => {
                    return (<li key={index}
                                className={index === currentCategory ? 'active' : ''}
                                onClick={() => {setCurrentCategory(index)}}>
                        {catName}
                    </li>)
                })}
            </ul>
        </div>
    );
}

export default Categories