import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarutilComponent } from './calendarutil.component';

describe('CalendarutilComponent', () => {
  let component: CalendarutilComponent;
  let fixture: ComponentFixture<CalendarutilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarutilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
