import { StartMarkertComponent } from './../../start-markert/start-markert.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../challenges/challenges';
import { AuthGuard } from '../../shared/auth.guard';
import { AuthorizedGuard } from '../../shared/authorized.guard';
import { Role } from '../../model/role';
import { PaymentGatewayComponent } from '../payment-gateway/payment-gateway.component';

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
            canActivate: [AuthorizedGuard],
          data: { roles: [Role.Admin, Role.User ] }
          },
          {
            path: 'create',
            children: [
              {
                path: '',
                loadChildren: () => import('../CreateChalleges/create.module').then(m => m.MapModule),
                canActivate: [AuthorizedGuard],
                data: { roles: [Role.Admin] }
              }
            ]
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule),
            canActivate : [AuthGuard]
          },
          {
            path: 'detail/:speakerId',
            loadChildren: () => import('../challenges-details/speaker-detail.module').then(m => m.SpeakerDetailModule)
          }
        ]
      },
      {
        path: 'challenges',
        children: [
          {
            path: '',
            loadChildren: () => import('../products-list/speaker-list.module').then(m => m.SpeakerListModule)
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      {
        path: 'listProducts',
        children: [
          {
            path: '',
            loadChildren: () => import('../products-list/speaker-list.module').then(m => m.SpeakerListModule),
            canActivate: [AuthorizedGuard],
           data: { roles: [Role.Admin, Role.User ] }
          },
          {
            path: 'product',
            children: [
              {
                path: '',
                loadChildren: () => import('../add-product/add-product.module').then(m => m.addProductModule),
                canActivate: [AuthorizedGuard],
                data: { roles: [Role.Admin ] }
              }
            ]
          }
        ]
      },
      {
        path: 'winners',
        children: [
          {
            path: '',
            loadChildren: () => import('../validate-winner/validate-winner.module').then(m => m.validateWinnerModule),
            canActivate: [AuthorizedGuard],
         data: { roles: [Role.Admin] }
          },
          {
            path: 'winners-details',
            loadChildren: () => import('../choose-winner/choose-winner.module').then(m => m.chooseWinnerModule),
            canActivate: [AuthorizedGuard],
            data: { roles: [Role.Admin] }
          },
        ]
      },
      {
        path: 'about',      
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)     
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            component: PaymentGatewayComponent,
          },
          {
            path: 'offers',
            loadChildren: () => import('../payment-gateway/offers/offers.module').then(m => m.OffersPageModule)
          }
        ]
      },
      {
        path: 'tickets-management',
        loadChildren: () => import('../tickets-management/tickets-management.module').then( m => m.TicketsManagementPageModule),
        canActivate: [AuthorizedGuard],
        data: { roles: [Role.Admin] }
      },
      {
        path: '',
        redirectTo: '/app/tabs/challenges',
        pathMatch: 'full'
      },
      {
        path: 'support',
        loadChildren: () => import('../support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
        canActivate : [AuthGuard]
      },
      {

        path: 'marketPlace',
        loadChildren: () => import('../../start-markert/startMark.module').then(m => m.startMarkModule),
        canActivate : [AuthGuard]
      }
      ,
      {
        path: 'newChalleges',
        loadChildren: () => import('../new-challeges/new-challeges.module').then(m => m.NewChallegesModule),
        canActivate : [AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

