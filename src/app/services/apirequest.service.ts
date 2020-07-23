import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators';

import { CountyModel } from "../county-model/county.model";

@Injectable({
  providedIn: 'root'
})
export class APIRequestService {

  apiUrl = "https://countyhealthapp.herokuapp.com/counties";

  constructor(private http : HttpClient) { }

  getCountyData() {
    return this.http.get(this.apiUrl, {
      headers : {
       "Access-Control-Allow-Origin" : "*",
       "Access-Control-Allow-Methods" : "GET, POST, HEAD, PUT, PATCH, DELETE",
       "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      }
    })
    .pipe(
      map((response : CountyModel[]) => {
        return response
      }), catchError( error => {
        return throwError('No data came through', error)
      }))
  }

}
