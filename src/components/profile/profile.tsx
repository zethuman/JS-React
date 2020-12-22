import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import axios from "../api/axios";
import { ContextUsername } from '../contexts/context-username';
import ProductItem from '../product-item/product-item';
import classes from './profile.module.css';

interface Props {
    id: number;
}

export default function Profile(props: Props): ReactElement {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [likedId, setLikedId] = useState<any[]>([]);
    const username = useContext(ContextUsername);
    const [isClicked, setIsClicked] = useState(false)

    // console.log("Active User id", props.initUser.id)

    useEffect(() => {
        async function fetchData() {
            const likes = await axios.get(`like/?userId_like=${props.id}&liked_like=true`)
            setLikedId([...likes.data]);
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('products');
            setAllProducts([...result.data]);
        }

        fetchData();
    }, []);

    const likedfilteredElements = allProducts.filter(item => likedId.find(like => like.productId === item.id))

    const likedElements = likedfilteredElements.map((item: any) => {
        const { src, id, text, label, description } = item;

        return (
            <ProductItem
                key={id}
                src={src}
                id={id}
                text={text}
                label={label}
                description={description}
            />
        );
    });

    const filteredElements = allProducts.filter(item => item.user_id === props.id)

    const elements = filteredElements.map((item: any) => {
        const { src, id, text, label, description } = item;

        return (
            <ProductItem
                key={id}
                src={src}
                id={id}
                text={text}
                label={label}
                description={description}
            />

        );
    });


    return (
        <>
            <div>
                <div className={classes.profile}>
                    <div>
                        <div className={classes.wrapper} >
                            <img src="/images/img-17.jpg" alt="" className={classes.img} />
                        </div>
                        <div className={classes.info}>
                            <div className={classes.user}>
                                <h1>{username}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.container}>
                <ul className={classes.ul}>
                    <React.Fragment key={uuid()}>
                        <li className={classes.photos} key={uuid()}>
                            <p className={classes.p} onClick={() => setIsClicked(false)}>Photos</p>
                        </li>
                        <li className={classes.photos} key={uuid()}>
                            <p className={classes.p} onClick={() => setIsClicked(true)}>Likes</p>
                        </li>
                    </React.Fragment>
                </ul>
            </div>

            {
                !isClicked &&
                <div className={classes.product} key={uuid()}>
                    {elements}
                </div>
            }

            {
                isClicked &&
                <div className={classes.product} key={uuid()}>
                    {likedElements}
                </div>
            }
        </>
    )
}
