import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public getDataFromSensor(){
    return this.httpClient.get("http://192.168.0.51:8080/qpe/getTagPosition?version=2&tag=a4da22e16F3d");
  }
}