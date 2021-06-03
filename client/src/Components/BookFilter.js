import React  from 'react';
import { connect } from 'react-redux';
import { filterText } from '../actions/filters';
import '../styles/BookListLayout.css';
import search_icon from "../images/search_icon.png";

const BookFilter = (props) => {

    const onInputChange = event => {
        props.dispatch(filterText(event.target.value));
    }

    return (
        <>
            <input
                type="text"
                name="search"
                id="header-search"
                placeholder="Search a book"
                value={ props.filters.text }
                onChange={ onInputChange }
                style={{ backgroundImage: `url(${search_icon})`}}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(BookFilter);