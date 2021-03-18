import { useEffect, useState } from 'react';
import axios from 'axios';

export const useQuery = (url) => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const apiData = await axios.get(url);
                // const apiData = await response.json();
                setApiData(apiData.data)
            } catch (err) {
                // TODO: handle error here
                console.log(err);
            }
        }
        fetchApi();
    }, [url]);

    return { apiData }
};
