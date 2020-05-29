import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pb-tile-content',
  templateUrl: './tile-content.component.html',
  styleUrls: ['./tile-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileContentComponent implements OnInit {
  @HostBinding('class.pb-tile-content') tileContentClass = true;

  constructor() {}

  ngOnInit(): void {}
}
