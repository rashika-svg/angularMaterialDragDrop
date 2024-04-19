import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-dialog',
  templateUrl: './add-or-edit-dialog.component.html',
  styleUrls: ['./add-or-edit-dialog.component.scss']
})
export class AddOrEditDialogComponent implements OnInit {

  isNewMovie: boolean;
  label: string;
  movieForm: FormGroup = this._fb.group({
    label: [null],
  })

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddOrEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.isNewMovie = data.isNewMovie;
    this.label = data.label;
  }

  ngOnInit(): void {
    this.patchValues();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  patchValues() {
    if (!this.label) return;
    this.movieForm.patchValue({ label: this.label })
  }

  add(): void {
    if (this.movieForm.valid) {
      this.dialogRef.close(this.movieForm.value.label);
    }
  }

  onSubmit(): void {
    this.add();
  }
}
