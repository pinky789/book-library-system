import React from 'react';
import BookFilter from "./BookFilter";
import AddBook from "./AddBook";
import BookList from "./BookList";
import '../App.css';

const AppContent = () => {

    return(
        <>
            <div className="row">
                <BookFilter />
            </div>
            <div className="row">
                <AddBook />
            </div>
            <div className="row">
                <BookList />
            </div>
        </>
    )
}

export default AppContent;