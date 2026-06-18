import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvButton } from './tv-button.component';

describe('TvButton', () => {
  let component: TvButton;
  let fixture: ComponentFixture<TvButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TvButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
