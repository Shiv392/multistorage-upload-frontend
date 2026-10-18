import { Routes } from "@angular/router";

export const featureRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import("./home/home").then(m => m.Home)
    },
    {
        path: 'upload',
        loadComponent: ()=> import("./layout/layout").then(m=> m.Layout),
        children: [
            {
                path: '',
                pathMatch : "full",
                redirectTo: "disk-storage"
            },
            {
                path: "disk-storage",
                loadComponent: () => import("./disk-storage/disk-storage").then(m => m.DiskStorage)
            },
            {
                path: "db-storage",
                loadComponent: () => import("./db-storage/db-storage").then(m => m.DbStorage)
            },
            {
                path: "bucket-storage",
                loadComponent: () => import("./bucket-storage/bucket-storage").then(m => m.BucketStorage)
            }
        ]
    }

]