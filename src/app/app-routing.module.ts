import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { guardGuard } from './service/guard.guard';
import { WarehouseComponent } from './component/warehouse/warehouse.component';
import { HistoryComponent } from './component/history/history.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'warehouse', component: WarehouseComponent,canActivate: [guardGuard]},
  { path: 'history', component: HistoryComponent,canActivate: [guardGuard]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,PageNotFoundComponent,WarehouseComponent,HistoryComponent
]