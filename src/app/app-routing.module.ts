import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate  } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule) },
  { path: 'admin',canActivate: [AuthGuard] , loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
  { path: 'admin/carts',canActivate: [AuthGuard], loadChildren: () => import('./pages/admin/carts/carts.module').then(m => m.CartsModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
