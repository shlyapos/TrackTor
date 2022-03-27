import { Component, Input } from '@angular/core';
import { Track } from 'src/app/shared/models/track';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.less']
})
export class TrackItemComponent {

  @Input()
  public track!: Track;
  
}
