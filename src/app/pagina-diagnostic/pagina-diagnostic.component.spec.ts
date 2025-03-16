import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDiagnosticComponent } from './pagina-diagnostic.component';

describe('PaginaDiagnosticComponent', () => {
  let component: PaginaDiagnosticComponent;
  let fixture: ComponentFixture<PaginaDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaDiagnosticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
