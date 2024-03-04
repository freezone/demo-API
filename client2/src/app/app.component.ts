import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'MyApp';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  afterNextRender(){
    //this.setCurrentUser();
  }

  setCurrentUser() {
    const userString: string | null = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUsers(user);
  }

}
