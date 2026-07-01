import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { IconLink } from './icon-link.component';

describe('IconLink', () => {
  let component: IconLink;
  let fixture: ComponentFixture<IconLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconLink],
    }).compileComponents();

    fixture = TestBed.createComponent(IconLink);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
