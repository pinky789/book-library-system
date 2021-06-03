import { createStore, combineReducers } from "redux";
import booksReducer from '../reducers/books';
import filtersReducer from '../reducers/filters';

export default () => {
    return createStore(
        combineReducers({
            books: booksReducer,
            filters: filtersReducer
        }
    ));
};