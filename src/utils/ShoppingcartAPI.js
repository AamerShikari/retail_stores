import tokenService from './tokenService';
const BASE_URL = '/api/shoppingcart';

export function create(cart) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken(),
        'Content-Type': 'application/json'
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export function addItem(item) {
    return fetch(BASE_URL + "/addItem", {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken(),
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! Check Server Terminal')
    })
  }