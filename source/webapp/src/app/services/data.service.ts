import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) { }

  //SERVICES FOR DATA  

  /*apiURL = "http://192.168.1.7/SIA-GIT/API/";*/

  baseURL = "http://localhost:3000";

  //sendApiRequest(method: any, data: any) {
  //  return <any>(
  //    this.http.post(this.apiURL + method, btoa(JSON.stringify(data))
  //    )
  //  );
  //}

  //getIPAddress() {
  //  return this.http.get("http://192.168.1.7/SIA-GIT/appAPI/checkAPI");
  //}

  //General Methods

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

  //Data Methods

  getAllItem(uri: any) {
    return this.get(uri);
  }

  createItem(uri: any, data: any) {
    return this.post(uri, { data });
  }

  createItemss = async (uri: any, data: any) => {
    const response : any = await this.post(uri, { data }).toPromise();
    return response;
  }

  createItemInv(uri: any, data: any, file: any) {
    return this.post(uri, { data, file });
  }

  getItem(uri: any, id: any) {
    return this.get(`${uri}/${id}`);
  }

  updateItem(uri: any, id: any, data: any) {
    return this.put(`${uri}/${id}`, { data })
  }

  archiveItem(uri: any, id: any, data: any) {
    return this.patch(`${uri}/${id}`, { data });
  }

}
