import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookingComponent } from './addbooking.component';

describe('AddbookingComponent', () => {
  let component: AddbookingComponent;
  let fixture: ComponentFixture<AddbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddbookingComponent]
    });
    fixture = TestBed.createComponent(AddbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
