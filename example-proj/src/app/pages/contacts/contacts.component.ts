import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { ScrollerComponent } from '../../components/scroller/scroller.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, TranslocoModule, ScrollerComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {}
