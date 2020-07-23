function mainMap () {


  var counties = [
    {
      name : "Nairobi",
      county_id : 42,
      number_of_cases : 7118
    },
    {
      name : "Murang'a",
      county_id : 37,
      number_of_cases : 7118
    }
  ];
  
  
  require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/renderers/visualVariables/ColorVariable",
    "esri/tasks/support/Query",
    "esri/renderers/SimpleRenderer"
  ], function(Map, MapView, FeatureLayer, Query) {
    
      var map = new Map({
        basemap: "dark-gray-vector"
      });
  
      var view = new MapView({
        container: "map",  
        map: map,
        center: [36.8219, -1.2921],
        zoom: 7            
      });
      
      var colorVisVar = {
        type: "simple",
        symbol: { 
          type: "simple-fill" },
          visualVariables : [{
            type : "color",
            field: "AREA",
            stops: [
              { value: 7, color: "#6A040F" },
              { value: 3.5, color: "#EC091F" },
              { value: 0, color: "#F94E5F" }
            ],
            legendOptions: {
              title: "Population per square kilometer"
            }
            
          }]
        };
        
        var featureLayer = new FeatureLayer({
          url: "https://services5.arcgis.com/4kwj68aVNBcY6llE/arcgis/rest/services/kenyan_counties/FeatureServer/0",
          renderer : colorVisVar,
          // popupTemplate: {  // Enable a popup
          //       title: `${counties[0].name}`, // Show attribute value
          //       content: `Number of cases : ${counties[0].number_of_cases}`  // Display text in pop-up
          //     }
        });
  
        map.add(featureLayer);
  
        const query = { // autocasts as Query
          where: "COUNTY =  'Nairobi'", // select all features
          returnGeometry: false,
          outFields: ["COUNTY"]
        };
  
        featureLayer.queryFeatures(query).then(function(results){
          // prints the array of Object IDs to the console
          console.log(results.features);
        });
    
        
  
    });
}

mainMap();