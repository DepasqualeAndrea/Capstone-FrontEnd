import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { forkJoin, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from 'src/app/interface/post.interface';
import { User } from 'src/app/interface/user.interface';
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







  //homePosts: any[] | any;
  //usersImages: any[] = [];
  userPostInfo: any[] = [];;
  postImageUrl: any[] = [];

  homePosts: any[] = [];
  usersImages: SafeUrl[] = [];

  constructor(private http: CrudService, private authService: AuthService, private sanitizer: DomSanitizer) { }


 /* ngOnInit(): void {
    this.http.getAllUsersPosts().subscribe(userInfo => {
      this.homePosts = userInfo.content;

      for (let i = 0; i < this.homePosts.length; i++) {
        const postImg = this.homePosts[i];
        const imageBase64 = postImg.imagedata.imageData;
        const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
        const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
        const imageUrl = safeUrl;
        this.postImageUrl.push(imageUrl);


        for (let j = 0; j < this.homePosts.length; j++) {
          const userPost = this.homePosts[j];
          const userId = userPost.userId; // Assumi che userId sia un UUID valido

          // Ora puoi utilizzare userId per ottenere le informazioni dell'utente
          this.http.getUserById(userId).subscribe(userPostInfo => {
            this.userPostInfo = userPostInfo;
            const imageBase64 = userPostInfo.imagedata.imageData;
            const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
            const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
            const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
            const imageUrl = safeUrl;

            // Aggiungi l'URL dell'immagine a postImageUrl
            this.usersImages.push(imageUrl);
          });
        }
      }
    });
  }*/

  ngOnInit(): void {
    this.http.getAllUsersPosts().subscribe(posts => {
      this.homePosts = posts.content;
      for(let j = 0; j < this.homePosts.length; j++) {
      const postImageUrl = this.homePosts
            const imageBase64 = postImageUrl[j].imagedata.imageData;
            const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
            const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
            const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
            this.postImageUrl.push(safeUrl);
      }
      const userIds = this.homePosts.map(post => post.userId);
      const userObservables = userIds.map(userId => this.http.getUserById(userId));

      forkJoin(userObservables).subscribe(users => {
        this.homePosts.forEach((post, index) => {
          const user = users[index];
          const imageBase64 = user.imagedata.imageData;
          const imageBytes = this.authService.base64ToArrayBuffer(imageBase64);
          const imageBlob = new Blob([imageBytes], { type: 'image/jpeg' });
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageBlob));
          post.userImage = safeUrl;
          post.username = user.username;
        });
      });

    });
  }



}
