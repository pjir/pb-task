import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pb-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {
  @Input() iconSrc = '';

  constructor() {}

  ngOnInit(): void {}
}
