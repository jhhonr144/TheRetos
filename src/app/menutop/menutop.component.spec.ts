import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenutopComponent } from './menutop.component';

describe('MenutopComponent', () => {
  let component: MenutopComponent;
  let fixture: ComponentFixture<MenutopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenutopComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenutopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
