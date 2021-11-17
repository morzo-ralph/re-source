import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(
    private data: DataService,
    private http: HttpClient
  ) { }

  getAllItem(uri: any) {
    return this.data.get(uri);
  }

  createItem(uri: any, data: any) {
    return this.data.post(uri, {data});
  }

  getItem(uri: any, id:any){
    return this.data.get(`${uri}/${id}`);
  }

  updateItem(uri: any, id: any, data: any){
    return this.data.put(`${uri}/${id}`, {data})
  }

  archiveItem(uri: any, id: any, data: any){
    return this.data.patch(`${uri}/${id}`, {data});
  }
  
}
