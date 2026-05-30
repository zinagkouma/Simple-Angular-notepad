import {Pipe, PipeTransform} from '@angular/core';
import {Note} from '../models/note';

@Pipe({
  name: "search",
  standalone: true
})

export class SearchPipe implements PipeTransform {
  //Take the array of notes and the string that is typed
  transform(notes: Note[], searchTerm: string): Note[] {
    
    if (!notes || !searchTerm) {
      return notes; 
    }

    //Convert the search term to lowercase so it's case-insensitive
    const lowerCaseTerm = searchTerm.toLowerCase(); 

    //Keep the note if the title OR content includes the search term
    return notes.filter(note => 
      note.title.toLowerCase().includes(lowerCaseTerm) ||
      note.content.toLowerCase().includes(lowerCaseTerm)
    );
  }
}
