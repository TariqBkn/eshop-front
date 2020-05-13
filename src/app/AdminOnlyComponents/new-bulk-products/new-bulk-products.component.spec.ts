import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBulkProductsComponent } from './new-bulk-products.component';

describe('NewBulkProductsComponent', () => {
  let component: NewBulkProductsComponent;
  let fixture: ComponentFixture<NewBulkProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBulkProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBulkProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
