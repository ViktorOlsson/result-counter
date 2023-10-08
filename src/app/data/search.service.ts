import { googleApiUrl, internetArchiveUrl } from './../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}
  // Borde inte ha typ <any> egentligen...
  getDataFromGoogleApi(searchString: string): Observable<any> {
    return this.httpClient.get<any>(`${googleApiUrl}${searchString}`);
  }

  // Borde inte ha typ <any> egentligen...
  getDataFromInternetArchive(searchString: string): Observable<any> {
    return this.httpClient.get<any>(`${internetArchiveUrl}${searchString}`);
  }

}
