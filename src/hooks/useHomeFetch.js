import { useState,useEffect } from 'react'
// load the API
import API from '../API'
// katulong
import { isPersistedState } from '../helpers';

const initialState = {
    page: 0,
    results:  [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm,setSearchTerm] = useState('');
    const [state ,setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page,searchTerm = "") => {
        try 
        {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm,page);

            setState(prev => ({ // triple dots ... means spread in js
                ...movies,
                results:
                    // not never mutate the state in react
                    // if the page is greater than one append the old movies(...prev) with the new movies(...movies) 
                    page > 1 ? [...prev.results,...movies.results] : [...movies.results]
            }));
        }catch(error){ setError(true); }

        setLoading(false);
    }

    //initial and search render
    useEffect(()=> {
        if(!searchTerm) {
            const sessionState = isPersistedState('stateHome');
            if(sessionState){
                setState(sessionState);
                return;
            }
        }
        setState(initialState);
        fetchMovies(1, searchTerm);
    },[searchTerm]); // the comma with [] is called dependency array for useEffect to know when to trigger

    // Load More
    useEffect(()=>{
        if(!isLoadingMore) return;
        fetchMovies(state.page+1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore,searchTerm,state.page])

    // save to session storage
    useEffect(()=>{
        if(!searchTerm) sessionStorage.setItem('stateHome', JSON.stringify(state))
    },[searchTerm,state]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } ;
};