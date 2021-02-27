# 移动端知识要点

## 4 个像素 3 个视口 2 个操作 1 个比例

- 4 个像素：
  - css 像素：web 开发中使用的像素，最终渲染时将转换为物理像素
  - 物理像素：视图成像时最终的像素
  - 设备独立像素：
  - 位图像素：图片的像素表示
- 3 个视口：
  - 布局视口
  - 视觉视口
  - 理想视口
- 2 个操作
  - 放大(系统放大或手动放大)
  - 缩小(系统放大或手动放大)
- 1 个比例
  - 像素比(dpr:device pixcl radio):不同设备像素比不同(iphone6 像素比为 2,iphone6 plus 像素比为 3)
  - 获取：window.devicePixelRatio
  - 公式:像素比=物理像素/设备独立像素;当加了`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`后;设备独立像素等同于 css 像素,于是有像素比=物理像素/css 像素。

## 适配

- 目的：百分比还原设计图，使不同设备上的页面实现等比。
- 方案：rem 适配,viewport 适配,百分比适配

  - rem 适配(1 个 rem 即为 html 标签的 fontsize 值)：

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <!-- viewport是required -->
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0,user-scalable=no"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>rem</title>
      <style>
        html,
        body {
          margin: 0;
          padding: 0;
        }
        .box {
          width: 8rem;
          height: 8rem;
          background: #000;
        }
      </style>
    </head>
    <body>
      <div class="box"></div>
      <script>
        (function() {
          let styleNode = document.createElement("style");
          // 让一个rem等于屏幕视口的十六分之一
          let rem = document.documentElement.clientWidth / 16;
          styleNode.innerHTML = `html{font-size:${rem}px!important;}`;
          document.head.appendChild(styleNode);
        })();
      </script>
    </body>
  </html>
  ```

  rem 适配需要对设计图上标记的 px 进行转换，可以 less，sass 等预处理 css 语言编写变量，如

  假设设计图宽为 d px，取基准值为 16（即一张设计图的宽可看成 16 等份），元素.box 在设计图上的宽为 e px，

  ```less
  // 表示一个rem所代表的css像素个数
  @rem: d/16rem;
  .box {
    width: e/ @rem;
  }
  ```

  - viewport 适配

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- meta below is required -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>viewport适配</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 180px;
        height: 180px;
        background: #000;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <script>
      (function() {
        // 目标设计图的宽
        const targetW = 360;
        // 缩放比例
        let scale = document.documentElement.clientWidth / targetW;
        let viewportMeta = document.querySelector("meta[name=viewport]");
        viewportMeta.content = `initial-scale=${scale},minimum-scale=${scale},maximum-scale=${scale},user-scalable=no`;
      })();
    </script>
  </body>
</html>
```

viewport 设配不需要转换计算，直接写设计图上所标记的像素值即可。

````

- 百分比适配
- 根据父级元素百分比设置即可，用于比较简单的项目

### 实现 1 物理像素

#### 方案一：结合 rem 适配

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>1px物理像素</title>
  <style media="screen">
    * {
      margin: 0;
      padding: 0;
    }
    #div1 {
      width: 16rem;
      height: 1px;
      margin-top: 3rem;
      background: blue;
    }
  </style>
</head>

<body>
  <div id="div1"></div>

  <script>
    (function() {
      let dpr = window.devicePixelRatio || 1;
      let scale = 1 / dpr;

      // rem 适配
      let w = (document.documentElement.clientWidth / 16) * dpr;
      let styleNode = document.createElement("style");
      styleNode.innerHTML = "html{font-size:" + w + "px !important;}";
      document.head.appendChild(styleNode);

      // 缩小操作
      metaDOM = document.querySelector("meta[name='viewport']");
      metaDOM.content =
        "width=device-width,initial-scale=" +
        scale +
        ",user-scalable=no,minimum-scale=" +
        scale +
        ",maximum-scale=" +
        scale;
    })();
  </script>
</body>
</html>
````

#### 方案二：结合 transform

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>1px物理像素</title>
    <style media="screen">
      * {
        margin: 0;
        padding: 0;
      }
      #div1 {
        width: 16rem;
        height: 1px;
        margin-top: 3rem;
        background: blue;
      }
      @media only screen and (-webkit-device-pixel-ratio: 2) {
        #div1 {
          transform: scaleY(0.5);
        }
      }
      @media only screen and (-webkit-device-pixel-ratio: 3) {
        #div1 {
          transform: scaleY(0.333333333);
        }
      }
    </style>
  </head>
  <body>
    <div id="div1"></div>
    <script>
      (function() {
        // rem 适配
        let w = document.documentElement.clientWidth / 16;
        let styleNode = document.createElement("style");
        styleNode.innerHTML = "html{font-size:" + w + "px !important;}";
        document.head.appendChild(styleNode);
      })();
    </script>
  </body>
</html>
```

### 移动端禁止一切默认行为

```js
document.addEventListener("touchstart", function(ev) {
  ev = ev || event;
  ev.preventDefault();
});
```
