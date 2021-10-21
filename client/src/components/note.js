import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './note.css';
import { useEffect, useState } from 'react';
import { getApiRequest, postApiRequest } from '../Api';

const Note = () => {
  const [inputs, setInputs] = useState({
    text: '',
  });

  const [notes, setNotes] = useState(null);

  const [response, setResponse] = useState({
    isError: false,
    message: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const getNotes = async () => {
    try {
      const response = await getApiRequest('http://localhost:3001/note/');

      setNotes(response.data.notes);
    } catch (err) {}
  };

  useEffect(() => {
    getNotes();
  }, []);

  const addNewNote = async (e) => {
    setResponse({ isError: false, message: null });
    e.preventDefault();
    if (inputs.text === '') {
      setResponse({
        isError: true,
        message: 'Empty Text not allowed',
      });
      return;
    }
    try {
      await postApiRequest('http://localhost:3001/note/newNote', inputs);
      getNotes();
      setResponse({
        isError: false,
        message: `New Note Added Successfully`,
      });
      setInputs({ text: '' });
    } catch (err) {
      setResponse({
        isError: true,
        message: err?.response?.data?.message || err?.message,
      });
    }
  };
  return (
    <>
      <div className="note-container">
        <Form onSubmit={addNewNote}>
          <Form.Group size="lg" controlId="email">
            <Form.Label id="note">Add Note</Form.Label>
            <Form.Control
              name="text"
              onChange={handleInputChange}
              value={inputs.text}
            />
          </Form.Group>
          <div style={{ textAlign: 'center', margin: '1rem' }}>
            <Button
              block
              size="lg"
              type="submit"
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
              Add New Note
            </Button>
          </div>
        </Form>
        {response.message && (
          <div
            style={{
              color: `${response.isError ? 'red' : 'green'}`,
              textAlign: 'center',
            }}
          >
            {response.message}
          </div>
        )}

        <div>
          {notes &&
            notes.map((note) => {
              return (
                <div key={note.id} className="note-text">
                  {note.Text}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Note;
