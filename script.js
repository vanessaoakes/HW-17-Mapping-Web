//Created background
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }); 

//Create a layers dictionary
var layers={
    ZERO_TO_ONE: new L.LayerGroup(),

};

 // Create the map object with options
 var map = L.map("map-id", {
    center: [37.78, -122.41],
    zoom: 4,
    layers: [
        layers.ZERO_TO_ONE,

    ]
  });
//Create a legend
  var info = L.control({
      position: "bottomright"
  });

//insert div with the class of "legend"
  info.onAdd= function() {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML=[
          "<ul>",
          "<li class=\"one\">0 to 1</li>",
          "<li class=\"two\">1-2</li>",
          "<li class=\"three\">2-3</li>",
          "<li class=\"four\">3-4</li>",
          "<li class=\"five\">4-5</li>",
          "<li class=\"six\">5+</li>",
          "</ul>"
      ].join("");
      return div;
  };
  info.addTo(map);

//Creating Markers



  lightmap.addTo(map);
  
//Calling JSON
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", function(info){
    //console.log(info)

  for (var i = 0; i < info.features.length; i++){
    var earthquake = info.features[i]
    console.log(earthquake)

    const magnitude = earthquake.properties.mag
    var color 
    var radius

    if (magnitude <= 1) {
        color = "#C4F169"
        radius = 100000
    }
    else if (magnitude <= 2) {
        color = "#E5F26A"
        radius = 150000
    }
    else if (magnitude <=3 ) {
        color = "#EFDC67"
        radius = 200000
    }
    else if (magnitude <= 4 ) {
        color = "#EABC61"
        radius = 250000
    }
    else if (magnitude <= 5) {
        color = "#E5AA75"
        radius = 300000
    }
    else {
        color = "#E0736F"
        radius = 350000

    }

    const coordinates = earthquake.geometry.coordinates
    var circle = L.circle([coordinates[1],coordinates[0]],{
        color: color,
        fillOpacity: 0.5,
        radius:radius
    }).addTo(map);
    circle.bindPopup(magnitude.toString());
  }


});


//Pop ups
//Legend