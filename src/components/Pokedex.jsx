import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../store/slices/userName.slice';
import axios from 'axios'
import PokemonCard from './PokemonCard';

const Pokedex = () => {

    //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279 Cuando se use paginacion

    const userName = useSelector(state => state.userName)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fullCat = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279'

    const [baseUrl, setBaseUrl] = useState([fullCat, 1])
    const [apiTypes, setApiTypes] = useState([])
    const [apiResponse, setApiResponse] = useState([])
    const [input, setInput] = useState('')
    const [currentPage, setCurrentPage] = useState( 1 )
    
    const lRIndex = currentPage * 20
    const fRIndex = lRIndex - 20
    const pokeShow = apiResponse.slice( fRIndex, lRIndex )
    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const titleCap = (str) => {
        return str?.[0].toUpperCase() + str?.substr(1)
    }

    const logOut = () => {
        dispatch(auth(''))
    }

    const inpSearch = (e) => {
        if(e.key === 'Enter'){
            search()
        }
    }

    const search = () => {
        const name = input.toLowerCase()
        navigate(`/pokedex/${name}`)
    }

    const chgPage = ( pgNumber ) => {
        setCurrentPage( pgNumber )
    }

    const cardContainer = () => {
        if(baseUrl[1] === 1){
            return( 
                pokeShow.map(element => (
                <PokemonCard key={element.url} pokemonUrl={element.url} />
            ))
            )
        }else{
            return (
                pokeShow.map(element => (
                    <PokemonCard key={element.pokemon?.url} pokemonUrl={element.pokemon?.url} />
                ))
            )
        }
    }

    const pagination = () => {
        const pages = Math.ceil( apiResponse?.length / 20 )
        const pageNumbers = []

        for( let i = 1; i <= pages; i++ ){
            pageNumbers.push(i)
        }
        return(
            pageNumbers.map( number => (
                <li key={ number }>
                    <a onClick={ () => {
                        chgPage( number )
                        goToTop()
                    }} className={`page-number ${ currentPage === number ? 'active' : '' }`}>
                        { number }
                    </a>
                </li>
            ) )
        )
    }

    const apiRequest = ( [url, dataset] ) => {
        if(dataset === 1){
            axios.get(url)
                .then(res => setApiResponse(res.data.results))
        }else{
            axios.get(url)
                .then(res => setApiResponse(res.data.pokemon))
        }
    }

    const apiFilter = () => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setApiTypes(res.data.results))
    }

    const urlLoader = (e) => {
        const url = e.target.value
        if(url === fullCat){
            setBaseUrl([url, 1])
        }else{
            setBaseUrl([url, 0])
        }
    }

    useEffect(() => {
        apiFilter()
        apiRequest(baseUrl)
        
    }, [baseUrl])


    return (
        <div className='pokedex-comp'>
            <section className="user-section">
                <h1><span className='colored'>Welcome {userName},</span> here you can find your favorite Pokemon</h1>
                <Link to='/' onClick={() => logOut()}>Log Out</Link>
            </section>
            <section className='search-container'>
                <article className='input-search'>
                    <input type='text' 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => inpSearch(e)}
                        placeholder='Find your Pokemon'
                    />
                    <button onClick={() => search()}>
                        Search
                    </button>
                </article>
                <article className='filter-search'>
                    <select onChange={e => urlLoader(e)}>
                    <option value={fullCat} >All Pokemons</option>
                    {apiTypes.map(type => (
                        <option value={type.url} key={type.name}>{titleCap(type.name)}</option>
                    ))}
                    </select>
                </article>
            </section>
            <section className='card-container'>
                {cardContainer()}
            </section>
            <section className="pagination-container">
                {pagination()}
            </section>
        </div>
    );
};

export default Pokedex;