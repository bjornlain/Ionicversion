
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
        path: 'createWorklogDate/:page',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../create-worklog-date/create-worklog-date.module').then(m => m.CreateWorklogDateModule)
          }
        ]
      },
      {
        path: 'createWorklog/:page',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../create-worklog/create-worklog.module').then(m => m.CreateWorklogModule)
          }
        ]
      },
      {
        path: 'createTask',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../create-task/create-task.module').then(m => m.CreateTaskModule)
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
        path: 'worklog-details',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../worklog-details/worklog-details.module').then(m => m.WorklogDetailsModule)
          }
        ]
      },
      {
        path: 'update-worklog',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../update-worklog/update-worklog.module').then(m => m.UpdateWorklogModule)
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
        redirectTo: '/tabs/createTask',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/update-worklog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
