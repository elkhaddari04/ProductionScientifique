import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorModalComponent } from './edit-doctor-modal.component';

describe('EditDoctorModalComponent', () => {
  let component: EditDoctorModalComponent;
  let fixture: ComponentFixture<EditDoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
