import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Divider } from "@mui/material";
import { GET_QUESTION } from "../graphql/mutation";
import AddAnswerForm from "../components/AddAnswerForm";
import AddCommentForm from "../components/AddCommentForm";

export default function QuestionsPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(GET_QUESTION, { variables: { id } });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  const q = data.question;

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4">{q.title}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {q.body}
      </Typography>
      <Typography variant="caption">By {q.author.name}</Typography>

      <Divider sx={{ my: 3 }} />

      {/* Comment on Question */}
      <Typography variant="h6">Comments on this Question</Typography>
      {q.comments.length ? (
        q.comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "1rem" }}>
            <Typography variant="body2">{c.body}</Typography>
            <Typography variant="caption">— {c.author.name}</Typography>
          </div>
        ))
      ) : (
        <Typography>No comments yet.</Typography>
      )}
      <AddCommentForm questionId={q.id} onSuccess={() => refetch()} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Answers</Typography>
      {q.answers.length ? (
        q.answers.map((a) => (
          <div key={a.id} style={{ marginBottom: "1rem" }}>
            <Typography>{a.body}</Typography>
            <Typography variant="caption">— {a.author.name}</Typography>

            {/* Comments on this Answer */}
            {a?.comments?.length ? (
              a.comments.map((c) => (
                <div key={c.id} style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                  <Typography variant="body2">{c.body}</Typography>
                  <Typography variant="caption">— {c.author.name}</Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2" sx={{ marginLeft: "1rem" }}>No comments yet.</Typography>
            )}

            <AddCommentForm answerId={a.id} onSuccess={() => refetch()} />
          </div>
        ))
      ) : (
        <Typography>No answers yet.</Typography>
      )}

      {/* Form to add a new answer */}
      <AddAnswerForm questionId={q.id} onSuccess={() => refetch()} />
    </div>

  );
}
