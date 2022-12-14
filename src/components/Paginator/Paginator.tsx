import React, {useState} from 'react';
import s from "./Paginator.module.scss";
import {useDispatch} from "react-redux";
import {setCurrentPageNumber} from "../../redux/filter/filterSlice";

type PaginatorProps = {
    currentPageNumber: number,
    totalCount: number,
    sizePage: number
}
const Paginator: React.FC<PaginatorProps> = (props) => {
    const dispatch = useDispatch()
    let [portionNumber, setPortionNumber] = useState(1);
    let portionSize = 5
    let pageCount = Math.ceil(props.totalCount / props.sizePage);
    let portionCount = Math.ceil(pageCount / portionSize);
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    pages = pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => {
            return (
                <span key={p.toString()} className={s.paginatorEl + ' '+ (props.currentPageNumber === p ? s.selected : '')}
                      onClick={() => {dispatch(setCurrentPageNumber(p))}}>
                {p}
            </span>
            )
        })
    return <div>
        <button className={s.paginatorEl +' '+ (portionNumber <= 1 ? s.disabled : '')}
                disabled={portionNumber <= 1}
                onClick={()=>{setPortionNumber(portionNumber -1 )}}>
            {'<'}
        </button>
        {pages}
        <button className={s.paginatorEl +' '+ (portionNumber >= portionCount ? s.disabled : '')}
                disabled={portionNumber >= portionCount}
                onClick={()=>{setPortionNumber(portionNumber +1 )}}>
            {'>'}
        </button>
    </div>
}

export default Paginator;