//User location
// Lat and Lon cannot be over 180 or under -180
let user_location = {
    lat: 181, // Default
    lon: 181  // Default
};

// get User coordinates from html 
document.onload = getLocation();


function getLocation(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
            console.log('Latitude: ' + position.coords.latitude);
            console.log('Longitude: ' + position.coords.longitude);
            // Adjust user location information
            user_location.lat = position.coords.latitude;
            user_location.lon = position.coords.longitude;
            // fiil in the form spot
            document.getElementById('longitude').value = user_location.lon;
            document.getElementById('latitude').value = user_location.lat;
            // do the reverse search
            reverseLocation();
        });
        // navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    alert("Geolocation is not supported by this browser");
    return false;
    }
}

function showPosition(position){
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
}

function getUserLocation(){

    console.log('Getting Coordinates');
    getLocation();
    setTimeout(console.log('timeout over'), 5000);
    console.log('Got them ' + user_location.lat + ' lon ' + user_location.lon);
    
    reverseLocation();

}


// function to check if location exists
// and download data from the api and display the error message if nothing was found
function checkLocation(){
    killMap();
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let city = document.getElementById('city').value;

    let location = "";
    // let location = address + ' ' + city + " " + country;
    // console.log(address);
    // console.log(city);
    // console.log(country);
    // console.log(location);

    // compose location
    if(address != undefined || address != ''){
        location += address;
    }
    if(city != undefined || city != ''){
        location += " " + city;
    }
    if(country != undefined || country != ''){
        location += " " + country;
    }

    console.log("location: " + location);

    const data = null;
    let result;
    let map;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            // Experimenting
            if(this.responseText != "{}"){
                result = JSON.parse(this.responseText);
                console.log('Will stringify JSON: ' + JSON.stringify(result, null, 4));
                map = displayOnMap(JSON.parse(this.responseText)); // Isws na to thelei se JSON.parse
            }
            hideUnhideLocationError(this.responseText);
            return data;
        }
    });

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + location + "&format=json&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "b1fb602154mshdc68cbc8b6ffc06p199c88jsn16f64fa59578");

    xhr.send(data);
}


// function to hide or unhide the location error message
function hideUnhideLocationError(data){
    if (data == "{}") {
        console.log('Error location does not exist ' + data);
        document.getElementById('locationNotFoundMessage').style.display = "block";
    } else {
        console.log('data is' + data);
        document.getElementById('locationNotFoundMessage').style.display = "none";

        // If location is valid create Map and display it on it
        //displayOnMap(data);
    }
}

// function to create a map and display on it the given position
function displayOnMap(data){

    //Display map
    document.getElementById('mapdiv').style.display = "block";

    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());

    // var lonLat = new OpenLayers.LonLat( -0.1279688 ,51.5077286 )
    alert(data[0].lon + " " + data[0].lat);
    // var lonLat = new OpenLayers.LonLat(data[0].lon, data[0].lat)
    //     .transform(
    //         new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    //         map.getProjectionObject() // to Spherical Mercator Projection
    //     );
    

    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(data[0].lon, data[0].lat).transform(fromProjection, toProjection);

    var zoom = 14;
    
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    
    alert('position ' + position);
    markers.addMarker(new OpenLayers.Marker(position));

    map.setCenter(position, zoom);

    return map;
}


function killMap() {
    let mapdiv = document.getElementById('mapdiv');

    if (mapdiv.style.display == "block") {
        mapdiv.style.display = "none";
    }

    // Delete Previous addition by displayOnMap
    mapdiv.innerHTML = "";
}

// Need To get Data from the form and search the api if there is 
function reverseLocation(){
    const data = null;
    let lat, lon;
    lat = user_location.lat;
    lon = user_location.lon;

    if(lat === 181 || lon === 181){
        alert('Cannot find user location');
    }

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    setTimeout(function() {}, 8000);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            //console.log(this.responseText);
            // result = JSON.parse(this.responseText);
            if(this.responseText != "{}") {
                let result = JSON.parse(this.responseText);
                // var parser = new DOMParser();
                // var xmlDoc = parser.parseFromString(this.responseText, 'text/xml');
                // let result = this.responseText;
                // console.log("getting it" + result[1]);
                // assign city, country and home address
                // console.log(result.address.road);
                document.getElementById('address').value = result.address.road; 
                // console.log(result.address.country);
                // console.log(result.address.city);
                document.getElementById('city').value = result.address.city;
                // console.log(xmlDoc);
                
            }            
        }
    });

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=" + lat + '&lon=' + lon + "&format=json&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "b1fb602154mshdc68cbc8b6ffc06p199c88jsn16f64fa59578");

    xhr.send(data);

}