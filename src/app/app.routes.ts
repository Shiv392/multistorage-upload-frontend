import { Routes } from '@angular/router';
import { featureRoutes } from './features/features.routes';

export const routes: Routes = [
    {
        path : '',
        pathMatch: "full",
        redirectTo : 'home'
    },
    ...featureRoutes,
    {
        path : '**',
        redirectTo : 'home'
    }
];
