import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorantsComponent } from './doctorants.component';

describe('DoctorantsComponent', () => {
  let component: DoctorantsComponent;
  let fixture: ComponentFixture<DoctorantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
