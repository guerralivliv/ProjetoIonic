import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './usuario/login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './usuario/perfil/perfil.module#PerfilPageModule' },
  { path: 'add', loadChildren: './produto/add/add.module#AddPageModule' },
  { path: 'detail/:id', loadChildren: './produto/detail/detail.module#DetailPageModule' },
  { path: 'car', loadChildren: './produto/car/car.module#CarPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
