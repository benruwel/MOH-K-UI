import { Component, OnInit } from '@angular/core';

import {} from 'googlemaps';
import{} from 'deck.gl';

import { APIRequestService } from "../services/apirequest.service";
import { CountyModel } from "../county-model/county.model";



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  
  county$ : CountyModel[];
  
  map: google.maps.Map;
  deck : deck.gl
  
  constructor( private apiRequest : APIRequestService ) { }

  
  ngOnInit(): void {
    
    this.initMap();
    
    this.countyData();
    
  }
  
  initMap(): void {
   this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
     center: { lat: 0.1768696, lng: 37.9083264 },
     zoom: 6
   });

   this.map.data.setStyle(feature => {
     return {
       title: feature.getProperty("name"),
       optimized: false
     };
   });

   const deckOverlay = new deck.GoogleMapsOverlay({
    layers: [
      // @ts-ignore TODO(jpoehnelt)
      new deck.GeoJsonLayer({
        id: "earthquakes",
        data:
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusMaxPixels: 200,
        opacity: 0.4,
        pointRadiusScale: 0.3,
        getRadius: (f: any) => Math.pow(10, f.properties.mag),
        getFillColor: [255, 70, 30, 180],
        autoHighlight: true,
        transitions: {
          getRadius: {
            type: "spring",
            stiffness: 0.1,
            damping: 0.15,
            enter: _ => [0], // grow from size 0,
            duration: 10000
          }
        },
        onDataLoad: _ => {
          // @ts-ignore defined in include
          progress.done(); // hides progress bar
        }
      })
    ]
  });

  deckOverlay.setMap(this.map);

   
 }
  countyData() {
    this.apiRequest.getCountyData()
      .subscribe((data : any) => {
        this.county$ = data;
      })
  }

}
