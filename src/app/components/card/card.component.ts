import { SearchService } from './../../data/search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { clientSecret, apiKeySectet, apiKey } from './../../shared/constants';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { accessToken, accessTokenSecret } from 'src/app/shared/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  searchTerm: string = '';
  resultCount: number = 0;
  constructor(public dialog: MatDialog, private searchService: SearchService) {}
  ngOnInit(): void {}

  onClickFetchData() {
    this.resultCount = 0;
    const stringSplit = this.searchTerm.split(' ');
    this.fetchDataFromInternetArchiveApi(stringSplit);
    this.fetchGoogleApiData(stringSplit);
  }

  fetchGoogleApiData(strings: string[]) {
    for (const string of strings) {
      this.searchService.getDataFromGoogleApi(string).subscribe(resultData => {
        this.resultCount = this.resultCount + resultData?.items?.length;
      });
    }
  }

  fetchDataFromInternetArchiveApi(strings: string[]) {
    for (const string of strings) {
      this.searchService.getDataFromInternetArchive(string).subscribe(data => {
        this.resultCount = this.resultCount + data.count;
      });
    }
  }

}
