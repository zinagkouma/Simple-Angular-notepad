import {Component, effect} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NoteService} from '../../services/note';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.scss',
})


export class NoteEditorComponent {
  noteTitle: string = "";
  noteContent: string = "";

  isEditMode: boolean = false;
  editingNoteId: string | null = null;

  isVisible: boolean = false; 


  //Inject the service 
  constructor(private noteService: NoteService) {
 
    //Watch the notes signal automatically 
    effect(() => {
      const note = this.noteService.currentEditableNote();

      if (note) {
        this.noteTitle = note.title;
        this.noteContent = note.content;
        this.editingNoteId = note._id ?? null;
        this.isEditMode = true; 
        this.isVisible = true;
      }
    });
  }


  onSaveNote(): void {
    if (this.noteTitle.trim() === "" || this.noteContent.trim() === "") {
      alert("Please fill out both fields!"); 
      return; 
    }

    if (this.isEditMode && this.editingNoteId !== null) {
      this.noteService.updateNote(this.editingNoteId, this.noteTitle, this.noteContent).subscribe({
        next: () => {
          this.noteService.getNotes();
          this.ResetForm(); 
        },
        error: (err) => console.error("Could not update note", err)
      });

    } else {
      this.noteService.createNote(this.noteTitle, this.noteContent).subscribe({
        next: () => {
          this.noteService.getNotes(); 
          this.ResetForm();
        },
        error: (err) => console.error("Could not create note", err)
      });
    }
  }

  private ResetForm(): void {
    this.noteTitle = "";
    this.noteContent = "";
    this.isEditMode = false;
    this.editingNoteId = null;
    this.isVisible = false; 

    this.noteService.setNoteForEdit(null as any); 
  }

  onCancel(): void {
    this.noteTitle = "";
    this.noteContent = ""; 
    this.isVisible = false;  
  }
}

