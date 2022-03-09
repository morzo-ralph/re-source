import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  constructor(private http: HttpClient) { }

  //SERVICES FOR DATA  

  /*apiURL = "http://192.168.1.7/SIA-GIT/API/";*/

  // baseURL = "http://localhost:3000";

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
  getPost(uri: string ,pageSize: number, currentPage: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`
    
    return this.http.get(environment.BASE_URL+`${uri}` + queryParams)
  }

  search(uri: string, keyword: any) {
    const query = `?filter=${keyword}`
    return this.http.get(environment.BASE_URL+`${uri}` + query)
  }

  get(uri: string) {
    return this.http.get(environment.BASE_URL+`${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(environment.BASE_URL+`${uri}`, payload);
  }

  put(uri: string, payload: object) {
    return this.http.put(environment.BASE_URL+`${uri}`, payload);
  }

  patch(uri: string, payload: object) {
    return this.http.patch(environment.BASE_URL+`${uri}`, payload);
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
