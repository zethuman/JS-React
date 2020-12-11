import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
import axios from "../api/axios";
import { ContextUsername } from "../contexts/context-username";
import "./comments-list.css";

interface Props {
  product_id: number;
}

export default function CommentsList(props: Props): ReactElement {
  const [comments, setComments] = useState("");

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const context = useContext(ContextUsername);
  console.log(context);

  useEffect(() => {
    commentRef.current?.focus();
  }, []);

  async function onSubmit() {
    const model = {
      comment_id: uuid(),
      product_id: props.product_id,
      username: context === "{}" ? "Unauthorized user" : context,
      comment: comments,
    };
    console.log("Model:", model);
    const result = await axios.post("comments", model).then((resp) => {
      console.log(resp.data);
    });
    console.log(result);
  }

  return (
    <>
      <div className="commentform">
        <textarea
          name=""
          id=""
          placeholder="Please enter your comment here."
          ref={commentRef}
          onChange={(e) => setComments(e.target.value)}
          className="textarea"
        ></textarea>
        <br />
        <button type="submit" onClick={onSubmit} className="github-btn">
          {" "}
          Comment{" "}
        </button>
        <hr />
        <h2>Comments</h2>
      </div>
    </>
  );
}
