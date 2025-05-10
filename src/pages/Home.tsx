import React from 'react';
import qs from 'qs';
import { useSelector }  from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { setCategotyID, setCurrentPage, setFilters } from '../redux/filter/slice';
import {selectFilterCategoryId, selectFilterCurrentPage, selectFilterSearchValue, selectFilterSortType, selectSort} from '../redux/filter/selectors';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { selectPizzaData } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';


const Home: React.FC = () => {
  const categoryId = useSelector(selectFilterCategoryId);
  const sortType = useSelector(selectFilterSortType);
  const  {items, status } = useSelector(selectPizzaData);
  const currentPage = useSelector(selectFilterCurrentPage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const searchValue = useSelector(selectFilterSearchValue);
  const sort = useSelector(selectSort);

  


  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategotyID(id));
  }, []);
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas =  async () => {
    const sortBy = sortType.replace('-','');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage: String(currentPage)
    }));
  };
//не вшиваем в адресную строку ничего если не было первого рендера

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

// Если был первый рендер, то проверяем URL-параметры и сохраняем в редукс
  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      );
      isSearch.current = true;
    }
  }, []);
//Если был первый рендер запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
    <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort value = {sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка <span>😕</span></h2>
          <p>
            К сожалению,не удалось получить пиццы. Попробуйте повторить попытку позже.
          </p>
        </div>) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
        )
      }
      <Pagination currentPage = {currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;