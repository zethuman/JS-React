import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import classes from './image_crop.module.css';

interface Props {
    src: string;
    onDownloaded: () => void;
}

const pixelRatio = window.devicePixelRatio || 1;

function getResizedCanvas(canvas: any, newWidth: any, newHeight: any) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx?.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        newWidth,
        newHeight
    );

    return tmpCanvas;
}

function generateDownload(previewCanvas: any, crop: any) {
    if (!crop || !previewCanvas) {
        return;
    }

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
        (blob) => {
            const previewUrl = window.URL.createObjectURL(blob);

            const anchor = document.createElement("a");
            anchor.download = "cropPreview.png";
            anchor.href = URL.createObjectURL(blob);
            anchor.click();

            window.URL.revokeObjectURL(previewUrl);
        },
        "image/png",
        1
    );
}

export default function ImageCrop({ src, onDownloaded }: Props) {
    const [upImg, setUpImg] = useState(src);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState<ReactCrop.Crop>({ unit: "%", width: 30, height: 50 });
    const [completedCrop, setCompletedCrop] = useState<any>(null);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, [imgRef]);

    const onClickDownload = () => {
        onDownloaded();
        generateDownload(previewCanvasRef.current, completedCrop);
    }

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef?.current as unknown as HTMLImageElement;
        const canvas = previewCanvasRef.current as unknown as HTMLCanvasElement;
        const crop = completedCrop as any;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d") as any;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <div className="App">
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                className={classes.img}
            />
            <div className={classes.btn}>
                <button
                    className="form-control"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={onClickDownload
                    }
                >
                    Download
                </button>
            </div>

            <div className={classes.wrapper_crop}>
                <canvas
                    ref={previewCanvasRef}
                    className={classes.imgCropped}
                />
            </div>
        </div>
    );
}
