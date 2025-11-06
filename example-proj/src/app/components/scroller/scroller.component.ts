import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {  // 👈 wait a tick so Angular finishes rendering
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          this.addAnimation();
        }
      });
    }
  }

  private addAnimation(): void {
    const scroller = this.el.nativeElement.querySelector('.scroller');
    if (!scroller) return;

    this.renderer.setAttribute(scroller, 'data-animated', 'true');

    const scrollerInner = scroller.querySelector('.scroller__inner');
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children) as Element[];

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      this.renderer.appendChild(scrollerInner, duplicatedItem);
    });
  }
}
