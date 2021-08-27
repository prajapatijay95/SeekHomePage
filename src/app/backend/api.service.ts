import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassificationModel, Classifications } from './classification-data';
import { SearchResultModel, SearchResults } from './search-results';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getClassificationList(): Observable<ClassificationModel[]> {
    return of(Classifications);
  }

  getSearchResults(): Observable<SearchResultModel[]> {
    return of(SearchResults);
  }
}
