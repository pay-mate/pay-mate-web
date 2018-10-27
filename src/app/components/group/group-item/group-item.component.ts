import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Group } from './../../../shared/models/group.model';
import { GroupService } from './../../../shared/services/group.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html'
})
export class GroupItemComponent implements OnInit {

  @Input() group: Group = new Group();
  groupId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {

  }
//   onClickGroup() {
//     this.route.params.subscribe(params => {
//       const groupId = params.groupId;
//       this.groupService.select(groupId)
//         .subscribe((group: Group){
//         });
//     this.router.navigate(['groups/', this.group.id]);
//   });
// }

onClickGroup() {
    this.groupService.select(this.group.id)
      .subscribe();
  this.router.navigate(['groups/', this.group.id]);
}


// onClickGroup() {
//   this.route.params.pipe(
//     map(params => this.groupId = params.id),
//     switchMap((groupId: string) => {
//       debugger;
//       return this.groupService.select(this.groupId);
//     })
//   ).subscribe((group: Group){

//   });

//       this.router.navigate(['groups/', this.group.id]);

// }


  onDeleteGroup() {
    this.groupService.delete(this.group.id).subscribe(() => {} );
    this.router.navigate(['groups/']);
  }

}
