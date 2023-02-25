async function headers() {
    console.log('entrou');
    return [
      {
        source: '/pessoa/usuario/login/:dsc_usuario/:dsc_senha',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true'},
          { key: 'Access-Control-Allow-Origin',  value: '*'},
          { key: 'Access-Control-Allow-Methods', value: 'GET, PATCH, PUT, POST, DELETE'},
          { key: 'Access-Control-Allow-Headers', value: 'X-PINGOTHER, Content-Type, Authorization, cod_conta'}
        ],
      },
    ];
  };

export default headers;