import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useTitle from '../../Hook/useTitle';

const AddCategory = () => {
    useTitle('Add Category');
    const { register, handleSubmit } = useForm();


    const handleSignIn = (data, event) => {
        // console.log(data);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = 'https://api.imgbb.com/1/upload?key=a6f9b9970dcebe796e264ecdc5083f85';
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    // console.log(imgData.data.url);


                    const categories = {
                        categoryname: data.categoryname,
                        img: imgData.data.url,
                    };
                    //save information to the database 

                    fetch('https://listit-classified-server.vercel.app/categories', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(categories)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            Swal.fire({
                                text: 'Category has been added'
                            });
                            event.target.reset();
                        });

                }
            });


    };
    return (
        <div >
            <form onSubmit={handleSubmit(handleSignIn)} novalidate="" action="" className="flex flex-col w-full  p-12 rounded shadow-lg ng-untouched ng-pristine ng-valid  bg-black text-white">


                <label for="username" className="self-start text-xs font-semibold"> Category Name</label>
                <input {...register('categoryname', { required: 'Field is required' })} className="flex items-center text-black h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2" />



                <label className="label"> <span className="label-text text-white">Photo</span></label>
                <input type="file" {...register("img", {
                    required: 'Photo is required'
                })} className="input input-bordered w-full max-w-xs text-black" />


                <button type="submit" className="flex items-center justify-center bg-white text-black mt-5 h-12 ">Add Now</button>


            </form>

        </div>
    );
};

export default AddCategory;