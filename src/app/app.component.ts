import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class.pg-app') readonly pgAppClass = true;
  @HostBinding('class.is-mobile-transaction') isMobileTransaction = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggleMobile() {
    this.isMobileTransaction = !this.isMobileTransaction;
    this.gotoTop();
  }
  gotoTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }
  }
}
