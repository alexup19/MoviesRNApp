// @ts-nocheck
module.exports = function(api) {
  const plugins = [
    ['babel-plugin-styled-components', { ssr: false }],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx'],
        alias: {
          atoms: './src/components/atoms',
          molecules: './src/components/molecules',
          organisms: './src/components/organisms',
          templates: './src/components/templates',
          utils: './src/utils',
        },
      },
    ],
  ];

  if (api) {
    api.cache(true)
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
