import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
    value: number;
    onChangeCategory: (i: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
    
    return(
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => {
                        return(
                            <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>{categoryName}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default Categories;