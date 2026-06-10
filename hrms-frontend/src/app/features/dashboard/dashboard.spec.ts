import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { of } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard';
const dashboardServiceMock = {
  getStats: () =>
    of({
      data: {
        totalClients: 10,
        totalUsers: 7,
        clientAdmins: 2,
        managers: 0,
        members: 4
      }
    })
};
describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
       providers: [
    {
      provide: DashboardService,
      useValue: dashboardServiceMock
    }
  ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
