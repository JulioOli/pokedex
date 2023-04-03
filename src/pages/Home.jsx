import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard"

export const Home = () => {
    const[pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, []) //esse useEffect vai chamar o "getPokemons" quando ele for montado e atualizado
//obs: esse []  no final é pra chamar só quando for montado


    const getPokemons = () => {
         //essa é a URL com os 151 primeiros pokemons da API que eu estou usando
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    .then((res) => console.log(res) //no fim quando a promise for "cumprida", o then me retorna o que eu pedi da API
    .catch((err) => console.log(err))) //caso acontecer algum problema, a promise retorna um erro
    }

   
    return(
        <div>
            <Navbar />
            <Container maxWidth="false">
                <Grid container>

                {pokemons.map((pokemon) => (
                    <Grid item xs={3}>
                    <PokemonCard />
                </Grid>
                ))}
                    
                </Grid>

            </Container>
        </div>
    );
};