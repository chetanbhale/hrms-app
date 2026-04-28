import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientContainer } from './client-container';

describe('ClientContainer', () => {
  let component: ClientContainer;
  let fixture: ComponentFixture<ClientContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
