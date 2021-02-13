import { NgModule } from '@angular/core';
import { Routes, Event, RouterModule, NavigationError, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleProductComponent } from './pages/products/single-product/single-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutComponent },

  {
    path: 'products', component: ProductsComponent
  },
  { path: 'products/:productId', component: SingleProductComponent },
  { path: 'contacts', component: ContactsComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Nav started');
        // Show loading indicator
        // $.getScript('/src/js/device.js');
        // $.getScript('/node_modules/jquery/dist/jquery.min.js');
        // $.getScript('/src/js/jquery-2.2.4.min.js');
        // $.getScript('/node_modules/slick-carousel/slick/slick.min.js');
        // $.getScript('/src/js/main.js');
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        console.log('Nav ended');
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
