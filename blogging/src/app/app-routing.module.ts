import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadComponent } from './read/read.component';
// Task 1: Import components here

const routes: Routes = [
	{ path: 'blogs', component: HomepageComponent },
	{ path: '', component: HomepageComponent },
	{ path: 'create', component: CreateEditComponent },
	{ path: 'adminlogin', component: AdminComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'read/:id', component: ReadComponent },
	{ path: 'edit/:id', component: CreateEditComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
