import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();  
  }, []); //esse useEffect vai chamar o "getPokemons" quando ele for montado e atualizado
  //obs: esse []  no final é pra chamar só quando for montado

  const getPokemons = () => {
    //essa é a URL com os 151 primeiros pokemons da API que eu estou usando
    let endpoints = [];
    for (let int = 1; int <= 151; int++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${int}/`);
    }
    const response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)) //no fim quando a promise for "cumprida", o then me retorna o que eu pedi da API
      .catch((err) => console.log(err)); //caso acontecer algum problema, a promise retorna um erro
      return response;
    };

  function renderCard(name, key, img) {
    return (
      <Card key={key} sx={{ maxWidth: 345, margin: "1rem" }}>
        <img src={img} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid container>
          {pokemons.map((pokemon) => (
            <Grid item xs={3}>
              {renderCard(pokemon.data.name, `pokemon-${pokemon.data.name}`, pokemon.data.sprites.front_default)}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
