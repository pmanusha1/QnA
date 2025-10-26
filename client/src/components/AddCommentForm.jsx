import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { CREATE_COMMENT_ON_QUESTION, CREATE_COMMENT_ON_ANSWER } from '../graphql/mutation'
import { AuthContext } from '../context/AuthContext'
import { Box, TextField, Button } from '@mui/material';

const AddCommentForm = ({ questionId, answerId, onSuccess }) => {
  const { user, token } = useContext(AuthContext)
  const [body, setBody] = useState("")

  const mutation = questionId ? CREATE_COMMENT_ON_QUESTION : CREATE_COMMENT_ON_ANSWER;

  const [addComment] = useMutation(mutation,
    { context: { headers: { Authorization: `Bearer ${token}` } } }
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please login first!');

    if (!questionId && !answerId) {
      console.error('No target ID provided for comment');
      return alert('Failed to add comment: no target specified');
    }

    const variables = questionId ? { body, questionId } : { body, answerId };

    try {
      await addComment({ variables })
      setBody("")
      onSuccess?.()
    } catch (err) {
      console.error("Add comment failed:", err)
      alert("Failed to add comment. Check console for details.")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Write your comment..."
        fullWidth
        multiline
        minRows={1}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Add Comment
      </Button>
    </Box>
  )
}

export default AddCommentForm
