import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link, useParams } from 'react-router-dom';
import { IoReturnUpBackOutline } from "react-icons/io5";

function ProductDetail() {
    const { id } = useParams();
    const { showProduct, productDetails } = useProducts();
    const [primaryImage, setPrimaryImage] = useState(null);
    const [othersImages, setOthersImages] = useState([]);
    const [productImage, setProductImage] = useState();


    useEffect(() => {

        const fetchProduct = async () => {
            await showProduct(id);
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (productDetails && productDetails.product_images) {
            const primary = productDetails.product_images.find((image) => image.is_primary)?.image_url;
            const others = productDetails.product_images.filter((image) => !image.is_primary);
            setPrimaryImage(primary);
            setOthersImages(others);
            console.log("othersImages" ,primaryImage);
        }

    }, [productDetails])


    //   if (!product) return <div className="text-center py-10">Chargement du produit...</div>;
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <Link to='/productst'>
            <IoReturnUpBackOutline />
            </Link>
            {productDetails && (
                <div>
                    <div>
                        <div className="border rounded-xl overflow-hidden mb-4">
                            {primaryImage && (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${primaryImage}`}
                                    alt={productDetails.name}
                                    className="w-full h-[400px] object-cover rounded-xl" />
                            )}
                        </div>

                        <div className="flex gap-4 overflow-x-auto">
                            {othersImages &&  othersImages.map((img) => (
                                <img key={img.id}
                                    src={`http://127.0.0.1:8000/storage/${img.image_url}`}
                                    alt="Miniature"
                                    className={`w-36 h-24 object-cover rounded-lg border-2 cursor-pointer`}
                                    onClick={() => setProductImage(img.image_url)} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h2 className="text-3xl font-bold mb-4">{productDetails.name}</h2>
                        <p className="text-xl text-green-600 font-semibold mb-2">${productDetails.price}</p>
                        {/* <p className="text-gray-700 mb-2">Stock: {productDetails.stock}</p> */}
                        <p className="text-gray-600 mb-2">Status: {productDetails.status}</p>
                        <p className="text-gray-500">Subcategory ID: {productDetails.subcategory.name}</p>
                    </div>
                </div>

            )}
            {/* product details */}



        </div>
    );
}

export default ProductDetail;
