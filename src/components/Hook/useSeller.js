import { useEffect, useState } from 'react';

const useSeller = (email) => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerIsLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://listit-classified-server.vercel.app/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsSeller(data.isSeller);
                    setIsSellerIsLoading(false);
                });
        }
    }, [email]);
    return [isSeller, isSellerLoading];
};

export default useSeller;