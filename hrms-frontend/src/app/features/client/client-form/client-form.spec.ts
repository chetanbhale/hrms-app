import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientForm } from './client-form';
import { ActivatedRoute } from '@angular/router';

describe('ClientForm', () => {
  let component: ClientForm;
  let fixture: ComponentFixture<ClientForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientForm],
      providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: () => null
            }
          }
        }
      }
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
