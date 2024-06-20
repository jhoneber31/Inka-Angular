import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInformationComponent } from './history-information.component';

describe('HistoryInformationComponent', () => {
  let component: HistoryInformationComponent;
  let fixture: ComponentFixture<HistoryInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryInformationComponent]
    });
    fixture = TestBed.createComponent(HistoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
