import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartMarkertComponent } from './start-markert.component';

describe('StartMarkertComponent', () => {
  let component: StartMarkertComponent;
  let fixture: ComponentFixture<StartMarkertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMarkertComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartMarkertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
