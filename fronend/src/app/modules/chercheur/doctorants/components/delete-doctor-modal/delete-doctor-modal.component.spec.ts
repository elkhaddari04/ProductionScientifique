import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoctorModalComponent } from './delete-doctor-modal.component';

describe('DeleteDoctorModalComponent', () => {
  let component: DeleteDoctorModalComponent;
  let fixture: ComponentFixture<DeleteDoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDoctorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
