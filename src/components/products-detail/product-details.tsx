import React, { ReactElement, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { products } from "../../mock/products-mock";
import { Comments } from "../../modules/comments";
import CommentsShow from "../comments-show/comments-show";
import CommentsList from "../comments/comments-list";
import ProductDetailsItem from "./product-details-item";
// import axios from '../api/axios';

// interface Props{
//   fetchUrl: string
// }

export default function ProductDetails(): ReactElement {
  const initComments: Comments[] = [];
  // const [products, setProducts] = useState<any[]>([]);

  const match = useRouteMatch<{ product_id: string }>();

//   useEffect(() => {
//     async function fetchData() {
//         const result = await axios.get(fetchUrl);
//         console.log(result.data);
//         setProducts([ ...result.data])
//     }

//     fetchData();
// }, []);


  const filteredElements = products.filter(
    (item) => item.product_id === parseInt(match.params.product_id)
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

  const [comments, setComments] = useState(initComments);

  const onChange = (comment: Comments) => {
    setComments([...comments, comment]);
  };

  const commentsElements = comments.map((item: any) => {
    const { comment, product_id } = item;

    return (
      <li key={product_id} className="list-group-item">
        <CommentsShow comment={comment} />
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
        <CommentsList
          onChange={onChange}
          product_id={parseInt(match.params.product_id)}
        />
      </div>

      <div>{commentsElements}</div>
    </>
  );
}
