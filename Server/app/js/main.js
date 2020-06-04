
function predict(map, searchService, query){
    searchService.geocode({
        q: query,
    }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
            if(item.address.countryCode != "IND"){
                alert("Current version supports Indian districts only!");
                return;
            }
            map.removeObjects(map.getObjects())
            map.addObject(new H.map.Marker(item.position));
            map.setCenter(item.position);

            $.ajax({
                type: 'GET',
                url:'http://127.0.0.1:8081/api/v1/status/',
                data: {
                    state: item.address.state,
                    district: item.address.city
                },
                headers: {
                    'mozSystem': true,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':'PUT, GET, POST',
                    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
                },
                success: function(data){
                    data = JSON.parse(data);
                    updateData(data);
                }
            });
        }, alert);
    });
}

function updateData(data){
    predictionGraph.data.datasets[0].data = data.infected;
    predictionGraph.data.datasets[1].data = data.rd;
    predictionGraph.update();
    confirmedCases.innerHTML = data.infected[0];
    recDeaths.innerHTML = data.rd[0];
}

function showSelectedDate(slider){
    console.log("hello");
    sidebarDate.innerHTML = moment().add(slider.value, 'day').format('DD MMMM YY');
    confirmedCases.innerHTML = predictionGraph.data.datasets[0].data[slider.value];
    recDeaths.innerHTML = predictionGraph.data.datasets[1].data[slider.value];
}

var searchBar = document.getElementById('loc-searchbar');
searchBar.addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        query = searchBar.value;
        predict(map, searchService, query);
    }
})
var sidebarDate = document.getElementById('sidebar-date');
sidebarDate.innerHTML = moment().format("DD MMMM YY");
var confirmedCases = document.getElementById('confirmed-cases');
var recDeaths = document.getElementById('recovered-deaths');

// Set up the prediction graph for the first time
var ctx = document.getElementById('prediction-graph').getContext('2d');
var x = [];
for (var i = 0; i < 7; i++) {
    x[i] = moment().add(i, 'day').format('DD MMM');
}
var predictionGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: x,
        datasets: [{
            label: 'predicted cases',
            data:[105,108,112,115,115,117,117],
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
            data:[105,108,112,115,115,117,117],
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
                    beginAtZero: false
                }
            }],
            ticks:{
                display:true,
            }
        }
    }
});
