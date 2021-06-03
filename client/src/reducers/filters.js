const filtersReducerDefaultState = {
    text: ''
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'FILTER_TEXT':
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
}