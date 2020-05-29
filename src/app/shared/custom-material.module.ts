import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  imports: [MATERIAL_MODULES],
  exports: [MATERIAL_MODULES],
  declarations: []
})
export class CustomMaterialModule {}
