## install

```
yarn add webp-converter-webpack-plugin
```

## use

```
const WebpPlugin = require("webp-converter-webpack-plugin");

  plugins: [
   ...,
    new WebpPlugin({
      quality: 0.8,
      changeName: false,
      enabled: true,
      log: true,
      limit: 1024 * 32,
      imageReg: /\.(png|jpg|jpeg|webp)$/i
    }),
  ],

```

| name       | default                      | desc                                                                                                                        |
| ---------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| quality    | 0.8                          | quality of webp, 0~1 or 0~100                                                                                               |
| changeName | false                        | change fileName [name].jpg to [name].webp. **if you want to change ouput filenname you also need change url-loader config** |
| enabled    | true                         | enable this plugin                                                                                                          |
| log        | true                         | show compress info log                                                                                                      |
| limit      | 1024 \* 32                   | Images size bigger than 32K will be compressed, default 32k                                                                              |
| imageReg   | `/\.(png|jpg|jpeg|webp)\$/i` | image name regular expression                                                                                               |

## notice

if you use changeName, you need to config url-loader to change image name too.

```
{
  test: /\.(png|jpg|jpeg|ico|webp)$/i,
  use: {
    loader: "url-loader",
    options: { limit: 8192, name: "[hash].webp" },
  },
},
```

## result

| filename                              | raw size  | webp size | compress ratio |
| ------------------------------------- | --------- | --------- | -------------- |
| cab72b5040f5cb047a86e251c5303fb4.webp | 12.47k    | 5.91k     | 47.37%         |
| 64fe31f5ec09e8a17860d24e7c04921d.webp | 10104.01k | 2286.62k  | 22.63%         |
| 00ae1b36370fe4694f7cec16fea9d48c.webp | 5926.21k  | 727.20k   | 12.27%         |
