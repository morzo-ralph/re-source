import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }

  isMobile!: boolean

  setIsMobile(status: boolean) {
    this.isMobile = status
  }

  getIsMobile() {
    return this.isMobile
  }


}
