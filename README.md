# rollup-plugin-img

Import image files with rollup. Let you import images just like what you do with webpack in your React code!


## Installation

    yarn add --dev rollup-plugin-img
    
or 

    npm install -D rollup-plugin-img
    
## Usage

In the rollup.config.js:

```JavaScript
import image from 'rollup-plugin-img';

export default {
  entry: 'src/index.js',
  dest: 'dist/bundle.js',
  plugins: [
    image({
      limit: 10000
    })
  ]
};
```

and in your React code:

```JavaScript
import img from 'path/image.png';

  ...
  render() {
    return <img src={ img } />;
  }
  ...
```

## Options

You can pass an option to the `image()` just like above, and there are some options:

- exclude & include: like other rollup plugins. [Details](https://github.com/rollup/rollup/wiki/Plugins)
- output: the dest path of output image files. The first directory of dest will be handled as the base output directory(where the html file will be, usually).
- extensions: a regular expression for the extensions of image files.
- limit: the limit(byte) of the file size. A file will be transformed into base64 string when it doesn't exceeded the limit, otherwise, it will be copyed to the dest path.

demo:

```JavaScript
  ...
  image({
    output: `${distPath}/images`, // default the root
    extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
    limit: 8192,  // default 8192(8k)
    exclude: 'node_modules/**'
  })
  ...
```

## License

MIT

