// get User coordinates from html 
document.onload = getLocation();

function getLocation(){
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( (position) => {
        console.log('Latitude: ' + position.coords.latitude);
        console.log('Longitude: ' + position.coords.longitude);
    });
        // navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    alert("Geolocation is not supported by this browser");
    }
}

function showPosition(position){
    console.log('Latitude: ' + position.coords.latitude);
    console.log('Longitude: ' + position.coords.longitude);
}

// function to check if location exists
// and download data from the api and display the error message if nothing was found
function checkLocation(){
    let home_address = document.getElementById('home_address').value;
    let country = document.getElementById('country').value;
    let town = document.getElementById('town').value;

    let location = "";
    // let location = home_address + ' ' + town + " " + country;
    // console.log(home_address);
    // console.log(town);
    // console.log(country);
    // console.log(location);

    // compose location
    if(home_address != undefined || home_address != ''){
        location += home_address;
    }
    if(town != undefined || town != ''){
        location += " " + town;
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
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());

    // var lonLat = new OpenLayers.LonLat( -0.1279688 ,51.5077286 )
    alert(data[0].lon + " " + data[0].lat);
    var lonLat = new OpenLayers.LonLat(data[0].lon, data[0].lat)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );

    var zoom = 16;
    
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    
    alert('LonLat: ' + lonLat);
    markers.addMarker(new OpenLayers.Marker(lonLat));

    map.setCenter(lonLat, zoom);

    return map;
    
}

async function killMap() {
    let mapdiv = document.getElementById('mapdiv');

    if (mapdiv.style.display == "block") {
        mapdiv.style.display = "none";
    }

    // Delete Previous addition by displayOnMap
    mapdiv.innerHTML = "";
}

