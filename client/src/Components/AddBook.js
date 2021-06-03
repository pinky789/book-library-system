import React, { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { addBook } from "../actions/books";
import Modal  from "react-modal";
import '../styles/BookListLayout.css';
import getVisibleBooks from "../selectors/books";

Modal.setAppElement('#root');
const AddBook = (props) => {

    const inputRef = useRef({});
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const onSaveNewBook = () => {
        let title = inputRef.current['book_title'].value,
            author = inputRef.current['book_author'].value,
            description = inputRef.current['book_description'].value,
            count = inputRef.current['book_count'].value,
            id = props.books.length + 1,
            requestBody = {id: id, title:title, description: description, count:count, author:author}


        setIsOpen(!isOpen);
        callApi(requestBody)
            .then(res => {
                dispatch(addBook({id, title, description, count, author}));
                console.log(props.books);
            })
            .catch(err => console.log(err));

    }

    const callApi = async (requestBody) => {
        const response = await fetch('/api/books', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const body = await response.json();
        return body;

    };

   const addItems = () => {
            return(<form action="" className="form-group" onSubmit={onSaveNewBook}>
                   <div className="item-prop"><label className="label-name">Name</label>
                    <input type="text" ref={(input) => inputRef.current['book_title'] = input} required="required"/></div>
                    <div className="item-prop"><label className="label-name">Author</label>
                   <input type="text" ref={(input) => inputRef.current['book_author'] = input} required="required"/></div>
                    <div className="item-prop"><label className="label-name">Description</label>
                   <input type="text" ref={(input) => inputRef.current['book_description'] = input} required/></div>
                    <div className="item-prop"><label className="label-name">Count</label>
                   <input type="number" ref={(input) => inputRef.current['book_count'] = input} required/></div>
                    <input type="submit" className="save-button" value="Save new book"/>
               </form>
            )};

    return(
        <div>
            <button className="add-button" onClick={toggleModal}>Add new book</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Dialog"
                className="modal"
                overlayClassName="overlay"
            >
                {addItems()}
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        books: getVisibleBooks(state.books, state.filters)
    };
}

export default connect(mapStateToProps)(AddBook);
