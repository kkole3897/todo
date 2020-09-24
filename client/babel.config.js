module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": "3",
        "modules": false,
      },
    ],
  ];

  const plugins = [
    ["@babel/plugin-transform-async-to-generator"]
  ]

  return {
    presets,
    plugins
  };
};
