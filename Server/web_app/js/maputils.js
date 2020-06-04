
function predict(map, searchService, query, ){
    searchService.geocode({
        q: query,
    }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
            map.removeObjects(map.getObjects())
            map.addObject(new H.map.Marker(item.position));
            map.setCenter(item.position);

            $.get('http://127.0.0.1:8087/api/v1/status', {
                state: item.address.state,
                district: item.address.city
            }, function(data){
                console.log(data);
            }).fail(function(){
                console.log("error");
            });
        }, alert);
    });
}

var searchBar = document.getElementById('loc-searchbar');
searchBar.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        query = searchBar.value;
        predict(map, searchService, query);
    }
})

document.getElementById('sidebar-date').innerHTML = moment().format("DD MMMM YY");
