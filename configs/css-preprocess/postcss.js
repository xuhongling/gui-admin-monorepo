// postcss-pxtorem是针对不同分辨率下做的一个兼容，需要的打开注释。配合这index.html里面的样式
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Chrome > 64'],
      grid: true,
    },
    /*'postcss-pxtorem': {
      rootValue: 14,
      propList: ['*'],
      unitPrecision: 5,
      exclude: /index.html/,
    },*/
  },
};

