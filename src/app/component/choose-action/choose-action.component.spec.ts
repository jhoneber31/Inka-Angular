import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseActionComponent } from './choose-action.component';

describe('ChooseActionComponent', () => {
  let component: ChooseActionComponent;
  let fixture: ComponentFixture<ChooseActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseActionComponent]
    });
    fixture = TestBed.createComponent(ChooseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
