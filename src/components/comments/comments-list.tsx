import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import axios from "../api/axios";
import { ContextUsername } from "../contexts/context-username";
import classes from "./comments-list.module.css";

interface Props {
  id: number;
}

export default function CommentsList(props: Props): ReactElement {
  const [comments, setComments] = useState("");

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const context = useContext(ContextUsername);
  console.log(context);
  const isLogged = sessionStorage.getItem('isLogged' || '{}');

  useEffect(() => {
    commentRef.current?.focus();
  }, []);

  async function onSubmit() {
    const model = {
      productId: props.id,
      username: isLogged === "false" ? "Unauthorized user" : context,
      comment: comments,
    };
    console.log("Model:", model);
    const result = await axios.post("comments", model).then((resp) => {
      console.log(resp.data);
    });
    console.log(result);
    window.location.reload();
  }
  

  return (
    <>
      <div className={classes.commentform}>
        <textarea
          name=""
          id=""
          placeholder="Please enter your comment here."
          ref={commentRef}
          onChange={(e) => setComments(e.target.value)}
          className={classes.textarea}
        ></textarea>
        <br />
        <button type="submit" onClick={onSubmit} className={classes.github_btn}>
          {" "}
          Comment{" "}
        </button>
        <hr />
        <h2 className={classes.h2}>Comments</h2>
      </div>
    </>
  );
}
