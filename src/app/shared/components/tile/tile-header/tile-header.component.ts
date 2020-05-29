import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pb-tile-header',
  templateUrl: './tile-header.component.html',
  styleUrls: ['./tile-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileHeaderComponent implements OnInit {
  @Input() lowerSize = false;

  constructor() {}

  ngOnInit(): void {}
}
