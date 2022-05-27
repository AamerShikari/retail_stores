import tokenService from './tokenService';

const BASE_URL = '/api/marketplace';

export function create(item) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: item,
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

  export function findItem(item) { 
      return fetch(BASE_URL + "/" + item._id,{
          method: 'GET',
          headers: {
              'Authorization': 'Bearer ' + tokenService.getToken(),
              'Content-Type': 'application/json'
          }
      })
      .then(res => {
          if(res.ok) return res.json();
          throw new Error('Bad Credentials! Check the Server Terminal!')
      })
  }

  export function getFromStore(store) {
      return fetch(BASE_URL + "/store/" + store.id,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken(),
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.ok) return res.json();
        throw new Error('Bad Credentials! Check the Server Terminal!')
    })
  }