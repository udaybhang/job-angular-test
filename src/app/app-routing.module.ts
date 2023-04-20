import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'table-filter', pathMatch:'full' },
  { path: 'table-filter', loadChildren: () => import('./table-filter/table-filter.module').then(m => m.TableFilterModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
