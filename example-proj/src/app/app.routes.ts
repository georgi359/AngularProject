import { Routes } from '@angular/router';

export const routes: Routes = [
	// Root / home route (lazy-load standalone HomeComponent)
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
	},

	// Contacts page (lazy-loaded standalone component)
	{
		path: 'contacts',
		loadComponent: () => import('./pages/contacts/contacts.component').then((m) => m.ContactsComponent),
	},

	// Add additional lazy-loaded routes (documents, reports, etc.) as needed.
];
