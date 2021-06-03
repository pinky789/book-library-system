import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import BookListLayout from './BookListLayout';
import getVisibleBooks from '../selectors/books';
import { addBook } from "../actions/books";

const BookList = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        callApi()
            .then(res => {
                console.log(res)
                addBookToStore(res);
            })
            .catch(err => console.log(err));
    }, []);

    const callApi = async () => {
        const response = await fetch('/api/books');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    const addBookToStore = (lists) => {
       lists.map(book => {
           let {id, title, description, count, author} = book;

            dispatch(addBook({id, title, description, count, author}))
        });
    };

    if(props.books.length === 0){
        return <h1>No book found in library!!</h1>
    }else {
        return(
            <div className="table-container">
                <div className="table">
                    <div className="thead">
                        <div className="tr">
                            <div className="td">TITLE</div>
                            <div className="td">AUTHOR</div>
                            <div className="td">DESCRIPTION</div>
                            <div className="td">COUNT</div>
                            <div className="td"></div>
                    </div>
                </div>
                    <div className="tbody">
                        {props.books.map(book => {
                            return (
                                <BookListLayout key={book.id} {...book}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        books: getVisibleBooks(state.books, state.filters)
    };
}

export default connect(mapStateToProps)(BookList);


