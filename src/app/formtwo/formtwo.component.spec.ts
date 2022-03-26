import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtwoComponent } from './formtwo.component';

describe('FormtwoComponent', () => {
  let component: FormtwoComponent;
  let fixture: ComponentFixture<FormtwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormtwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
