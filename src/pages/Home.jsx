import React from 'react';
import { useSelector, useDispatch }  from 'react-redux';
import { setCategotyID, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { SearchContext } from '../App';


const Home = () => {
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort.sortProperty);
  const currentPage = useSelector(state => state.filter.currentPage);
  const dispatch = useDispatch();

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItmes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  


  const onChangeCategory = (id) => {
    dispatch(setCategotyID(id));
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace('-','');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}` : '';
      axios.get(`https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(response => {
        setItmes(response.data);
        setIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
    <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination currentPage = {currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;