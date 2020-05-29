import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pb-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent {
  @HostBinding('class.pb-wrapper') wrapperClass = true;
}
