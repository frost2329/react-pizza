import * as React from 'react'
type CategoriesProps = {
    currentCategory: number,
    setCurrentCategory : (index: number)=>void
}
const Categories: React.FC<CategoriesProps> = ({currentCategory, setCurrentCategory}) => {
    const categoryTitle = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categoryTitle.map((catName, index) => {
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