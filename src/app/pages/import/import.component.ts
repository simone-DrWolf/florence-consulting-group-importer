import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  public fileToUpload: File | null = null;
  public displayedColumns: string[] = ['name', 'lastname', 'email', 'address'];
  public dataSource: any[] = [];

  constructor(
    private readonly snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
    let ds: any[] = [];
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileToUpload!);
    reader.onload = (e) => {
      let csv: string = reader.result as string;

      const lines = csv.split("\n");

      lines.forEach(l => {
        let obj: any = {};
        const currentline = l.split(';');

        for (let j = 0; j < this.displayedColumns.length; j++) {
          obj[this.displayedColumns[j]] = currentline[j];
        }

        ds.push(obj);
      });

      this.dataSource = ds;
    }
  }

  import(): void {
    // TODO: Implement method
  }
}
