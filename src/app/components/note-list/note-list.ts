import {Component, OnInit, Inject, inject} from '@angular/core';
import {Note} from '../../models/note'; 
import {NoteService} from '../../services/note'; 
import {FormsModule} from '@angular/forms';
import {SearchPipe} from '../../pipes/search-pipe';


@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, SearchPipe],
  templateUrl: './note-list.html',
  styleUrl: './note-list.scss',
})

export class NoteListComponent implements OnInit{

  searchTerm: string = ""; 

  //Inject the service
  private noteService = inject(NoteService); 

  //Get the notes signal from the service
  notes = this.noteService.notes; 

  
  //Load notes on start time
  ngOnInit() {
    this.noteService.getNotes(); 
  }

  onEdit(note: Note) {
    this.noteService.setNoteForEdit(note); 
  }

  onDelete(id: string) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.noteService.getNotes(); 
      }
    });
  }
}
