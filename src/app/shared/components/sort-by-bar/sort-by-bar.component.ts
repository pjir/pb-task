import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SortByOption, SortByValue } from './sort-by-bar.model';

/**
 * Create bar with buttons to which we can assing sort actions
 */
@Component({
  selector: 'pb-sort-by-bar',
  templateUrl: './sort-by-bar.component.html',
  styleUrls: ['./sort-by-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'pbSortByBar'
})
export class SortByBarComponent {
  /** Default values */
  #value: SortByValue = { sortBy: 'SORT_BY_DATE', sortOrder: 'DESC' };

  /** Set default class to this component */
  @HostBinding('class.pb-sort-by-bar') readonly sortByBarClass = true;

  /** Button options */
  @Input()
  sortByOptions: SortByOption[] = [];

  @Input()
  set value(newValue: SortByValue) {
    if (newValue && newValue !== this.#value) {
      this.#value = newValue;
    }
  }
  get value() {
    return this.#value;
  }

  /**
   * Value emitter
   */
  @Output() readonly valueChange = new EventEmitter<SortByValue>();

  constructor() {}

  /**
   * Set correct order and emit value to EventEmitter
   *
   * @param event Material toggle button event
   */
  changeValue(event: MatButtonToggleChange) {
    const prevValue = this.value.sortBy;
    const newValue = event.value;
    if (prevValue === newValue) {
      this.value.sortOrder = this.value.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    }
    this.value.sortBy = newValue;
    this.emitValue();
  }

  /**
   * Emit changed value to EventEmitter
   */
  emitValue() {
    this.valueChange.emit(this.value);
  }
}
