import React, { useRef } from 'react';
import { editBook } from "../actions/books";
import { useDispatch } from "react-redux";

let BookListLayout = ({ id, title, description, author, count }) => {

    const inputRef = useRef({});
    const dispatch = useDispatch();
    const [isEditClicked, setIsEditClicked] = React.useState(false);
    let tableData;

    const onEditItem = () => {
        setIsEditClicked(!isEditClicked);
    }

    const onSaveItem = (e) => {
        /* call preventDefault so that useEffect does not call after every render */
        e.preventDefault();

        let title = inputRef.current['book_title'].value,
            author = inputRef.current['book_author'].value,
            description = inputRef.current['book_description'].value,
            count = inputRef.current['book_count'].value,
            requestBody = {id:id, title:title, description: description, count:count, author:author}


        callApi(requestBody)
            .then(res => {
                dispatch(editBook({id, title, description, count, author}));
            })
            .catch(err => console.log(err));


        setIsEditClicked(!isEditClicked);
    };

    const callApi = async (requestBody) => {
        const response = await fetch('/api/books/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const body = await response.json();
        return body;

    };

    if(!isEditClicked){
        tableData =  <><div className="td td-title">
                        <span>{title}</span>
                    </div>
                    <div className="td td-author">
                        <span>{author}</span>
                    </div>
                    <div className="td td-description">
                         <span>{description}</span>
                    </div>
                    <div className="td td-count">
                        <span>{count}</span>
                    </div>
                    <div className="td td-edit">
                        <button className="update-book-item" onClick={onEditItem}>Edit</button>
                    </div>
            </>
    } else{
        tableData =  <><div className="td td-title">
                         <input className="td" type="text" className="input-data" size ="20" defaultValue={title} ref={(input) => inputRef.current['book_title'] = input} required="required"/>
                    </div>
                    <div className="td td-author">
                        <input className="td" type="text" className="input-data" size ="20" defaultValue={author} ref={(input) => inputRef.current['book_author'] = input} required="required"/>
                    </div>
                    <div className="td td-description">
                        <input className="td" type="text" className="input-data" size ="50" defaultValue={description} ref={(input) => inputRef.current['book_description'] = input} required="required" />
                    </div>
                    <div className="td td-count">
                        <input className="td" type="number" className="input-data" size ="10" defaultValue={count} ref={(input) => inputRef.current['book_count'] = input} required="required"/>
                    </div>
                    <div className="td td-save">
                        <input type="submit" className="save-book-item" value="Save"/>
                    </div>
                </>
    }


    return(
        <>
            <form action="" className="tr" onSubmit={onSaveItem}>
                {tableData}
            </form>
        </>
    )

};

export default BookListLayout;