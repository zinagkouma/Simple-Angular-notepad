import {Component} from '@angular/core';
import {NoteListComponent} from './components/note-list/note-list';
import {NoteEditorComponent} from './components/note-editor/note-editor';
import {NoteCreatorComponent} from './components/note-creator/note-creator';

@Component({
  selector: 'app-root',
  imports: [NoteCreatorComponent ,NoteListComponent, NoteEditorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  title = 'angular-notepad';
}
