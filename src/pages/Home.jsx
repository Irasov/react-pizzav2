import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [items, setItmes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const[categoryId, setCategoryId] = React.useState(0);
  const[sortType, setSortType] = React.useState(
    {name: 'популярности', sortProperty: 'rating'}
  );

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty.replace('-','');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    fetch(
      `https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItmes(json);
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className='container'>
    <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id)=>{setCategoryId(id)}}/>
        <Sort value={sortType} onChangeSort={(id)=>{setSortType(id)}} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  )
}

export default Home;