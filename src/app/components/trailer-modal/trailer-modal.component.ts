import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trailer-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SafeUrlPipe],
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.css']
})
export class TrailerModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrailerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trailerUrl: string }
  ) {}


  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
