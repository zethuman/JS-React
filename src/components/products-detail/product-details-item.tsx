import React, { ReactElement, useEffect, useReducer, useRef, useState } from "react";
import { Likes } from "../../modules/likes";
import axios from "../api/axios";
// import classes from "../cards/cards.module.css";
import ImageCrop from "../image-crop/image-crop";
import ModalDownload from "../modals/modal-download";
import ModalInfo from "../modals/modal-info";
import ModalShare from "../modals/modal-share";
import isOpenReducer, { OC } from "../reducers/is-open-reducer";
import stateReducer, { Actions } from "../reducers/state-reducer";
import classes from "./product-details.module.css";

interface Props {
  src: string;
  id: number;
  text: string;
  description: string;
  date: Date;
  products: any[],
  download: number,
  user_id: number
}

let selectedLike: Likes;

export default function ProductDetailsItem({
  src,
  text,
  id,
  description,
  date,
  download,
  products,
  user_id
}: Props): ReactElement {
  const [like, setLike] = useState(false);
  const [author, setAuthor] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user') || '{}')
  const isLogged = sessionStorage.getItem('isLogged' || '{}');

  const [downloads, dispatchDownloads] = useReducer(stateReducer, download);
  const [visitors, dispatchVisitors] = useReducer(stateReducer, 0);
  const [isOpenInfo, dispatchInfo] = useReducer(isOpenReducer, false);
  const [isOpenDownload, dispatchDownload] = useReducer(isOpenReducer, false);
  const [isOpenShare, dispatchShare] = useReducer(isOpenReducer, false);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('like');
      const user__id = user['id']
      if (user__id) {
        selectedLike = [...result.data].find(like => like.productId === id && like.userId === +user__id);
        if (selectedLike) { setLike(selectedLike.liked) }
      }
    }


    if (isLogged === 'true') fetchData();
  }, []);


  useEffect(() => {
    async function patchViews() {
      const model = products.find((p) => p.id === id);
      model.views += 1;
      const res = await axios.patch(`products/${id}`, model)
      // setVisitors(model.views + 1);
      console.log("Model", model.views)
      dispatchVisitors({ type: Actions.SET, payload: model.views })
    }

    patchViews();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`users/${user_id}`);
      setAuthor([result.data].map(val => val.name).toString());
    }


    fetchData();
  }, []);


  async function onSubmit() {
    const likeModel = {
      "productId": id,
      "userId": user['id'],
      "liked": !like
    }

    console.log("Selected Like", selectedLike)
    if (!selectedLike && isLogged === 'true') {
      const result = await axios.post("like", likeModel).then((resp) => {
        console.log(resp.data.id)
      });
      setLike(!like);
      return;
    }

    if (isLogged === 'true') {
      const res = await axios.patch(`like/${selectedLike.id}`, likeModel).then((resp) => {
        console.log("Patched, ", resp.data)
      });
    }
    setLike(!like);
  }


  let imgRef = useRef<HTMLImageElement>(null);

  let imgUrl = `${src}`;

  async function onDownloaded() {
    const model = products.find((p) => p.id === id);
    model.download += 1;
    const res = await axios.patch(`products/${id}`, model);
    // setDownloads(model.download + 1)
    dispatchDownloads({ type: Actions.SET, payload: download })
  }


  return (
    <>
      <div className={classes.details}>
        <img src={`${src}`} alt="Travel" id={classes.node} ref={imgRef} className={classes.image_detail} />
        <div className={classes.box}>
          <div className={classes.row}>
            <h2 className={classes.h2}>{text}</h2>
          </div>
          <p>{description}</p>
          <div>
            <p onClick={() => dispatchDownload({ type: OC.OPEN, payload: true })} className={classes.download}>
              Download <i className="fas fa-download"></i>
            </p>
            <div style={{ zIndex: 1 }}>
              <ModalDownload
                open={isOpenDownload}
                onClose={() => dispatchDownload({ type: OC.CLOSE, payload: true })}
              >
                <div className={classes.info_intro}>
                  <h2 className={classes.h2_info}>Crop to download</h2>
                </div>
                <dl className={classes.dl_info}>
                  <ImageCrop src={src} onDownloaded={onDownloaded} />
                </dl>
              </ModalDownload>
            </div>
          </div>
          <div className={classes.rate} >
            <p className={classes.download} onClick={() => onSubmit()}> Like  <i className={like === false ? "fas fa-heart" : `fas fa-heart ${classes.like_icon}`} ></i></p>
          </div>
          <div>
            <button onClick={() => dispatchShare({ type: OC.OPEN, payload: true })} className={classes.share_btn}>
              <i className="fas fa-share"></i> Share
            </button>
            <div style={{ zIndex: 1 }}>
              <ModalShare
                open={isOpenShare}
                onClose={() => dispatchShare({ type: OC.CLOSE, payload: true })}
              >
                {" "}
                <div className={classes.info_intro}>
                  <h2 className={classes.h2_info}>Share</h2>
                  {author !=
                    '' ? (
                      <p className={classes.date}>
                        Photo by{" "}
                        {author}
                      </p>
                    ) : (
                      <p>Public</p>
                    )}
                </div>
                <dl className={classes.dl_info}>
                  <div className={classes.views}>
                    <a
                      href={"http://pinterest.com/"}
                      className={classes.block}
                      count-layout="horizontal"
                      target="blank"
                    >
                      <i className={`fab fa-pinterest ${classes.share} ${classes.share_pin}`}>
                        {" "}
                        Pinterest
                      </i>
                    </a>
                  </div>
                  <div className={classes.views}>
                    <a
                      href={`https://www.facebook.com/sharer.php?u=https:example.com?imageurl=${imgUrl}`}
                      className={classes.block}
                      count-layout="horizontal"
                      target="blank"
                    >
                      <i className={`fab fa-facebook ${classes.share} ${classes.share_fac}`}>
                        {" "}
                        Facebook
                      </i>
                    </a>
                  </div>
                  <div className={classes.views}>
                    <span>
                      <a
                        href={"https://twitter.com/"}
                        className={classes.block}
                        count-layout="horizontal"
                        target="blank"
                      >
                        <i className={`fab fa-twitter ${classes.share} ${classes.share_twit}`}>
                          {" "}
                          Twitter
                        </i>
                      </a>
                    </span>
                  </div>
                  <div className={classes.views}>
                    <span>
                      <a
                        href={
                          "https://mail.google.com/mail/u/0/#inbox?compose=new/"
                        }
                        className={classes.block}
                        count-layout="horizontal"
                        target="blank"
                      >
                        <i className={`fas fa-envelope ${classes.share} ${classes.share_mail}`}>
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
          <button onClick={() => dispatchInfo({ type: OC.OPEN, payload: true })} className={classes.info}>
            <i className="fas fa-info"></i> Info
          </button>
          <div style={{ zIndex: 1 }} className={classes.modal}>
            <ModalInfo open={isOpenInfo} onClose={() => dispatchInfo({ type: OC.CLOSE, payload: true })}>
              <div className={classes.info_intro}>
                <h2 className={classes.h2_info}>Info</h2>
                <p className={classes.date}>Published on {date}</p>
              </div>
              <dl className={classes.dl_info}>
                <div className={classes.views}>
                  <i className={`fas fa-eye ${classes.info_p}`}> Views</i>
                  <p className={classes.info_p_count}>{visitors - 1}</p>
                </div>
                <div className={classes.downloads}>
                  <i className={`fas fa-long-arrow-alt-down ${classes.info_p}`}>
                    {" "}
                    Downloads
                  </i>
                  <p className={classes.info_p_count}> {downloads}</p>
                </div>
                <div className={classes.downloads}>
                  <i className={`fas fa-long-arrow-alt-down ${classes.info_p}`}>
                    {" "}
                    Dimensions
                  </i>
                  <p className={classes.info_p_count}>
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
