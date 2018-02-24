function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: 50.850, lng: 4.348 }
        });
    
    var input = /** @type {!HTMLInputElement} */(
            document.getElementById('from'));

    var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var input2 = /** @type {!HTMLInputElement} */(
            document.getElementById('to'));

        var autocomplete2 = new google.maps.places.Autocomplete(input2);
        autocomplete2.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }})

        autocomplete2.addListener('place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete2.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
        })

    directionsDisplay.setMap(map);

        var onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
        document.getElementById('submit').addEventListener('click', onChangeHandler);
        document.getElementById('reset').addEventListener('click', onChangeHandler);
    //   }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            directionsService.route({
                origin: document.getElementById('from').value,
                destination: document.getElementById('to').value,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } 
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }