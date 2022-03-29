import React, { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMesssage] = useState("");

  const handleTextChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMesssage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMesssage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMesssage(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "" && text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      handleAdd(newFeedback);
      setText("");
      setRating(10);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h1>How would you rate your service with us?</h1>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button isDisabled={btnDisabled} type="submit">
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
