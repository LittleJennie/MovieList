// https://developers.themoviedb.org/3/search/search-movies

var searchTMDB = (queryObject, successCB) => {
    // var url = `https://api.themoviedb.org/3/search/movie?api_key=e1bba95f329783c1383f684665e19f02&language=en-US&query=superman&page=1&include_adult=false`
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
            console.log(data.results);
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



// var url = `https://api.themoviedb.org/3/search/movie?api_key=${queryObject.api_key}&language=en-US&query=${queryObject.query}page=1&include_adult=false`
