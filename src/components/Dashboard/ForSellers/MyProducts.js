import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { authContext } from '../../../context/AuthProvider';
import useTitle from '../../Hook/useTitle';
import SingleProduct from './SingleProduct';

const MyProducts = () => {
    useTitle('My Products');
    const { user, logOut } = useContext(authContext);
    const [products, setProducts] = useState([]);
    // console.log(products);

    useEffect(() => {
        fetch(`https://listit-classified-server.vercel.app/products?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('listit-classified')}`
            }
        })
            .then(res => {
                // if (res.status === 401 || res.status === 403) {
                //     return logOut();
                // }
                return res.json();
            })
            .then(data => setProducts(data));


    }, [user?.email, logOut]);

    // const { data: products = [], refetch, isLoading } = useQuery({
    //     queryKey: ['product'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://listit-classified-server.vercel.app/products?userEmail=${user?.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${localStorage.getItem('listit-classified')}`
    //             }
    //         });
    //         const data = await res.json();
    //         return data;
    //     }

    // });

    const handleDeleteProduct = product => {
        // console.log(product);

        fetch(`https://listit-classified-server.vercel.app/allproducts/${product._id}`, {
            method: 'DELETE',
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('Access-Token')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount) {
                    toast.success('Product is deleted');
                    const remaining = products.filter(pro => pro._id !== product._id);
                    setProducts(remaining);
                }
            });
    };

    // if (isLoading) {
    //     return <Loader></Loader>;
    // }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map((product, index) =>
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                    index={index}
                                    handleDeleteProduct={handleDeleteProduct}
                                >

                                </SingleProduct>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;