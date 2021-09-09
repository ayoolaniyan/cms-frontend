import {
  Component,
  Output,
  OnInit,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
