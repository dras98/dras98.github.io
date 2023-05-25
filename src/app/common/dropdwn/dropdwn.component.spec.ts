import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdwnComponent } from './dropdwn.component';

describe('DropdwnComponent', () => {
  let component: DropdwnComponent;
  let fixture: ComponentFixture<DropdwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdwnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
