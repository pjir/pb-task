import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TileContentComponent } from './tile-content/tile-content.component';
import { TileHeaderComponent } from './tile-header/tile-header.component';
import { TileComponent } from './tile.component';

@NgModule({
  declarations: [TileComponent, TileHeaderComponent, TileContentComponent, TileHeaderComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [TileComponent, TileContentComponent, TileHeaderComponent]
})
export class TileModule {}
