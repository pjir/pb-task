import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @HostBinding('class.pb-search') pgSearchClass = true;
  @Input() searchKeyword = '';
  @Output() readonly searchKeywordChange = new EventEmitter<string>();

  constructor() {}

  onSearchChange(newValue: string) {
    this.searchKeywordChange.emit(newValue);
  }

  clearValue() {
    this.searchKeywordChange.emit('');
  }
}
