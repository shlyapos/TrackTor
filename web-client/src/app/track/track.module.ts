import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackRoutingModule } from './track-routing.module';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrackPageComponent } from './components/track-page/track-page.component';


@NgModule({
  declarations: [
    TrackPageComponent,
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    MaterialProxyModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TrackModule { }
