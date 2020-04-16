import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalpageComponent } from './animalpage.component';

describe('AnimalpageComponent', () => {
  let component: AnimalpageComponent;
  let fixture: ComponentFixture<AnimalpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
