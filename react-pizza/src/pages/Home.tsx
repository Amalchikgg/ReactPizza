import React from "react";
import Categories from '../components/Categories';
import { Sort, popup } from "../components/Sort";
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from "../Pagination";
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas } from "../redux/Slices/pizzaSlice/slice";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/Slices/filter/selectors";
import { selectPizzaData } from "../redux/Slices/pizzaSlice/selectors";
import { setCategotyId, setPageCount } from "../redux/Slices/filter/slice";


const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMounted = React.useRef(false);
    const isSearch = React.useRef(false);
    //const items = useSelector((state) => state.pizza.items);
    const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);
    //const [items, setItems] = React.useState([]);
    //const [isLoading, setIsLoading] = React.useState(true);
   

    const onChangeCategory = React.useCallback((idx: number) => {
      dispatch(setCategotyId(idx));
    }, []);

    const onChangePage = (number: number) => {
        dispatch(setPageCount(number));
    }

    const getPizzas = async () => {
      //setIsLoading(true);
  
      const sortBy = sort.sort.replace('-', '');
      const order = sort.sort.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';
  
      dispatch(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        pageCount: String(pageCount)
      })
      );
      window.scrollTo(0, 0);
    };
  
    // Если изменили параметры и был первый рендер
  //   React.useEffect(() => {
  //    if (isMounted.current) {
  //      const queryString = qs.stringify({
  //        sort: sort.sort,
  //        categoryId,
  //        pageCount,
  //      });
  
  //      navigate(`?${queryString}`);
  //    }
  //    isMounted.current = true;
  //  }, [categoryId, sort.sort, pageCount]);
  
    // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
    //  React.useEffect(() => {
    //    if (window.location.search) {
    //      const params = qs.parse(window.location.search.substring(1));
  
    //      const sort = popup.find((obj) => obj.sort === params.sort);
  
    //      dispatch(
    //        setFilters({
    //          ...params,
    //          sort,
    //        }),
    //      );
    //      isSearch.current = true;
    //    }
    //  }, []);
  
    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
      if (!isSearch.current) {
        getPizzas();
      }
  
      isSearch.current = false;
    }, [categoryId, sort.sort, searchValue, pageCount]);
  
    const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return(
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
              status === 'error' ? <div>
                <h2>Error</h2>
                <p>Error</p>
              </div> : <div className="content__items">
              { status === 'loading' ? skeletons : pizzas }
              </div>
            }
            
            <Pagination value={pageCount} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;