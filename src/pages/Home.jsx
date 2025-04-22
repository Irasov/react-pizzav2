import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch }  from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { setCategotyID, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
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
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItmes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  


  const onChangeCategory = (id) => {
    dispatch(setCategotyID(id));
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const fetchPizzas =  async () => {
    setIsLoading(true);
    const sortBy = sortType.replace('-','');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}`: '';
    const search = searchValue ? `&search=${searchValue}` : '';
      /* await axios.get(`https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(response => {
        setItmes(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("error:", err );
        setIsLoading(false);
      }); */
    try {
      const response = await axios.get(`https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
      setItmes(response.data);
    } catch (error) {
      console.error("error:", error ); 
    } finally {
      setIsLoading(false);  
    }
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
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
//Если был первый рендер запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if(!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
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