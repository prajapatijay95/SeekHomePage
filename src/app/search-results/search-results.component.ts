import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../backend/api.service';
import { SearchResultModel } from '../backend/search-results';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public results: SearchResultModel[];
  constructor(private apiService: ApiService) {}
  private resultSub: Subscription;
  ngOnInit() {
    this.resultSub = this.apiService.getSearchResults().subscribe((results) => {
      this.results = results;
    });
  }

  ngOnDestroy() {
    this.resultSub?.unsubscribe();
  }

  save(event, res: SearchResultModel): void {
    res.save = !res.save;
  }
}
