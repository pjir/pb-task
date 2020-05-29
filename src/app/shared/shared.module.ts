import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchModule } from './components/search/search.module';
import { SortByBarModule } from './components/sort-by-bar/sort-by-bar.module';
import { TileModule } from './components/tile/tile.module';
import { WrapperModule } from './components/wrapper/wrapper.module';
import { CustomMaterialModule } from './custom-material.module';

@NgModule({
  declarations: [],
  imports: [CustomMaterialModule],
  exports: [CustomMaterialModule, FlexLayoutModule, WrapperModule, TileModule, SearchModule, SortByBarModule]
})
export class SharedModule {}
