import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private http: HttpClient) { }

  isMobile!: boolean

  setIsMobile(status: boolean) {
    this.isMobile = status
  }

  getIsMobile() {
    return this.isMobile
  }

  apiURL = "http://192.168.1.7/SIA-GIT/API/";
  baseURL = "http://localhost:3000";

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data))
      )
    );
  }

  getIPAddress() {
    return this.http.get("http://192.168.1.7/SIA-GIT/appAPI/checkAPI");
  }

  get(uri: string) {
    return this.http.get(`${this.baseURL}/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(`${this.baseURL}/${uri}`, payload);
  }

  put(uri: string, payload: object) {
    return this.http.put(`${this.baseURL}/${uri}`, payload);
  }

  patch(uri: string, payload: object) {
    return this.http.patch(`${this.baseURL}/${uri}`, payload);
  }

}