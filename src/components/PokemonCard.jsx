import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/pokemonCardStyle.css'

const PokemonCard = ( { pokemonUrl } ) => {

    const navigate = useNavigate()

    const [apiResponse, setApiResponse] = useState({})

    const colours = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        electric: '#F7D02C',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    const apiRequest = ( url ) => {
        axios.get(`${url}`)
            .then(res => setApiResponse(res.data))
    }

    const titleCap = (str) => {
        return str?.[0].toUpperCase() + str?.substr(1)
    }

    const type = (arr) => {
        if(arr?.length > 1){
            const apiTypes = []
            arr?.map(element => apiTypes.push(titleCap(element.type?.name)))
            return apiTypes.join(' / ')
        }else{
            return titleCap(arr?.[0].type.name)
        }
    }

    const pokeColor = () => {
        return colours[`${apiResponse.types?.[0].type.name}`]
    }

    useEffect(() => {
        apiRequest(pokemonUrl)
    }, [])

    return (
        <div className='card-element' style={{borderColor: pokeColor()}} onClick={() => navigate(`/pokedex/${apiResponse.id}`)}>
            <section className='image-cont' style={{background: `linear-gradient(${pokeColor()}, white)`}} >
                <img className='card-img' src={apiResponse.sprites?.other['official-artwork'].front_default} alt='Pokemon image' />
            </section>
            <section className='card-name'>
                <h2 style={{color:pokeColor()}}>{titleCap(apiResponse.name)}</h2>
                <h3>{type(apiResponse.types)}</h3>
                <p>Type</p>
            </section>
            <section className="card-stats">
                <article className='stat-element'>
                    <p className='element-title'>
                        {apiResponse.stats?.[0].stat.name.toUpperCase()}
                    </p>
                    <p className='element-value' style={{color:pokeColor()}}>
                        {apiResponse.stats?.[0].base_stat}
                    </p>
                </article>
                <article className='stat-element'>
                    <p className='element-title'>
                        {apiResponse.stats?.[1].stat.name.toUpperCase()}
                    </p>
                    <p className='element-value' style={{color:pokeColor()}}>
                        {apiResponse.stats?.[1].base_stat}
                    </p>
                </article>
                <article className='stat-element'>
                    <p className='element-title'>
                        {apiResponse.stats?.[2].stat.name.toUpperCase()}
                    </p>
                    <p className='element-value' style={{color:pokeColor()}}>
                        {apiResponse.stats?.[2].base_stat}
                    </p>
                </article>
                <article className='stat-element'>
                    <p className='element-title'>
                        {apiResponse.stats?.[5].stat.name.toUpperCase()}
                    </p>
                    <p className='element-value' style={{color:pokeColor()}}>
                        {apiResponse.stats?.[5].base_stat}
                    </p>
                </article>
            </section>
        </div>
    );
};

export default PokemonCard;