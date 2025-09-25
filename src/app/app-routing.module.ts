import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './auth/auth.guard';
import {BreadBrandComponent} from './components/breadcrumbs/bread-brand/bread-brand.component';
import {BreadModelComponent} from './components/breadcrumbs/bread-model/bread-model.component';
import {BreadVersionComponent} from './components/breadcrumbs/bread-version/bread-version.component';
import {BreadcrumbComponent} from './components/breadcrumbs/breadcrumb/breadcrumb.component';
import {BreadGenerationComponent} from './components/breadcrumbs/bread-generation/bread-generation.component';
import {BreadEngineComponent} from './components/breadcrumbs/bread-engine/bread-engine.component';
import {HomeComponent} from "./components/home/home.component";



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'edit-archives', component: BreadcrumbComponent, canActivate: [AuthGuard], data: {roles: ['admin']}, },

    {path: 'specs', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
        {path: '', component: BreadBrandComponent},
        {path: ':brand', children: [
            {path: '', component: BreadModelComponent},
            {path: ':model', children: [
                {path: 'gens', children: [
                    {path:'', component: BreadGenerationComponent},
                    {path: ':generation', children: [
                        {path: '', component: BreadVersionComponent},
                        {path: ':version', children: [
                            {path: '', component: BreadEngineComponent},
                        ]}
                    ]},
                ]},
                {path: 'vers', children: [
                    {path: '', component: BreadVersionComponent},
                    {path: ':version', children: [
                        {path: '', component: BreadEngineComponent},
                    ]}
                ]},
                {path: 'engines', component: BreadEngineComponent},
            ]},
        ]},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
