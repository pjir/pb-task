import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SortByBarComponent } from './sort-by-bar.component';

@NgModule({
  declarations: [SortByBarComponent],
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
  exports: [SortByBarComponent]
})
export class SortByBarModule {}
