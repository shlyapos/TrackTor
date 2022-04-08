import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLeaderboardComponent } from './track-leaderboard.component';

describe('TrackLeaderboardComponent', () => {
  let component: TrackLeaderboardComponent;
  let fixture: ComponentFixture<TrackLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
