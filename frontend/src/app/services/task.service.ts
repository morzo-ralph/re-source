import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private data: DataService
  ) { }

  getAllItem() {
    return this.data.get('inventories');
    //return this.data.get('lists');
  }

  createItem(a: any) {
    return this.data.post('inventories', {a});
  }

  getItem(id:any){
    return this.data.get(`lists/${id}`);
  }

  updateItem(id: any, a: any){
    return this.data.put(`lists/${id}`, {a})
  }

  archiveItem(id: any, a: any){
    return this.data.put(`inventories/${id}`, {a});
  }

}
