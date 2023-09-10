import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-home-pag',
  templateUrl: './home-pag.component.html',
  styleUrls: ['./home-pag.component.scss']
})
export class HomePagComponent implements OnInit {
  searchQuery!: string;
  searchResults: any[] = [];

  modal = {
    showModal: false
  };

  openModal(postId: number) {
    // Memorizza l'ID del film selezionato
    setTimeout(() => {
      //this.selectedMovieId = movieId;
      this.modal.showModal = true;// Mostra il modale

    }, 400)
  }
  closeModal() {
    this.modal.showModal = false; // Chiudi il modale impostando showModal su false
    //this.selectedMovieId = null;
    // Resetta l'ID del film selezionato
  }


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
  constructor(private http: CrudService, public modale: ModalService) { }

  ngOnInit(): void {
  }

}