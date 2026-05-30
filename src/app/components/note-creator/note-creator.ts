import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../../services/note';

@Component({
  selector: 'app-note-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-creator.html',
  styleUrl: './note-creator.scss',
})

export class NoteCreatorComponent {
  noteTitle: string = "";
  noteContent: string = "";

  constructor(private noteService: NoteService) {}

  onAddNote(): void {
    if (this.noteTitle.trim() === "" || this.noteContent.trim() === "") {
      alert("Please fill out both fields!");
      return;
    }

    //Send new note to the service
    this.noteService.createNote(this.noteTitle, this.noteContent).subscribe({
      next: (newNote) => {
        console.log("Note added successfully!", newNote);
        this.noteService.getNotes(); 

        this.noteTitle = "";
        this.noteContent = "";   
      },

      error: (err) => {
        console.error("Could not save note", err); 
        alert("Could not save note"); 
      }
    });
  }

  onClear(): void {
    this.noteTitle = "";
    this.noteContent = "";
  } 
}
