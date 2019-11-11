import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksUpdateComponent } from './drinks-update.component';

describe('DrinksUpdateComponent', () => {
  let component: DrinksUpdateComponent;
  let fixture: ComponentFixture<DrinksUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
