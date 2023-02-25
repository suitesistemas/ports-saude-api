async function headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true'},
          { key: 'Access-Control-Allow-Origin',  value: '*'},
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, PATCH, PUT, POST, DELETE'},
          { key: 'Access-Control-Allow-Headers', value: 'X-PINGOTHER, Content-Type, Authorization, cod_conta'}
        ],
      },
    ];
  };

export default headers;