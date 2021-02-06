import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  // {
  //   path: 'products', component: ProductsComponent, children: [
  //     { path: '', redirectTo: 'all-products', pathMatch: 'full', },
  //     { path: 'all-products', component: AllProductsComponent },
  //     { path: 'products/:productCategory', component: ProductCategoryComponent }
  //   ]
  // },

  { path: 'contacts', component: ContactsComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
