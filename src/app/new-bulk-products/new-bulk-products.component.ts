import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/Services/products/products.service';
import { Router } from '@angular/router';
import { NotificationService } from '../Services/Notifications/notifications.service' 
@Component({
  selector: 'app-new-bulk-products',
  templateUrl: './new-bulk-products.component.html',
  styleUrls: ['./new-bulk-products.component.css']
})
export class NewBulkProductsComponent implements OnInit {
  http: any;

  constructor(private formbuilder : FormBuilder, private notificationsService: NotificationService, private productsService: ProductsService, private router: Router) { }
  
  showSpinner=false;
  
  fileName=""
  fileSize:number
  fileTypeIsNotCsv=false
  formData = new FormData();

  fileData = null;
  uploadedFilePath: string = null;
  preview = ""
  csvProductsForm = this.formbuilder.group({
    csvFile: [,[Validators.required]]
 });
  
 
 ngOnInit(): void {

 }

 public changeListener(files: FileList){
  console.log(files);
  if(files && files.length > 0) {
     let file : File = files.item(0); 
       this.fileName=file.name
       this.fileSize=file.size
       this.fileTypeIsNotCsv=file.type.toLowerCase()!="application/vnd.ms-excel"
       this.fileData=file
       
        /*let reader: FileReader = new FileReader();
       reader.readAsText(file);
       reader.onload = (e) => {
          let csv: string = reader.result as string;
          console.log(csv);
       }*/
  }
 }
  onClickSubmit(){
    this.showSpinner=true
      this.formData.append( "file", this.fileData,this.fileData.name);
      this.productsService.uploadProductsCsvFile(this.formData).subscribe(
        resp=>{
            if(resp=='COMPLETED') { this.notificationsService.warn("Fichier traité avec succée") }
            if(resp=='FAILED') { this.notificationsService.warn("Le fichier contient des erreurs veuillez les vérifier et réssayer."); } 
            this.refreshPage();
            this.showSpinner=false
        },
        error =>{
          if(error.status==0){
            this.notificationsService.warn("Vous avez modifier le fichier après l'avoir chargé! Veuillez réessayer")
          } else{
            console.warn(JSON.stringify(error))
            this.notificationsService.warn("Erreur inconnue")
          }
          this.showSpinner=false
        });
  }

  private refreshPage() {
    this.router.navigate(['']);
    this.router.navigate(['/products/add']);
  }
 }
