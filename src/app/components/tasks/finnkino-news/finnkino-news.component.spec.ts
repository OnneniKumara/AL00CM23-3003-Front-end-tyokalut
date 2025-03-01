import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FinnkinoNewsComponent} from './finnkino-news.component';

describe('FinnkinoNewsComponent', () => {
  let component: FinnkinoNewsComponent;
  let fixture: ComponentFixture<FinnkinoNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinnkinoNewsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinnkinoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
