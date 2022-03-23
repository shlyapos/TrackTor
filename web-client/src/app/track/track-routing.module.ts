import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackPageComponent } from './components/track-page/track-page.component';

const routes: Routes = [
  { 
    path: '',
    component: TrackPageComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackRoutingModule { }