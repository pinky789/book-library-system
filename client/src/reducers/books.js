const booksReducerDefaultState = [];

export default (state = booksReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return [
                ...state,
                action.book
            ];
        case 'EDIT_BOOK':
            const newBookList = state.map((item) => {
                if(item.id === action.book.id){
                    return {
                        ...item,
                        ...action.book
                    };
                }
                return item;
            });
            return newBookList;
        default:
            return state;
    }
};