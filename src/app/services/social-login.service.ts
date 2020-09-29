import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {

  BASE_URL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  savesResponse(response) {

    return this.httpClient.post(this.BASE_URL + "Savesresponse", response);
  }

  clearSavedResponse(id) {
    
    return this.httpClient.delete(this.BASE_URL + "Savesresponse/" + id);
  }

}
