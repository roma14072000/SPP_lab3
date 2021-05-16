const fs = require("fs-extra");
const Notes = require('../models/Notes')
const notesDB = "notes.json";



module.exports.getNote = async function(request, response) {
	if(!request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
	const note = await Notes.findById(request.query.id);

	if (note != null) {
		response.status(200).send(note);
	} else {
		response.status(404).send({status: 'error', msg: 'Such note doesnt exists'});
	}
}

module.exports.getAllNotes = async function(request, response) {

	console.log(1232)
	const notes = await Notes.find();
	console.log(notes)
	response.status(200).send(notes);
}

module.exports.complete = async function(request, response) {
	if(!request.body || !request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
	const notes = await Notes.findById(request.query.id);
	
	notes.complete = request.body.status;
	await notes.save()
	
	response.status(200).send(notes);
}

module.exports.addNote = async function(request, response) {
	if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});

	const note = new Notes({title: request.body.note.title,
		content: request.body.note.content,
		date: request.body.note.date,
		complete: false});
	
	await note.save()	
	
	response.status(200).send(note);
}

module.exports.updateNote = async function(request, response) {
	if(!request.body) return response.status(400).send({status: 'error', msg: 'Empty body of request'});
	const notes = await Notes.findById(request.body.note.id);

	notes.title = request.body.note.title;
	notes.content = request.body.note.content;
	notes.date = request.body.note.date;


	await notes.save()
	response.status(200).send({status: 'success', msg: 'Note changed'});
}

module.exports.deleteNote = async function(request, response) {
	if(!request.query) return response.status(400).send({status: 'error', msg: 'Empty query of request'});
  
	const notes = await Notes.findById(request.body.note.id);
    await notes.deleteOne()

   
	
    response.status(200).send({status: 'success', msg: 'Note deleted'});
  
}