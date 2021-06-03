// getVisibleBooks
export default (books, { text}) => {
    return books.filter(book => {
        const textMatch =
            book.title.toLowerCase().includes(text.toLowerCase()) ||
            book.description.toLowerCase().includes(text.toLowerCase());

        return textMatch;
    });
}