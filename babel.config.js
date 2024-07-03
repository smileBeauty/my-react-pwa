module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        bugfixes: true,
        spec: true,
        loose: true,
        modules: "commonjs",
        debug: false,
        useBuiltIns: "usage",
        corejs: "3",
        forceAllTransforms: true,
        shippedProposals: true,
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
        development: false,
        throwIfNamespace: true,
        pure: true,
        useBuiltIns: false,
        useSpread: true,
      },
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
        allowDeclareFields: true,
        disallowAmbiguousJSXLike: true,
        onlyRemoveTypeImports: false,
        optimizeConstEnums: true,
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: true,
        absoluteRuntime: true,
        loose: true,
      },
    ],
    [
      "@babel/plugin-transform-private-property-in-object",
      {
        loose: true,
      },
    ],
    [
      "@babel/plugin-transform-class-properties",
      {
        loose: true,
      },
    ],
    [
      "@babel/plugin-transform-private-methods",
      {
        loose: true,
      },
    ],
    ["@babel/plugin-proposal-export-default-from"],
    ["@babel/plugin-proposal-class-properties"],
  ],
};
