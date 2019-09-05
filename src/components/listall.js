import React from 'react';
import { Col, Row } from 'antd';
import SmallCard from './card.small';
import { Button, List } from 'antd';
import dburl from '../constants/const';

class ListAll extends React.Component {

    constructor() {
        super();
        this.state = {pokemons: [],
        vivible: false,
        loading: false};
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
        fetch(`${dburl}/pokemons?_page=1&_limit=30`)
        .then(response => response.json())
        .then(data => this.setState({ pokemons: data }))
        .then(this.setState({ counter: 2 }));
    }
    
    handleClick() {
        fetch(`${dburl}/pokemons?_page=${this.state.counter}&_limit=30`)
        .then(response => response.json())
        .then(data => this.setState({ pokemons: this.state.pokemons.concat(data) }))
        .then(this.setState({ counter: this.state.counter+1 }));
    }
    
    render () {
        let pokemons = this.state.pokemons;
        let ifDisabled;
        if (pokemons.length < 30) {
            ifDisabled = true;
        } else {
            ifDisabled = false;
        }
        
        return (
            <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 5,
                }}
                dataSource={pokemons}
                renderItem={pokemon => (
                    <List.Item>
                        <SmallCard pokemon = {pokemon} key = {pokemon.id} catched = {pokemon.catched}/>
                    </List.Item> )}  
            />   
            <Row type="flex" justify="center">
               <Col> <Button type="default" onClick={this.handleClick} disabled={ifDisabled}>Load more</Button></Col>
            </Row>
            </>   
        );
    }
}

export default ListAll;