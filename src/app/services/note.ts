import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../models/note'; 
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class NoteService {
  
  //URL to point to Backend server endpoints
  private apiUrl = "http://localhost:3000/api/notes"; 

  //Signals for note list and editable note 
  notes = signal<Note[]>([]); 
  currentEditableNote = signal<Note | null>(null); 


  //Inject the HttpClient 
  constructor(private http: HttpClient) {};

  getNotes(): void {
    this.http.get<Note[]>(this.apiUrl).subscribe({
      next: (data) => this.notes.set(data),
      error: (err) => console.error("Could not load notes", err)
    });
  }

  createNote(title: string, content: string): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, {title, content}); 
  } 
  
  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateNote(id: string, title: string, content: string): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, {title, content});
  }

  setNoteForEdit(note: Note | null): void {
    this.currentEditableNote.set(note); 
  } 
}
