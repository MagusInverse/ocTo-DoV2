import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTareaPage } from './agregar-tarea.page';

describe('AgregarTareaPage', () => {
  let component: AgregarTareaPage;
  let fixture: ComponentFixture<AgregarTareaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
