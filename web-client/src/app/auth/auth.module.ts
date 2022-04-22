import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialProxyModule } from '../material-proxy/material-proxy.module';

import { AuthPageComponent } from './components/auth-page/auth-page.component';

@NgModule({
  declarations: [
      AuthPageComponent,
  ],
  imports: [
      CommonModule,
      AuthRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialProxyModule,
  ],
})
export class AuthModule { }
