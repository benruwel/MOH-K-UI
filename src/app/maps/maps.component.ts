import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

import { APIRequestService } from "../services/apirequest.service";
import { CountyModel } from "../county-model/county.model";



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  @Input() marker : MapMarker;

  county$ : CountyModel[];
  
  markers = []

  

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 7
  width = 500;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
  }

  constructor( private apiRequest : APIRequestService ) { }

  
  
  ngOnInit(): void {
    
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.addMarker();

    this.countyData();
    
  }
  
  countyData() {
    this.apiRequest.getCountyData()
      .subscribe((data : any) => {
        this.county$ = data;
      })
  }
  infoContent = ''
  zoomIn() {
    this.zoom++
  }

  zoomOut() {
    this.zoom--
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: -1,
        lng: 36,
      },
      label: {
        color: 'red',
        text: 'Nairobi',
      },
      title: 'Number of cases',
      info: 'Marker info ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }

  click(event: google.maps.MouseEvent) {
    console.log(event);
  }
  

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

}
