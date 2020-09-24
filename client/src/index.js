import './stylesheets/style.css';

import './images/card_logo.png'

import { addOpenCardInputEvent } from './javascripts/card.js';
import ListView from './javascripts/listview.js';
import CardView from './javascripts/cardview.js';


fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
        id: 'test'
    }),
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Origin': 'http://localhost:8080'
    }
})
.then(res => res.json())
.then(async res => await new ListView().getList())
.then(async res => await new CardView().getCards())
.catch(err => console.error(err));

addOpenCardInputEvent();
