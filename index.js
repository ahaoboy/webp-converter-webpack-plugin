const webp = require("webp-converter");
const { RawSource } = require("webpack-sources");

const isImage = (name = "") => {
  const reg = /\.(png|jpg|jpeg|ico|webp)$/i;
  return reg.test(name);
};

class WebpPlugin {
  constructor({
    quality = 0.8,
    enabled = true,
    log = true,
    changeName = false,
  }) {
    this.quality = quality < 1 ? quality * 100 : quality;
    this.enabled = enabled;
    this.log = log;
    this.changeName = changeName;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("WebpPlugin", async (compilation, cb) => {
      if (!this.enabled) return;
      const images = Object.keys(compilation.assets).filter(isImage);
      const list = [];
      for (let i of images) {
        const raw = compilation.assets[i]._value;
        const p = webp
          .buffer2webpbuffer(raw, "jpg", `-q ${this.quality}`)
          .then((data) => {
            if (this.changeName) {
              // 需要将图片的输出格式也设置为webp
              delete compilation.assets[i];
              const nameList = i.split(".");
              nameList.pop();
              nameList.push("webp");
              const name = nameList.join(".");
              compilation.assets[name] = new RawSource(data);
            } else {
              compilation.assets[i] = new RawSource(data);
            }
          });
        list.push(p);
      }
      await Promise.all(list);
      cb();
    });
  }
}
module.exports = WebpPlugin;
