import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreciosDetallePage } from './listaprecios-detalle.page';

describe('ListapreciosDetallePage', () => {
  let component: ListapreciosDetallePage;
  let fixture: ComponentFixture<ListapreciosDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreciosDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapreciosDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
