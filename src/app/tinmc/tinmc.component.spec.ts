import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinmcComponent } from './tinmc.component';

describe('TinmcComponent', () => {
  let component: TinmcComponent;
  let fixture: ComponentFixture<TinmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
