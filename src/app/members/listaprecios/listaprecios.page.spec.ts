import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreciosPage } from './listaprecios.page';

describe('ListapreciosPage', () => {
  let component: ListapreciosPage;
  let fixture: ComponentFixture<ListapreciosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreciosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapreciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
