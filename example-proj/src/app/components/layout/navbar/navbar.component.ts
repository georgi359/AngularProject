import { Component, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoModule, UpperCasePipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  dropdownOpen = false;
  private languageButton?: HTMLElement | null;
  private boundToggleLang?: EventListener;

  constructor(private host: ElementRef<HTMLElement>, private transloco: TranslocoService) {}

  toggleDropdown(event: MouseEvent) {
    // prevent the document click handler from immediately closing the panel
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngAfterViewInit(): void {
    // wire the language button without touching HTML
    this.languageButton = this.host.nativeElement.querySelector('.language-button');
    if (this.languageButton) {
      this.boundToggleLang = this.toggleLang.bind(this) as EventListener;
      this.languageButton.addEventListener('click', this.boundToggleLang);
    }
  }

  ngOnDestroy(): void {
    if (this.languageButton && this.boundToggleLang) {
      this.languageButton.removeEventListener('click', this.boundToggleLang);
    }
  }

  private toggleLang(): void {
    const current = this.transloco.getActiveLang();
    const next = current === 'en' ? 'bg' : 'en';
    this.transloco.setActiveLang(next);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.dropdownOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.dropdownOpen = false;
  }
}

// Backwards compatibility: export the old name as well
export const Navbar = NavbarComponent;
