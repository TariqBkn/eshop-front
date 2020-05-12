import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsHistoryComponent } from './checkouts-history.component';

describe('CheckoutsHistoryComponent', () => {
  let component: CheckoutsHistoryComponent;
  let fixture: ComponentFixture<CheckoutsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
