import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-home-pag',
  templateUrl: './home-pag.component.html',
  styleUrls: ['./home-pag.component.scss']
})
export class HomePagComponent implements OnInit {

  modal = {
    showModal: false
  };

  openModal(postId: number, userId: number): void {
    // Memorizza l'ID del film selezionato
    setTimeout(() => {
      this.selectedPostId = postId;
      this.selectedUserId = userId;
      console.log(this.selectedPostId);
      console.log(this.selectedUserId);
      this.modal.showModal = true;// Mostra il modale
    }, 400)
  }
  closeModal() {
    this.modal.showModal = false;
  }
  selectedPostId!: number | any;
  selectedUserId!: number | any;
  searchQuery!: string;
  searchResults: any[] = [];
  /* onSearchInput(event: Event): void {
     this.searchQuery = (event.target as HTMLInputElement).value;
     if (this.searchQuery.trim() !== '') {
       this.http.searchMovies(this.searchQuery).subscribe(
         (searchResults) => {
           this.searchResults = searchResults.results;
           console.log(searchResults)
         },
         (error) => {
           console.error(error);
         }
       );
     } else {
       // Resetta i risultati della ricerca quando l'input è vuoto
       this.searchResults = [];
     }
   }*/


  usersPosts!: {
    nome: string,
    cognome: string,
    username: string,
    email: string,
    imagedata: {
      imageData: ""
    },
    post:
    [{
      postId: number,
      userId: number;
      datacreazione: string,
      description: string,
      comment: {}[],
      imagedata: {
        imageData: string
      }
    }]
  }[]




  usersImages: any[] = [];
  allUserPosts: any[] = []
  postImageUrl: any[] = [];
  constructor(private http: CrudService, public modale: ModalService, private authService: AuthService, private sanitizer: DomSanitizer) { }

  //@ViewChild('image', { static: false }) imageElement!: ElementRef;

  ngOnInit(): void {
    this.http.getAllUsersPosts().subscribe(userInfo => {
      this.usersPosts = userInfo.content
      //console.log(this.usersPosts)


      for (let i = 0; i < this.usersPosts.length; i++) {
        const userPost = this.usersPosts[i];
        const imageBase64 = userPost.imagedata.imageData;
        const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
        const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
        const imageUrl = safeUrl;
        this.usersImages.push(imageUrl);

        for (let j = 0; j < userPost.post.length; j++) {
          const postImageBase64 = userPost.post[j].imagedata.imageData;
          const postImageBytes = this.authService.base64ToArrayBuffer(postImageBase64);
          const postImageBlob = new Blob([postImageBytes], { type: 'image/jpeg' });
          const postSafeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(postImageBlob));
          const postImageUrl = postSafeUrl;
          //console.log(postImageUrl);
          this.postImageUrl.push(postImageUrl);
         // console.log(this.usersPosts);
        }
      }
    })
  }

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }


}
