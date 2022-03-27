import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  imports:[
    materialModules
  ],
  exports:[
    materialModules
  ],
})

export class MaterialProxyModule { }