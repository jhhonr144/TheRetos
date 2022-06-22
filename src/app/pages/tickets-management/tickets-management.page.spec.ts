import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsManagementPage } from './tickets-management.page';

describe('TicketsManagementPage', () => {
  let component: TicketsManagementPage;
  let fixture: ComponentFixture<TicketsManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
