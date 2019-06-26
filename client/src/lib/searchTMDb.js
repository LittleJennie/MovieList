var searchTMDB = (queryObject, successCB) => {
    var plainURL = `https://api.themoviedb.org/3/search/movie`;
    $.get(
        plainURL, 
        {
            api_key: queryObject.api_key,
            query: queryObject.query,
            language: 'en-US',
            page: 1,
            include_adult: false
        },
        (data) => {
            successCB(data.results);
        }
    )
    .fail(
        () => {
            console.log(this.url)
        }
    )
}

export default searchTMDB;