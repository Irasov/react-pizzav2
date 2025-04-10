import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({searchValue}) => {
  const [items, setItmes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const[categoryId, setCategoryId] = React.useState(0);
  const [currentpage, setCurrentPage] = React.useState(1);
  const[sortType, setSortType] = React.useState(
    {name: 'популярности', sortProperty: 'rating'}
  );

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty.replace('-','');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentpage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItmes(json);
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentpage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
    <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id)=>{setCategoryId(id)}}/>
        <Sort value={sortType} onChangeSort={(id)=>{setSortType(id)}} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage = {number => setCurrentPage(number)} />
    </div>
  )
}

export default Home;