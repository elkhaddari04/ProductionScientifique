import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfModalComponent } from './delete-prof-modal.component';

describe('DeleteProfModalComponent', () => {
  let component: DeleteProfModalComponent;
  let fixture: ComponentFixture<DeleteProfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
