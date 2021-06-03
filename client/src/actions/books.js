import uuid from 'uuid';

export const addBook = ({
    id = uuid(),
    title = '',
    description = '',
    count = 1,
    author = ''
} = {}) => ({
    type: 'ADD_BOOK',
    book: {
        id,
        title,
        description,
        count,
        author
    }
});

export const editBook = ({ id,  title = '',
                             description = '',
                             count = 1,
                             author = ''} = {}) => ({
    type: 'EDIT_BOOK',
    book: {
        id,
        title,
        description,
        count,
        author
    }
});