import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { RouterLink, RouterLinkActive, } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SubscriberCardComponent } from "../siderbar/subscriber-card/subscriber-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

type MenuItems = {
  label: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    SvgIconComponent,
    NgForOf,
    RouterLink,
    ImgUrlPipe,
    SubscriberCardComponent,
    AsyncPipe,
    RouterLinkActive

  ],
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;

  menuItems: MenuItems[] = [
    {
      label: "Home",
      icon: 'home',
      link: '/profile/me',
    },
    {
      label: "Chats",
      icon: 'chats',
      link: '/chats',
    },
    {
      label: "Search",
      icon: 'search',
      link: '/search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
