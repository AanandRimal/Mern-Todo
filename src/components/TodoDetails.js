// import { useTodosContext } from '../hooks/useTodosContext';
// import { useState, useEffect } from 'react';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { useAuthContext } from '../hooks/useAuthContext';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';

// const TodoDetails = ({ Todo }) => {
//   const { dispatch } = useTodosContext();
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedTodo, setUpdatedTodo] = useState({
//     title: Todo.title,
//     description: Todo.description,
//     date: Todo.date,
//   });
//   const { user } = useAuthContext();

//   useEffect(() => {
//     setUpdatedTodo({
//       title: Todo.title,
//       description: Todo.description,
//       date: Todo.date,
//     });
//   }, [Todo]);

//   if (!user) {
//     return null;
//   }

//   const handleDelete = async () => {
//     if (!user) {
//       return;
//     }

//     const response = await fetch(`http://localhost:4000/api/todos/${Todo._id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: 'DELETE_TODO', payload: json });
//     }
//   };

//   const handleOpenEdit = () => {
//     if (!user) {
//       return;
//     }
//     setIsEditing(true);
//   };

//   const handleUpdate = async () => {
//     if (!user) {
//       return;
//     }

//     const response = await fetch(`http://localhost:4000/api/todos/${Todo._id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: JSON.stringify(updatedTodo),
//     });
//     const json = await response.json();

//     if (response.ok) {
//       const updatedPayload = { ...json, _id: Todo._id }; // Include the matching todo ID in the updated payload
//       dispatch({ type: 'UPDATE_TODO', payload: updatedPayload });
//       setIsEditing(false); // Disable editing mode after successful update
//       window.location.reload(); // Reload the page
//     }
//   };

//   const handleInputChange = (event) => {
//     if (!user) {
//       return;
//     }
//     const { name, value } = event.target;
//     setUpdatedTodo((prevTodo) => ({
//       ...prevTodo,
//       [name]: value,
//     }));
//   };

//   const formattedDate = new Date(Todo.date).toLocaleDateString();
//   const currentDate = new Date();

//   // Check if the todo is active or completed based on the date
//   const isActiveTodo = currentDate < new Date(Todo.date);

//   return (
//     <>
//       {isActiveTodo && ( // Render only if the todo is active
//         <Box
//           sx={{
//             marginBottom: 4,
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             boxShadow: '10px 10px 10px 10px rgb(90, 90, 90)',
//             padding: '16px',
//             borderRadius: '4px',
//             transition: 'box-shadow 0.3s ease-in-out',
//             '&:hover': {
//               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
//               cursor: 'pointer',
//             },
//           }}
//         >
//           <Typography variant="h6" gutterBottom sx={{ color: 'rgb(228, 152, 10)' }}>
//             <h4>{Todo.title}</h4>
//           </Typography>
//           <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
//             <strong>Description: </strong>
//             {Todo.description}
//           </Typography>

//           <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
//             <strong>Date: </strong>
//             {formattedDate}
//           </Typography>

//           <Typography variant="body2" gutterBottom sx={{ color: 'black' }}>
//             {formatDistanceToNow(new Date(Todo.createdAt), { addSuffix: true })}
//           </Typography>

//           <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
//             <IconButton aria-label="Delete" onClick={handleDelete}>
//               <DeleteIcon />
//             </IconButton>
//             {!isEditing && (
//               <IconButton aria-label="Edit" onClick={handleOpenEdit}>
//                 <EditIcon />
//               </IconButton>
//             )}
//           </Stack>

//           {isEditing && (
//             <Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
//               <form onSubmit={handleUpdate}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       name="title"
//                       label="Title"
//                       fullWidth
//                       value={updatedTodo.title}
//                       onChange={handleInputChange}
//                       sx={{ backgroundColor: 'white' }}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       name="description"
//                       label="Description"
//                       fullWidth
//                       value={updatedTodo.description}
//                       onChange={handleInputChange}
//                       sx={{ backgroundColor: 'white' }}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       name="date"
//                       label="Date"
//                       type="date"
//                       fullWidth
//                       value={updatedTodo.date}
//                       onChange={handleInputChange}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       sx={{ backgroundColor: 'white' }}
//                     />
//                   </Grid>
//                 </Grid>

//                 <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
//                   Submit
//                 </Button>
//               </form>
//             </Box>
//           )}
//         </Box>
//       )}
//     </>
//   );
// };

// export default TodoDetails;
import { useTodosContext } from '../hooks/useTodosContext';
import { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const TodoDetails = ({ Todo, isCompleted }) => {
  const { dispatch } = useTodosContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: Todo.title,
    description: Todo.description,
    date: Todo.date,
  });
  const { user } = useAuthContext();

  useEffect(() => {
    setUpdatedTodo({
      title: Todo.title,
      description: Todo.description,
      date: Todo.date,
    });
  }, [Todo]);

  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://localhost:4000/api/todos/${Todo._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: json });
    }
  };

  const handleOpenEdit = () => {
    if (!user) {
      return;
    }
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://localhost:4000/api/todos/${Todo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedTodo),
    });
    const json = await response.json();

    if (response.ok) {
      const updatedPayload = { ...json, _id: Todo._id }; // Include the matching todo ID in the updated payload
      dispatch({ type: 'UPDATE_TODO', payload: updatedPayload });
      setIsEditing(false); // Disable editing mode after successful update
    }
  };

  const handleInputChange = (event) => {
    if (!user) {
      return;
    }
    const { name, value } = event.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const formattedDate = new Date(Todo.date).toLocaleDateString();

  const timeRemaining = !isCompleted ? formatDistanceToNow(new Date(Todo.date), { addSuffix: true }) : null;

  return (
    <Box
      sx={{
        marginBottom: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '10px 10px 10px 10px rgb(90, 90, 90)',
        padding: '16px',
        borderRadius: '4px',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        },
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'rgb(228, 152, 10)' }}>
        <h4>{Todo.title}</h4>
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
        <strong>Description: </strong>
        {Todo.description}
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ color: 'black' }}>
        <strong>Date: </strong>
        {formattedDate}
      </Typography>
      {isCompleted && (
      <Typography variant="body2" gutterBottom sx={{ color: 'black' }}>
        <strong>TODO Expired </strong>
        </Typography>
)}
     

      {!isCompleted && (
        <Box>
               <Typography variant="body2" gutterBottom sx={{ color: 'black' }}>
        <strong>TODO Expires </strong>
        {timeRemaining}
      </Typography>
        <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
      
          <IconButton aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          {!isEditing ? (
            <IconButton aria-label="Edit" onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="Cancel" onClick={handleCancelEdit}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </Stack>
        </Box>
      )}

      {isEditing && (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Title"
                  fullWidth
                  value={updatedTodo.title}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  value={updatedTodo.description}
                  onChange={handleInputChange}
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
  <TextField
    name="date"
    label="Date"
    type="date"
    fullWidth
    value={new Date(updatedTodo.date).toISOString().slice(0, 10)}
    onChange={handleInputChange}
    InputLabelProps={{
      shrink: true,
    }}
    sx={{ backgroundColor: 'white' }}
  />
</Grid>

            </Grid>

            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default TodoDetails;
