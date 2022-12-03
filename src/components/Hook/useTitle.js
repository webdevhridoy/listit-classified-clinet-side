import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Listit Classified`;
    }, [title]);
};

export default useTitle;