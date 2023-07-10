import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimaPage } from './clima.page';
import { HttpClientModule } from '@angular/common/http';

describe('ClimaPage', () => {
  let component: ClimaPage;
  let fixture: ComponentFixture<ClimaPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(ClimaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
