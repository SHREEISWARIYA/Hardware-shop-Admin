import React, { useState, useEffect } from 'react';
import { Modal, message, Button, Typography, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { API_URL } from '../../lib';


const { Dragger } = Upload;

interface AddProductModalProps {
    visible: boolean;
    handleCancel: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, handleCancel }) => {
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [productDescription, setProductDescription] = useState<string | null>(null);
    const [productCategory, setProductCategory] = useState<string | null>(null);
    const [productBrand, setProductBrand] = useState<string | null>(null);
    const [productTitle, setProductTitle] = useState<string | null>(null);
    const [productOriginalPrice, setProductOriginalPrice] = useState<number | null>(null);
    const [productDiscountPrice, setProductDiscountPrice] = useState<number | null>(null);
    const [productRating, setProductRating] = useState<number>(0);
    const [showDragger, setShowDragger] = useState<boolean>(true);
    useEffect(() => {
        if (!visible) {
            setUploadedFile(null);
            setShowDragger(true);
        }
    }, [visible]);

    const handleUploadChange = (info: any) => {
        const { originFileObj } = info.file;
        // if (status === 'done') {
        setUploadedFile(originFileObj);
        setFile(originFileObj);
        setShowDragger(false);
        // } else if (status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
        // }
    };

    const handleOk = async () => {
        if (
            file &&
            productDescription &&
            productDiscountPrice &&
            productOriginalPrice &&
            productCategory &&
            productBrand &&
            productTitle) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('productDescription', productDescription);
                formData.append('category', productCategory);
                formData.append('brand', productBrand);
                formData.append('title', productTitle);
                formData.append('path', '/product-details/');
                formData.append('ratings', (Math.floor(Math.random() * 501) + 500).toString());
                formData.append('productOriginalPrice', productOriginalPrice.toString());
                formData.append('productDiscountPrice', productDiscountPrice.toString());
                formData.append('productRating', productRating.toString());
                const response = await fetch(`${API_URL}/products`, {
                    method: 'POST',
                    body: formData
                })
                const res = await response.json()
                if (res.status == "success") {
                    message.success(res.message)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1800)
                } else {
                    message.error(res.message)
                }
                console.log(res)
            } catch (err) {
                message.error(`${err}`)
                console.log(err);
            }
            handleCancel();
            // window.location.reload()
        } else {
            message.error('Please upload a file and provide a valid description.');
        }
    };


    const handleButtonCancel = () => {
        setUploadedFile(null);
        setProductDescription(null);
        setShowDragger(true);
        handleCancel();
    };

    return (
        <Modal
            title="Upload Files"
            open={visible}
            onCancel={handleButtonCancel}
            footer={null}
        >
            {showDragger && (
                <ImgCrop showGrid aspect={5 / 4}>
                    <Dragger onChange={handleUploadChange} showUploadList={false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </ImgCrop>
            )}
            {uploadedFile && (
                <>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src={URL.createObjectURL(uploadedFile)}
                            alt="Uploaded File"
                            style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Title</Typography.Title>
                        <Input
                            count={{
                                show: true,
                                max: 20,
                            }}
                            placeholder='Product Title'
                            onChange={(e) => setProductTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Original Price</Typography.Title>
                        <Input
                            type='number'
                            placeholder='Product Original Price'
                            onChange={(e) => setProductOriginalPrice(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Discount Price</Typography.Title>
                        <Input
                            type='number'
                            placeholder='Product Discount Price'
                            onChange={(e) => setProductDiscountPrice(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Description</Typography.Title>
                        <Input
                            count={{
                                show: true,
                                max: 600,
                            }}
                            placeholder='Product Description'
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Category</Typography.Title>
                        <Input
                            count={{
                                show: true,
                                max: 10,
                            }}
                            placeholder='Product Category'
                            onChange={(e) => setProductCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Brand</Typography.Title>
                        <Input
                            count={{
                                show: true,
                                max: 10,
                            }}
                            placeholder='Product Brand'
                            onChange={(e) => setProductBrand(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Rating</Typography.Title>
                        <Input
                            type='number'
                            placeholder='Product Rating for 5'
                            onChange={(e) => setProductRating(Number(e.target.value))}
                        />
                    </div>
                </>
            )}

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <Button onClick={handleButtonCancel} style={{ marginRight: '10px' }}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>OK</Button>
            </div>
        </Modal>
    );
};

export default AddProductModal;
