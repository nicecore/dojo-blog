import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [Error, setError] = useState(null);
    
    useEffect(() => {
        const abortCont = new AbortController();


        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if(!res.ok) {
                        throw Error('could not get the data for this resource')
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }

                })
        }, 300);
        return () => abortCont.abort();
    }, [url]);
    return { data, isPending, Error }
}


export default useFetch;