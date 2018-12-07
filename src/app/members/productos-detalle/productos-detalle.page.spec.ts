import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDetallePage } from './productos-detalle.page';

describe('ProductosDetallePage', () => {
  let component: ProductosDetallePage;
  let fixture: ComponentFixture<ProductosDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
