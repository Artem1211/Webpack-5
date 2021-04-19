const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  '@babel/preset-typescript',
]
const plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-proposal-class-properties',
  // 'babel-plugin-styled-components',
]

module.exports = (api) => {
  const env = api.env()
  if (env === 'development') {
    return {
      presets,
      plugins: [...plugins, 'react-hot-loader/babel'],
    }
  }
  return {
    presets,
    plugins,
  }
}
