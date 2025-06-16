// app.component.ts

import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	loading$ = this.loadingService.loading$;
	constructor(private loadingService: LoadingService) {}
}
