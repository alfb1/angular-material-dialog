import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  myItems=[];
  constructor(
    private myDialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    // construct de dialog (myDialog) and pass info into data field with multiSelect as true - can select many items
    const dialogRef = this.myDialog.open(DialogComponent, { data: { multiSelect:true } });

    // waiting for close action from dialog and if exists any response, use it
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        console.log('value from dialog : ', result)
      }
    });

    //waiting for values selecteds at dialog component
    const sub = dialogRef.componentInstance.onAdd.subscribe( item => {
      if ( this.myItems.indexOf(item) == -1){
        this.myItems.push(item);
      }
    });
  }

  //table component delete item, when exists
  delete(item){
    const ind = this.myItems.indexOf(item);
    this.myItems.splice(ind, 1);
  }



}
