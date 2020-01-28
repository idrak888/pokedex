import React, { Component } from 'react';
import PokeCell from './PokeCell';
import axios from 'axios';

class Main extends Component {
    state = {
        pokemons: [],
        selectedPokemon: {}
    }
    componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=101')
        .then(doc => {
            axios.get(doc.data.results[0].url)
            .then(doc2 => { 
                var pokemons = [];
                var results = doc.data.results;

                for (let i=0;i<results.length;i++) {
                    var pokemon = {name: results[i].name, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`, url: results[i].url};
                    pokemons.push(pokemon);
                }
                console.log(doc2.data);
                this.setState({pokemons, selectedPokemon: doc2.data});

                const cells = document.querySelectorAll('.PokeCell');
                cells[0].classList.add('selected');
            });
        });
    }
    selectHandler = (pokemon, e) => {
        const cells = document.querySelectorAll('.PokeCell');
        const selectedCell = e.currentTarget;

        this.setState({selectedPokemon: {}});
        axios.get(pokemon.url)
        .then(doc => {
            this.setState({selectedPokemon:doc.data});
            for (let cell of cells) {
                cell.classList.remove('selected');
            }
            selectedCell.classList.add('selected');
        });
    }
    render() {
        return (
            <div className="Main">
                <div className="row">
                    <div className="col-sm">
                        {this.state.pokemons.map(pokemon => {
                            return <PokeCell selectHandler={(e) => this.selectHandler(pokemon, e)} name={pokemon.name} sprite={pokemon.sprite}/>
                        })}
                    </div>
                    <div className="col-sm display">
                        {this.state.selectedPokemon.name ? 
                            <div className="inner">
                                <img width="150" src={this.state.selectedPokemon.sprites.front_default}/>
                                <div className="info">
                                    <h2>ID: {this.state.selectedPokemon.id} {this.state.selectedPokemon.name}</h2>
                                    <p>Type: <strong>{this.state.selectedPokemon.types[0].type.name}</strong></p>
                                    Abilities: 
                                    <ul>
                                        {this.state.selectedPokemon.abilities.map(a => <li>{a.ability.name}</li>)}
                                    </ul>
                                </div>
                            </div>
                            :
                            <img className="loader" src="https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif"/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;