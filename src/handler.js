const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Notes succesfully added',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Fail to Add Notes',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});
const getNotebyIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Your note is not available',
    });
    response.code(404);
    return response;
};
const editNotebyIdHandler = (request, h) => {
    const { id } = request.params;

    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes[index] = {
            ...notes[index],
                title,
                tags,
                body,
                updatedAt,
            };
        const response = (h.response({
            status: 'success',
            message: 'Your notes has been updated',
        }))
        response.code(200);
        return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Fail to update notes',
        });
        response.code(404);
        return response;
    }
const deleteNotebyIdHandler = (request, h) => {
    const {id} = request.params;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1){
        notes.splice(index,1);
        const response = (h.response({
            status: 'success',
            message: 'Your notes has been deleted',
        }))
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Failed to delete notes',
    })
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNotebyIdHandler, editNotebyIdHandler, deleteNotebyIdHandler };
