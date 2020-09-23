import './stylesheets/style.css';
import { addOpenCardInputEvent } from './javascripts/card.js';
import ListView from './javascripts/listview.js';

fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
        id: 'test'
    }),
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'X-Requested-With"',
        'Access-Control-Allow-Origin': '*',
        'Origin': 'http://localhost:8080'
    }
})
.then(res => res.json())
.then(res => new ListView().getList())
.catch(err => console.error('ERROR'));

addOpenCardInputEvent();
