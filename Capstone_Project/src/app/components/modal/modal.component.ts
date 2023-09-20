import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() selectedPostId!: number |any;
  @Output() closeModalEvent = new EventEmitter()
  sub!: Subscription;
  constructor(public modal: ModalService,private http: CrudService) { }

  ngOnInit(): void {


  }
  closeModal() {
    this.selectedPostId = null; // Imposta l'ID del film selezionato su null per nascondere il modale
    this.closeModalEvent.emit(); // Emetti l'evento di chiusura del modale
  }
  ngOnChanges(): void {

  }


}
