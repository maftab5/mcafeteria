import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksDetailsComponent } from './drinks-details.component';

describe('DrinksDetailsComponent', () => {
  let component: DrinksDetailsComponent;
  let fixture: ComponentFixture<DrinksDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
