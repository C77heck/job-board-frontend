const dev = process.env.NODE_ENV !== 'production'
// we are going to use this as an api endpoint querying ourselves.
export const server = dev ? 'http://localhost:3000' : 'https://yourwebsite.com'
