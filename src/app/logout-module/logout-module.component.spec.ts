import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutModuleComponent } from './logout-module.component';

describe('LogoutModuleComponent', () => {
  let component: LogoutModuleComponent;
  let fixture: ComponentFixture<LogoutModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
