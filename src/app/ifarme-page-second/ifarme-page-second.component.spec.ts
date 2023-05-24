import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfarmePageSecondComponent } from './ifarme-page-second.component';

describe('IfarmePageSecondComponent', () => {
  let component: IfarmePageSecondComponent;
  let fixture: ComponentFixture<IfarmePageSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IfarmePageSecondComponent]
    });
    fixture = TestBed.createComponent(IfarmePageSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
