import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../Hook/useTitle';

const SingleProduct = ({ handleDeleteProduct, product, index }) => {
    const { categoryName, condition, description, img, location, originalprice, productname, resaleprice, sellername, utcDate, yearsofuse, availability, paid, _id } = product;
    useTitle('Product');
    // console.log(product);

    const handleAdvertise = () => {
        const advertisement = {
            categoryName,
            condition,
            description,
            img,
            location,
            originalprice,
            productname,
            resaleprice,
            sellername,
            utcDate,
            yearsofuse,
            availability,
            paid,
            bookingId: _id
        };

        fetch('https://listit-classified-server.vercel.app/advertisement', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(advertisement)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Advertisement Successfully Added');
                }
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <tr>
            <th>{index + 1}</th>
            <th><img className='w-auto h-16' src={product.img} alt='' /></th>
            <td>{product.productname}</td>
            <td>${product.resaleprice}</td>
            <td>
                {
                    product.resaleprice && !product.availability &&
                    <button
                        disabled
                        className='px-2 py-1 rounded-md text-white bg-rose-500'
                    >Available</button>
                }
                {
                    product.resaleprice && product.availability &&
                    <button
                        className='px-2 py-1 rounded-md text-white bg-rose-500 block' disabled>Sold</button>
                }
            </td>
            <td>
                <td>

                    {
                        product.resaleprice && !product.availability &&
                        <label onClick={handleAdvertise}

                            className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer ">Make Advertisement</label>
                    } {
                        product.resaleprice && product.availability &&
                        <p
                            disabled
                            className='px-2 py-1 rounded-md text-white bg-rose-500 '>Unavailable</p>
                    }
                </td>
            </td>
            <td>
                <label onClick={() => handleDeleteProduct(product)}
                    htmlFor="confirmationModal" className="px-2 py-1 rounded-md text-white bg-rose-500 cursor-pointer">Delete</label>
            </td>
        </tr>
    );
};

export default SingleProduct;