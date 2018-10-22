import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'pay-mate-web';

  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) { }

}
