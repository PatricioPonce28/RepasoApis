import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { AutoLoginGuard } from './guards/auto-login-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  // Rutas de autenticación (con AutoLoginGuard)
  {
    path: 'auth/login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'auth/register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'auth/forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule),
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'auth/verify-email',
    loadChildren: () => import('./pages/auth/verify-email/verify-email.module').then(m => m.VerifyEmailPageModule)
  },
  // Rutas protegidas (con AuthGuard) - TU SIDEMENU
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'outbox',
    loadChildren: () => import('./pages/outbox/outbox.module').then( m => m.OutboxPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'archived',
    loadChildren: () => import('./pages/archived/archived.module').then( m => m.ArchivedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spam',
    loadChildren: () => import('./pages/spam/spam.module').then( m => m.SpamPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}