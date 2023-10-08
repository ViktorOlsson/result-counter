import { Observable, of } from 'rxjs';
import { SearchService } from './../../data/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatCardModule,
        SharedModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
    inject(
      [HttpTestingController],
      (httpMock: HttpTestingController) => {
    expect(component).toBeTruthy();
  }));

  it('should fetch data from Internet Archive API', () => {
    const searchServiceMock = TestBed.inject(SearchService);
    const data = {count: 5};
    spyOn(searchServiceMock, 'getDataFromInternetArchive').and.returnValue(of(data));

    component.fetchDataFromInternetArchiveApi(['Math']);
    expect(component.resultCount).toBeGreaterThan(0);
  });

  it('should fetch data from Google API', () => {
    const searchServiceMock = TestBed.inject(SearchService);
    const data = {items: [1, 2, 3, 4, 5]};
    spyOn(searchServiceMock, 'getDataFromGoogleApi').and.returnValue(of(data));

    component.fetchGoogleApiData(['Math']);
    expect(component.resultCount).toBeGreaterThan(0);
  });
});
