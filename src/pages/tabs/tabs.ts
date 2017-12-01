import { Component } from '@angular/core';

import { ProjectsPage } from '../projects/projects';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

@Component({
selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjectsPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}




