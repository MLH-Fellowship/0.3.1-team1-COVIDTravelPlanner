function geocode(map, searchService, query){
    searchService.geocode({
        q: query,
    }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
            map.removeObjects(map.getObjects())
            map.addObject(new H.map.Marker(item.position));
            map.setCenter(item.position);
        });
    }, alert);
}

var searchBar = document.getElementById('loc-searchbar')
searchBar.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        query = searchBar.value;
        geocode(map, searchService, query);
    }
})
