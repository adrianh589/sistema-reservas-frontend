import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTiposHabitacionComponent } from './lista-tipos-habitacion.component';

describe('ListaTiposHabitacionComponent', () => {
  let component: ListaTiposHabitacionComponent;
  let fixture: ComponentFixture<ListaTiposHabitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTiposHabitacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaTiposHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
