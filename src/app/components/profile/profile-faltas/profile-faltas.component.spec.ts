import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFaltasComponent } from './profile-faltas.component';

describe('ProfileFaltasComponent', () => {
  let component: ProfileFaltasComponent;
  let fixture: ComponentFixture<ProfileFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFaltasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
