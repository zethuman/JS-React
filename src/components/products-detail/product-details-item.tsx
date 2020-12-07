import React, { ReactElement, useRef, useState } from "react";
import ReactGA from "react-ga";
import "../cards/cards.css";
import ModalInfo from "../modals/modal-info";
import ModalShare from "../modals/modal-share";
import "./product-details.css";

interface Props {
  src: string;
  text: string;
  label: string;
  description: string;
  date: Date;
}

export default function ProductDetailsItem({
  src,
  text,
  label,
  description,
  date,
}: Props): ReactElement {
  const [like, setLike] = useState(0);
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);

  sessionStorage.setItem("rating", (like / count).toString());
  ReactGA.initialize("UA-000000-01");

  let rating = parseFloat(sessionStorage.getItem("rating") || "{}");
  let imgRef = useRef<HTMLImageElement>(null);

  //   let pageviews = ReactGA.pageview(
  //     window.location.pathname + window.location.search
  //   );
  let imgUrl = `../../${src}`;

  const handleClick = (e: any) => {
    e.preventDefault();
    setLike(like + 5);
    setCount(count + 1);
    setIsClicked(true);
  };

  const handleCount = () => {
    setLike(like + 0);
    isClicked ? setCount(count + 0) : setCount(count + 1);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let newdate =
    monthNames[date.getUTCMonth() - 1] +
    " " +
    date.getUTCDate() +
    ", " +
    date.getUTCFullYear();

  console.log(imgRef.current?.clientHeight);

  return (
    <>
      <div className="details">
        <img src={`../../${src}`} alt="Travel" ref={imgRef} />
        <div className="box">
          <div className="row">
            <h2>{text}</h2>
          </div>
          <p>{description}</p>
          <div className="download">
            <a href={`../../${src}`} download>
              <p>
                Download <i className="fas fa-download" />{" "}
              </p>
            </a>
          </div>
          <div className="rate">
            <i className="far fa-thumbs-up" onClick={handleClick}></i>
            <span className="rating">
              {rating ? Math.ceil(rating * 100) / 100 : 0}
            </span>
            <i className="far fa-thumbs-down" onClick={handleCount}></i>
          </div>
          <div>
            <button onClick={() => setIsOpenShare(true)} className="share-btn">
              <i className="fas fa-share"></i> Share
            </button>
            <div style={{ zIndex: 1 }}>
              <ModalShare
                open={isOpenShare}
                onClose={() => setIsOpenShare(false)}
              >
                {" "}
                <div className="info-intro">
                  <h2 className="h2-info">Share</h2>
                  {JSON.stringify(sessionStorage.getItem("username")) !=
                  null ? (
                    <p className="date">
                      Photo by{" "}
                      {JSON.stringify(sessionStorage.getItem("username"))}
                    </p>
                  ) : (
                    <p>Login to see author</p>
                  )}
                </div>
                <dl className="dl-info">
                  <div className="views">
                    <a
                      href={"http://pinterest.com/"}
                      className="block"
                      count-layout="horizontal"
                      target="blank"
                    >
                      <i className="fab fa-pinterest share share-pin">
                        {" "}
                        Pinterest
                      </i>
                    </a>
                  </div>
                  <div className="views">
                    <a
                      href={`https://www.facebook.com/sharer.php?u=https:example.com?imageurl=${imgUrl}}`}
                      className="block"
                      count-layout="horizontal"
                      target="blank"
                    >
                      <i className="fab fa-facebook share share-fac">
                        {" "}
                        Facebook
                      </i>
                    </a>
                  </div>
                  <div className="views">
                    <span>
                      <a
                        href={"https://twitter.com/"}
                        className="block"
                        count-layout="horizontal"
                        target="blank"
                      >
                        <i className="fab fa-twitter share share-twit">
                          {" "}
                          Twitter
                        </i>
                      </a>
                    </span>
                  </div>
                  <div className="views">
                    <span>
                      <a
                        href={
                          "https://mail.google.com/mail/u/0/#inbox?compose=new/"
                        }
                        className="block"
                        count-layout="horizontal"
                        target="blank"
                      >
                        <i className="fas fa-envelope share share-mail">
                          {" "}
                          Email
                        </i>
                      </a>
                    </span>
                  </div>
                </dl>
              </ModalShare>
            </div>
          </div>
          <button onClick={() => setIsOpenInfo(true)} className="info">
            <i className="fas fa-info"></i> Info
          </button>
          <div style={{ zIndex: 1 }} className="modal">
            <ModalInfo open={isOpenInfo} onClose={() => setIsOpenInfo(false)}>
              <div className="info-intro">
                <h2 className="h2-info">Info</h2>
                <p className="date">Published on {newdate}</p>
              </div>
              <dl className="dl-info">
                <div className="views">
                  <i className="fas fa-eye info-p"> Views</i>
                  <p className="info-p-count">{}</p>
                </div>
                <div className="downloads">
                  <i className="fas fa-long-arrow-alt-down info-p">
                    {" "}
                    Downloads
                  </i>
                  <p className="info-p-count"> {count}</p>
                </div>
                <div className="downloads">
                  <i className="fas fa-long-arrow-alt-down info-p">
                    {" "}
                    Dimensions
                  </i>
                  <p className="info-p-count">
                    {" "}
                    {imgRef.current?.clientHeight +
                      " x " +
                      imgRef.current?.clientWidth}
                  </p>
                </div>
              </dl>

              <hr />
            </ModalInfo>
          </div>
        </div>
      </div>
    </>
  );
}
