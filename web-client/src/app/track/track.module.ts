import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackRoutingModule } from './track-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../map/map.module';

import { TrackPageComponent } from './components/track-page/track-page.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { TrackSearchComponent } from './components/track-search/track-search.component';
import { TrackInfoComponent } from './components/track-info/track-info.component';

@NgModule({
  declarations: [
    TrackPageComponent,
    TrackListComponent,
    TrackItemComponent,
    LeftSidebarComponent,
    TrackSearchComponent,
    TrackInfoComponent,
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    MaterialProxyModule,
    FormsModule,
    ReactiveFormsModule,
    MapModule,
  ]
})
export class TrackModule { }
