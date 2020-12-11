import fs from 'fs';
import React, { ReactElement, useState } from 'react';
import { v4 as uuid } from "uuid";

interface Props {

}

export default function UploadImage({ }: Props): ReactElement {
    const [selectedFile, setSelectedFile] = useState('');
    const [text, setText] = useState('Author thinks about name...');
    const [label, setLabel] = useState('')
    const [description, setDescription] = useState('')
    const [category_id, setCategory_id] = useState(0)
    const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null | undefined>();

    const onFileSelected = (e: any) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0].name);
        previewFile(e.target.files[0])
    }

    const previewFile = (file: any) => {
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

    async function onFileSubmit() {
        const image = {
            src: selectedFile,
            product_id: uuid(),
            text: text,
            label: label,
            description: description,
            category_id: category_id,
            date: newdate
        }

        console.log(previewSource);
        // const result = await axios.post("products", image).then((resp) => {
        //     console.log(resp.data);
        // });
    };

    return (
        <div>
            <input type="file" onChange={onFileSelected} />
            <input type="text" />
            <button onClick={onFileSubmit}>Upload</button>
            <div>
                {previewSource && (
                    <img src={(previewSource).toString()} alt="chosen" style={{ height: "300px" }} />
                )}
            </div>
        </div>
    )
}
