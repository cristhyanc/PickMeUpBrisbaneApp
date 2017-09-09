import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingServiceComponent } from './booking-service.component';

describe('BookingServiceComponent', () => {
  let component: BookingServiceComponent;
  let fixture: ComponentFixture<BookingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
