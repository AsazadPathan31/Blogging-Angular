import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Task 1: Import components here

const routes: Routes = [
  {path:"blogs", component: HomepageComponent},
  {path:"", component: HomepageComponent},
  {path:"create", component: CreateEditComponent},
  {path:"adminlogin",component:AdminComponent},
  {path:"profile", component: ProfileComponent},
  {path:"read/:id", component: ReadComponent, },
  {path:"edit/:id", component: CreateEditComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
