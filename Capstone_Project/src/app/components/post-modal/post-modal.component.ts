import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss']
})
export class PostModalComponent implements OnInit {
  @Input() selectedPostId!: number | any;
  @Output() closeModalEvent = new EventEmitter()


  selectedFile: File | null = null;
  loadBar = true;
  currentUser: any;
  imageUrl!: any;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



  closeModal() {
    this.selectedPostId = null; // Imposta l'ID del film selezionato su null per nascondere il modale
    this.closeModalEvent.emit(); // Emetti l'evento di chiusura del modale
  }

  constructor(public modal: ModalService, private http: CrudService, private authService: AuthService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.authService.getCurrentUserInfo().subscribe(userInfo => {
      this.currentUser = userInfo;
      console.log(this.currentUser)

      const imageBase64 = userInfo.imagedata.imageData;
      const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
      const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
      const SafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob))
      this.imageUrl = SafeUrl;
      console.log(this.imageUrl);
    });
  }

  confermaCreazionePost(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const conferma = window.confirm('Sei sicuro di voler creare il post?');

    if (conferma) {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      formData.append('description', form.value.description);
      formData.append('imageLink', form.value.imageLink);
      this.http.savePost(formData).subscribe(
        (response: any) => {
          console.log('Post Pubblicato Correttamente', response);
          alert('Perfetto ora puoi tornare alla home');
          window.location.reload();
          this.loadBar = false;
        },
        (error: any) => {
          console.error('Errore durante la pubblicazione del Post', error);
          this.loadBar = false;
        }
      );
    }
  }

}
