import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../challenges/challenges';
import { AuthGuard } from '../../shared/auth.guard';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'challenges',
        children: [
          {
            path: '',
            component: SchedulePage,
            
            canActivate : [AuthGuard]
            
            
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule),
            canActivate : [AuthGuard]
          }
        ]
      },
      {
        path: 'challenges',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          },
          {
            path: 'challenges-details/:speakerId',
            loadChildren: () => import('../challenges-details/speaker-detail.module').then(m => m.SpeakerDetailModule)
          }
        ]
      },

      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: () => import('../CreateChalleges/create.module').then(m => m.MapModule),
            canActivate : [AuthGuard]
          }
        ]
      },
      {
        path: 'listProducts',
        children: [
          {
            path: '',
            loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule),
           
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            loadChildren: () => import('../add-product/add-product.module').then(m => m.addProductModule),
            canActivate : [AuthGuard]
          }
        ]
      },
      {
        path: 'winners',
        children: [
          {
            path: '',
            loadChildren: () => import('../validate-winner/validate-winner.module').then(m => m.validateWinnerModule)
          },
          {
            path: 'winners-details',
            loadChildren: () => import('../choose-winner/choose-winner.module').then(m => m.chooseWinnerModule)
          },
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/challenges',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

