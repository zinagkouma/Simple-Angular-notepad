import express, {Request, Response} from 'express'; 
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config(); 


const app = express();
const PORT = 3000; 

//Middleware
app.use(cors());
app.use(express.json());

//Database connection
const dbURI = process.env.MONGO_URI!; 

mongoose.connect(dbURI)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => console.error("Database connection error", err)); 


//Database Model and Schema
interface INote {
  title: string;
  content: string;
  updatedAt: Date;
}  

const noteSchema = new mongoose.Schema<INote> ({
  title: {type: String, required: true},
  content: {type: String, default: ""},
  updatedAt: {type: Date, default: Date.now}
});

const Note = mongoose.model<INote>("Note", noteSchema); 


// -REST API Endpoints- 

//Get all notes
app.get(
 '/api/notes',
 async(req: Request, res: Response) => {
   try {
    const notes = await Note.find().sort({updatedAt: -1});
    res.json(notes); 

   } catch (error) {
     res.status(500).json({message: "Error fetching notes", error}); 
   } 
 });

 //Create new note
 app.post(
  '/api/notes',
   async(req: Request, res: Response) => {
     try {
      const {title, content} = req.body; 
      const newNote = new Note({title, content});
     
      //Save the note
      await newNote.save(); 
      res.status(201).json(newNote); 

     } catch (error) {
       res.status(400).json({message: "Error creating note", error}); 
     }
  });

 //Update existing note
 app.put(
  '/api/notes/:id',
   async(req: Request, res: Response) => {
     try {
      const {title, content} = req.body; 
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {title, content, updatedAt: new Date()},
        {new: true}
      );  

      if (!updatedNote) return res.status(404).json({message: "Note not found"});
      res.json(updatedNote); 

     } catch (error) {
       res.status(400).json({message: "Error updating note", error});
     }
   }); 

 //Delete note
 app.delete(
  '/api/notes/:id',
   async(req: Request, res: Response) => {
     try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      
      if (!deletedNote) return res.status(404).json({message: "Note not found"});
      res.json({message: "Note deleted successfully!"});

     } catch (error) {
       res.status(500).json({message: "Error deleting note", error}); 
     }
   });
   
   
 // -Start server-  
 app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
 });   

