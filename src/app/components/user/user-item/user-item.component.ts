import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User = new User();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }
  onClickUser() {
    this.router.navigate(['user/', this.user.id]);
  }
}
