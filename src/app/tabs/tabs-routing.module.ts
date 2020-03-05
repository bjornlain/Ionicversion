import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'clock',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../clock/clock.module').then(m => m.ClockModule)
          }
        ]
      },
      {
        path: 'schedule',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../schedule/schedule.module').then(m => m.ScheduleModule)
          }
        ]
      },
      {
        path: 'day',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../day/day.module').then(m => m.DayModule)
          }
        ]
      },
      {
        path: 'schedule/:day/:codingHours/:codingMinutes/:socialHours/:socialMinutes',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../schedule/schedule.module').then(m => m.ScheduleModule)
          }
        ]
      },
      {
        path: 'week',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../week/week.module').then(m => m.WeekModule)
          }
        ]
      },
      {
        path: 'new-schedule/:day',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../new-schedule/new-schedule.module').then(m => m.NewScheduleModule)
          }
        ]
      },
      {
        path: 'timesheets',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../timesheets/timesheets.module').then(m => m.TimeSheetsModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../settings/settings.module').then(m => m.SettingsModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/day',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/timesheets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
