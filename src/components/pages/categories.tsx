import { gsap } from "gsap";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "../app/App.css";

interface Props {
  fetchUrl: string;
}

export default function Categories({ fetchUrl }: Props): ReactElement {
  const headRef = useRef(null);
  let textRef = useRef(null);

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(fetchUrl);
      console.log(result.data);
      setCategories([...result.data]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    gsap.from(headRef.current, {
      duration: 2,
      ease: "bounce.out",
      y: -154,
      stagger: {
        amount: 0.15,
      },
    });
  }, [headRef]);

  useEffect(() => {
    gsap.from(textRef.current, {
      duration: 1,
      autoAlpha: 0,
      ease: "power3.out",
      y: -64,
      stagger: {
        amount: 0.15,
      },
    });
  }, [textRef]);

  return (
    <>
      <div>
        <h1 className="categories" ref={headRef}>
          Categories
        </h1>
      </div>
      <div className="cards">
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              {categories.map((category) => (
                <li key={category.category_id} className="cards__item">
                  <Link
                    to={`categories/${category.category_id}`}
                    className="cards__item__link"
                  >
                    <figure
                      className="cards__item__pic-wrap"
                      data-category={category.label}
                    >
                      <img
                        src={`../${category.src}`}
                        alt="Travel"
                        className="cards__item__img"
                      />
                    </figure>
                    <div className="cards__item__info">
                      <h5 className="cards__item__text">{category.text}</h5>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
