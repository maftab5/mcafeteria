import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksCreateComponent } from './drinks-create.component';

describe('DrinksCreateComponent', () => {
  let component: DrinksCreateComponent;
  let fixture: ComponentFixture<DrinksCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
