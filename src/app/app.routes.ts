import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Admin } from './components/admin/admin';
import { Dashboard } from './components/dashboard/dashboard';
import { AdminCarList } from './components/admin-car-list/admin-car-list';
import { CarForm } from './components/car-form/car-form';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { AdminLayout } from './components/admin-layout/admin-layout';

import { adminGuard } from './guards/admin-guard';
import { AdminMessages } from './components/admin-messages/admin-messages';

export const routes: Routes = [
  // FRONT OFFICE
  { path: '', component: Home },
  { path: 'cars', component: ProductList },
  { path: 'cars/:id', component: ProductDetail },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },

  // CONNEXION ADMIN
  {
    path: 'admin',
    component: Admin,
    pathMatch: 'full',
  },

  // ROUTES IMBRIQUÉES (CHILD ROUTES)
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'cars', component: AdminCarList },
      { path: 'cars/add', component: CarForm },
      { path: 'cars/edit/:id', component: CarForm },
      { path: 'messages', component: AdminMessages },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // PAGE INTROUVABLE
  { path: '**', redirectTo: '' },
];
