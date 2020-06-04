
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

// Set up the prediction graph for the first time
var ctx = document.getElementById('prediction-graph').getContext('2d');
var x = [];
for (var i = 0; i < 7; i++) {
    x[i] = moment().add(i, 'day').format('DD MMM');
}
var predictionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: x,
        datasets: [{
            label: 'predicted cases',
            data: [12, 19, 3, 2, 8, 3, 10],
            backgroundColor: [
                'rgba(153, 102, 255, 0.0)',
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 4
        },
        {
            label: 'recovered + deaths',
            data: [1, 10, 3, 5, 2, 3, 10],
            backgroundColor: [
                'rgba(153, 102, 255, 0.0)',
            ],
            borderColor: [
                'rgba(0, 0, 0, 1)',
            ],
            borderWidth: 4
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
