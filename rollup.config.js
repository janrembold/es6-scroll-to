import resolve from 'rollup-plugin-node-resolve';
export default {
  input: 'example/index.js',
  output: {
    file: 'example/bundle.js',  
    format: 'iife'
  },
  plugins: [
    resolve({ jsnext: true })
  ]
};