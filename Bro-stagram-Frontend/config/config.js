const backurl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3065'
    : 'http://api.bigbroshin.net';

export { backurl };
