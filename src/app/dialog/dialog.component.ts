import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../country.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  itemSearch : FormControl;
  onAdd = new EventEmitter<string>();
  multiSelect  = false ;
  items = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //Insert data from cliente component (MainFormComponent)
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) 
  { 
    this.itemSearch  = new FormControl('');
    this.multiSelect = (data.multiSelect == undefined) ? false : data.multiSelect ;
  }

  ngOnInit() {
  }

  onClick(): void {
    let userValue = this.itemSearch.value.toUpperCase();
    this.items = Country.filter( value => value.toUpperCase().search(userValue) > -1);
  }

  addItem(value : string){
    this.onAdd.emit(value);
  }

  selectItem(value : string){
    if (this.multiSelect ){
      this.addItem(value);
    }
    else 
      this.dialogRef.close(value);
  }

  cancel(): void {
    // passin some value when closing the dialog
    this.dialogRef.close('only for outuput dialog demonstration.');
  } 

}
