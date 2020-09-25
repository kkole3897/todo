import './stylesheets/style.css';

import './images/card_logo.png'

import { addRemoveCardEvent } from './javascripts/card.js';
import ListView from './javascripts/listview.js';
import CardView from './javascripts/cardview.js';

const listView = new ListView();

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
.then(async res => await listView.getList())
.then(async res => await new CardView().getCards())
.catch(err => console.error(err));

listView.addOpenCardInputEvent();

addRemoveCardEvent();
