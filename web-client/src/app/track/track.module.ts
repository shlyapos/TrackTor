import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackRoutingModule } from './track-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { MapModule } from '../map/map.module';

import { TrackPageComponent } from './components/track-page/track-page.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { TrackInfoComponent } from './components/track-info/track-info.component';
import { TrackLeaderboardComponent } from './components/track-leaderboard/track-leaderboard.component';
import { TrackInfoBackwardComponent } from './components/track-info-backward/track-info-backward.component';

@NgModule({
  declarations: [
    TrackPageComponent,
    TrackListComponent,
    TrackItemComponent,
    LeftSidebarComponent,
    TrackSearchComponent,
    TrackInfoComponent,
    TrackLeaderboardComponent,
    TrackInfoBackwardComponent,
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    MaterialProxyModule,
    FormsModule,
    ReactiveFormsModule,
    TextareaAutosizeModule,
    MapModule,
  ]
})
export class TrackModule { }
