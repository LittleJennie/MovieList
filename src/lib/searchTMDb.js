// https://developers.themoviedb.org/3/search/search-movies

var searchTMDB = (queryObject, successCB) => {
    return fetch('https://api.themoviedb.org/3/search/movie?', queryObject)
        .then(function(response) { // response here is http data
            return response.json();
        })
        .then(function(jsonRes) {
            console.log(JSON.stringify(jsonRes));
            return JSON.stringify(jsonRes);
        })
        .then((res) => {
            console.log(res);
            successCB(res);
        })
        .catch(error => console.error('Error:', error))
}

export default searchTMDB;