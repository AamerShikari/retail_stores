import tokenService from './tokenService';
const BASE_URL = '/api/shoppingcart';

export function create(cart) {
    console.log(cart, "THIS IS THE CART IN THE FETCH")
    return fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
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