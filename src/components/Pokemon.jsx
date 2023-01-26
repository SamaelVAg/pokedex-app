import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Pokemon = () => {

    const {id} = useParams()

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
    }

    const pokeColor = () => {
        return colours[`${apiResponse.types?.[0].type.name}`]
    }

    const progress = (stat) => {
        return Math.ceil(stat/1.5)
    }

    const apiRequest = ( pokemon ) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
            .then(res => setApiResponse(res.data))
    }

    const titleCap = (str) => {
        return str?.[0].toUpperCase() + str?.substr(1)
    }

    useEffect(() => {
        apiRequest(id)
    }, [])

    return (
        <div className='poke-detail'>
            <div className='detail-info'>
                <section className="info-image" style={{background: `linear-gradient(${pokeColor()}, white)`}}>
                    <img className='detail-img' src={apiResponse.sprites?.other['official-artwork'].front_default} alt='Pokemon image' />
                </section>
                <section className='info-about'>
                    <b className='about-id' style={{color:pokeColor()}}>#{apiResponse.id}</b>
                    <h2 className='about-name' style={{color:pokeColor()}}>{titleCap(apiResponse.name)}</h2>
                    <div className='about-body'>
                        <article className='body-element'>
                            <p className='bodyel-title'>
                                WEIGHT
                            </p>
                            <p className='bodyel-value'>
                                {apiResponse.weight}
                            </p>
                        </article>
                        <article className='body-element'>
                            <p className='bodyel-title'>
                                HEIGHT
                            </p>
                            <p className='bodyel-value'>
                                {apiResponse.height}
                            </p>
                        </article>
                    </div>
                    <div className='about-typeab'>
                        <article className='typeab-element type'>
                            <h3>Type</h3>
                            {apiResponse.types?.map(element => (
                                <p className='typeab-label' style={{backgroundColor: colours[`${element.type.name}`]}} key={element.type.name}>
                                    {titleCap(element.type.name)}
                                </p>
                            ))}
                        </article>
                        <article className='typeab-element abilities'>
                            <h3>Abilities</h3>
                            {apiResponse.abilities?.map(element => (
                                <p className='typeab-label abilities' key={element.ability.name}>
                                    {titleCap(element.ability.name)}
                                </p>
                            ))}
                        </article>
                    </div>
                </section>
                <section className="info-stats">
                    <h3>Stats</h3>
                    <article className='detstat-element'>
                        <p className='stat-title'>
                            {apiResponse.stats?.[0].stat.name.toUpperCase()}
                        </p>
                        <p className='stat-value'>
                            {apiResponse.stats?.[0].base_stat}/150
                        </p>
                        <div className='stat-bar'>
                            <div className='progress' style={{width: `${progress(apiResponse.stats?.[0].base_stat)}%`}}></div>
                        </div>
                    </article>
                    <article className='detstat-element'>
                        <p className='stat-title'>
                            {titleCap(apiResponse.stats?.[1].stat.name)}
                        </p>
                        <p className='stat-value'>
                            {apiResponse.stats?.[1].base_stat}/150
                        </p>
                        <div className='stat-bar'>
                            <div className='progress' style={{width: `${progress(apiResponse.stats?.[1].base_stat)}%`}}></div>
                        </div>
                    </article>
                    <article className='detstat-element'>
                        <p className='stat-title'>
                            {titleCap(apiResponse.stats?.[2].stat.name)}
                        </p>
                        <p className='stat-value'>
                            {apiResponse.stats?.[2].base_stat}/150
                        </p>
                        <div className='stat-bar'>
                            <div className='progress' style={{width: `${progress(apiResponse.stats?.[2].base_stat)}%`}}></div>
                        </div>
                    </article>
                    <article className='detstat-element'>
                        <p className='stat-title'>
                            {titleCap(apiResponse.stats?.[5].stat.name)}
                        </p>    
                        <p className='stat-value'>
                            {apiResponse.stats?.[5].base_stat}/150
                        </p>
                        <div className='stat-bar'>
                            <div className='progress' style={{width: `${progress(apiResponse.stats?.[5].base_stat)}%`}}></div>
                        </div>
                    </article>
                </section>
            </div>
            <div className="detail-movements">
                <h2>Movements</h2>
                <section className='movements-container'>
                    {apiResponse.moves?.map(element => (
                        <article className="movements-item" key={element.move.name}>
                            {titleCap(element.move.name)}
                        </article>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Pokemon;