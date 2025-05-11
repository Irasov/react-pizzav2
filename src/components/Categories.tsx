import React from "react";
//import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ];

export const  Categories: React.FC <CategoriesProps> = React.memo(({value, onChangeCategory}) => {
  //useWhyDidYouUpdate('Categories', {value, onChangeCategory});
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoruName,index)=>(
            <li key={ index } onClick={() => onChangeCategory(index)} className={value === index ? 'active' : ''}>{categoruName}</li>
          ))
        }
      </ul>
    </div>
  );
});
