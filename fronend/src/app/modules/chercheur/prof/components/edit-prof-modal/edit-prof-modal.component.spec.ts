import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfModalComponent } from './edit-prof-modal.component';

describe('EditProfModalComponent', () => {
  let component: EditProfModalComponent;
  let fixture: ComponentFixture<EditProfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
