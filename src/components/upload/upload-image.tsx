import React, { ReactElement, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from "uuid";
import validator from 'validator';
import axios from "../api/axios";
import firebase from './firebase';
import classes from './upload-image.module.css';


export enum Actions {
    UPLOADED,
    NOTUPLOADED,
    SUBMITTED,
    NOTSUBMITTED
}

export interface Action {
    type: Actions;
}

interface Props {
    onClose: () => void;
}


export default function UploadImage({ onClose }: Props): ReactElement {
    const [selectedFile, setSelectedFile] = useState<any>();
    const [selectedFileName, setSelectedFileName] = useState('');
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [category_id, setCategory_id] = useState(0)
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>();
    const [isDragged, setIsDragged] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("not");

    const validateName = () => {
        if (validator.isEmpty(text)) {
            setError("empty_name");
            return false;
        } else {
            return true;
        }
    };

    const validateDes = () => {
        if (validator.isEmpty(description)) {
            setError("empty_des");
            return false;
        } else {
            return true;
        }
    };

    const validateCat = () => {
        if (validator.isEmpty(label)) {
            setError("empty_cat");
            return false;
        } else {
            return true;
        }
    };

    console.log(error)

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles[0]);
        previewFile(acceptedFiles[0]);
        setSelectedFile(acceptedFiles[0]);
        setSelectedFileName(acceptedFiles[0].name);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

    const previewFile = (file: any) => {
        setIsDragged(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    let date = new Date();

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

    async function onFileUpload() {
        if (validateName() && validateCat() && validateDes()) {
            setIsUploaded(true)
            let bucketname = 'images';
            let file = selectedFile;
            let storageRef = firebase.storage().ref(`${bucketname}/${selectedFileName}`)
            let uploadTask = await storageRef.put(file).then(storageRef => {
                storageRef.ref.getDownloadURL().then(url => {
                    setUrl(url);
                    console.log(url)
                });
            });
        }

    };

    async function onSubmit() {
        if (validateName() && validateCat() && validateDes()) {
            setIsSubmitted(true);
            const image = {
                src: url,
                product_id: uuid(),
                text: '' ? setError('empty_name') : text,
                label: '' ? setError('empty_cat') : label,
                description: '' ? setError('empty_des') : text,
                category_id: category_id,
                date: newdate
            }

            const result = await axios.post("products", image).then((resp) => {
                console.log(resp.data);
            });
        }
    }

    const onIconHandle = (str: string) => {
        console.log("clicked: ", str)
        setIsVisible(str);
        switch (str) {
            case "people":
                setCategory_id(1);
                setLabel("people");
            case "mountains":
                setCategory_id(2);
                setLabel("people");
            case "cars":
                setCategory_id(3);
                setLabel("people");
            case "3D":
                setCategory_id(4);
                setLabel("people");
            default:
                console.log("Error");
        }
    }

    return (
        <>
            <div className={classes.dl_submit}>
                <div className={classes.block}>   {
                    isDragged === true ? (<div className={classes.block}>
                        {previewSource && (
                            <img src={(previewSource).toString()} alt="chosen" className={classes.img} />
                        )}
                    </div>) : (
                            <section className={classes.container}>
                                <div {...getRootProps()} className={classes.block}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <p>Drag 'n' drop some image here, or click to select image</p>
                                    }
                                </div>
                            </section>)
                }
                </div>
                <div className={classes.form_block}>
                    <div className={classes.form}>
                        <input type="text" placeholder="Name..." className="form-control" onChange={(e) => validator.isEmpty(e.target.value) ? setError('empty_name') : setText(e.target.value)} />
                        <span className={classes.error}>
                            <p>{error === "empty_name" ? "Name can't be empty" : null}</p>
                        </span>
                        <br />
                        <input type="text" placeholder="Description..." className="form-control" onChange={(e) => validator.isEmpty(e.target.value) ? setError('empty_des') : setDescription(e.target.value)} />
                        <span className={classes.error}>
                            <p>{error === "empty_des" ? "Description can't be empty" : null}</p>
                        </span>
                        <br />
                        <div className={classes.icons}>
                            <i className="fas fa-tags"> <span className={isVisible === 'people' ? classes.icon_clicked : classes.icon} onClick={() => onIconHandle('people')}>people</span> </i>
                            <i className="fas fa-tags"> <span className={isVisible === 'cars' ? classes.icon_clicked : classes.icon} onClick={() => onIconHandle('cars')}>cars</span> </i>
                            <i className="fas fa-tags"> <span className={isVisible === 'mountains' ? classes.icon_clicked : classes.icon} onClick={() => onIconHandle('mountains')}>mountains</span> </i>
                            <i className="fas fa-tags"> <span className={isVisible === '3D' ? classes.icon_clicked : classes.icon} onClick={() => onIconHandle('3D')}>3D</span> </i>
                        </div>
                        <span className={classes.error}>
                            <p>{error === "empty_cat" ? "Choose category please" : null}</p>
                        </span>
                        <br />
                        {isUploaded === false ? <button className="form-control" onClick={onFileUpload}>Upload</button> : <button className={classes.success}><i className="fas fa-check"></i> Uploaded</button>}
                    </div>
                </div>
            </div>
            <div className={classes.save}>
                {isSubmitted === false ? <button onClick={onSubmit} className="form-control">Submit</button> : <button className={classes.success}><i className="fas fa-check"></i>  Submitted</button>}
                {isSubmitted === true ? onClose() : null}
            </div>
        </>
    )
}
