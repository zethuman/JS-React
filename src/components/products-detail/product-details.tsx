import React, { ReactElement, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "../api/axios";
import CommentsShow from "../comments-show/comments-show";
import CommentsList from "../comments/comments-list";
import ProductDetailsItem from "./product-details-item";

interface Props {
  fetchUrl: string;
}

export default function ProductDetails({ fetchUrl }: Props): ReactElement {
  const [products, setProducts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  const match = useRouteMatch<{ product_id: string }>();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(fetchUrl);
      setProducts([...result.data]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchComment() {
      const result = await axios.get("comments");
      console.log(result.data);
      setComments([...result.data]);
    }

    fetchComment();
  }, []);

  const filteredElements = products.filter(
    (item) => item.product_id === parseInt(match.params.product_id) || item.product_id === match.params.product_id
  );

  const elements = filteredElements.map((item: any) => {
    const { src, product_id, text, label, description, date } = item;

    return (
      <li key={product_id} className="list-group-item">
        <ProductDetailsItem
          src={src}
          text={text}
          label={label}
          description={description}
          date={date}
        />
      </li>
    );
  });

  // const [comments, setComments] = useState(initComments);

  // const onChange = (comment: Comments) => {
  //   setComments([...comments, comment]);
  // };

  const filteredComments = comments.filter(
    (item) => item.product_id === parseInt(match.params.product_id)
  );

  const commentsElements = filteredComments.map((item: any) => {
    const { username, comment, comment_id } = item;

    return (
      <li key={comment_id} className="list-group-item">
        <CommentsShow comments={comment} username={username} />
      </li>
    );
  });

  return (
    <>
      <div>
        <h1 className="categories">Products</h1>
      </div>
      <div>{elements}</div>
      <div>
        <CommentsList product_id={parseInt(match.params.product_id)} />
      </div>
      <div>{commentsElements}</div>
    </>
  );
}
