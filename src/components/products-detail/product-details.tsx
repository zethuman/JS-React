import React, { ReactElement, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "../api/axios";
import classes from '../app/App.module.css';
import CommentsShow from "../comments-show/comments-show";
import CommentsList from "../comments/comments-list";
import ProductDetailsItem from "./product-details-item";


export default function ProductDetails(): ReactElement {
  const [products, setProducts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const match = useRouteMatch<{ id: string }>();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('products');
      setProducts([...result.data]);
      const check = [...result.data].find((item) => item.id === parseInt(match.params.id))
      setError(!check)
    }

    fetchData();
  }, []);

  if (error) {
    throw new Error("Test error")
  }

  useEffect(() => {
    async function fetchComment() {
      const result = await axios.get("comments");
      console.log(result.data);
      setComments([...result.data]);
    }

    fetchComment();
  }, []);


  const filteredElements = products.filter(
    (item) => item.id === parseInt(match.params.id)

  );


  const elements = filteredElements.map((item: any) => {
    const { src, id, text, description, date, download, user_id } = item;

    return (
      <li key={id} className="list-group-item">
        <ProductDetailsItem
          src={src}
          id={id}
          text={text}
          description={description}
          date={date}
          products={products}
          download={download}
          user_id={user_id}
        />
      </li>
    );
  }
  );



  const filteredComments = comments.filter(
    (item) => item.productId === parseInt(match.params.id)
  );

  const commentsElements = filteredComments.map((item: any) => {
    const { username, comment, id } = item;

    return (
      <li key={id} className="list-group-item">
        <CommentsShow comments={comment} username={username} />
      </li>
    );
  });

  return (
    <React.Fragment key={uuid()}>
      <div className={classes.categories}>
        <h1 className={`${classes.h1} ${classes.categories}`}>Products</h1>
      </div>
      <div>{elements}</div>
      <div>
        <CommentsList id={parseInt(match.params.id)} />
      </div>
      <div>{commentsElements}</div>
    </React.Fragment>
  );
}
