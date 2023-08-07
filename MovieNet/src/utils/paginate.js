const paginate = (movies, currentPage, pageSize) => {
    return movies.slice((currentPage-1)*pageSize, currentPage*pageSize);
}
 
export default paginate;