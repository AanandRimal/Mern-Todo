import { useState } from 'react';
import { useTodosContext } from '../hooks/useTodosContext';
import { useAuthContext } from '../hooks/useAuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TodoForm = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const Todo = { title, description, date };

    const response = await fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      body: JSON.stringify(Todo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setDescription('');
      setDate('');
      dispatch({ type: 'CREATE_TODO', payload: json });
    }
  };

  return (
    <Box
      component="form"
      className="create"
      onSubmit={handleSubmit}
      sx={{
        maxHeight: '450px',
        position: 'fixed',
        top: '50%',
        left: '85%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '24px',
        borderRadius: '4px',
        zIndex: 9999,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'rgb(228, 152, 10);' }}>
        <h4>Add a New TODO</h4>
      </Typography>

      <TextField
        label="TODO Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={emptyFields.includes('title')}
        helperText={emptyFields.includes('title') ? 'This field is required' : ''}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={emptyFields.includes('description')}
        helperText={emptyFields.includes('description') ? 'This field is required' : ''}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Date"
        variant="outlined"
        type="date"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={emptyFields.includes('date')}
        helperText={emptyFields.includes('date') ? 'This field is required' : ''}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          placeholder: 'dd/mm/yyyy',
        }}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ color: 'white' }}>
        Add TODO
      </Button>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
};

export default TodoForm;
