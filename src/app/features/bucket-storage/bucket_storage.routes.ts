import { Routes } from "@angular/router";

export const BucketStorageRoutes: Routes = [
    {
        path: '',
        redirectTo: 'bucket-server',
        pathMatch: 'full',
    },
    {
        path: 'bucket-server',
        loadComponent: () => import('./bucket-server/bucket-server').then((m) => m.BucketServer),
    },
    {
        path: 'bucket-client',
        loadComponent: () => import('./bucket-client/bucket-client').then((m) => m.BucketClient),
    },
];