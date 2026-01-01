# [@vislite/chart](https://github.com/oi-contrib/vislite-plugin-chart)
一些常用的可视化图表库

<p>
    <a href="https://zxl20070701.github.io/toolbox/#/npm-download?packages=@vislite/chart&interval=7">
        <img src="https://img.shields.io/npm/dm/@vislite/chart.svg" alt="downloads">
    </a>
    <a href="https://www.npmjs.com/package/@vislite/chart">
        <img src="https://img.shields.io/npm/v/@vislite/chart.svg" alt="npm">
    </a>
    <a href="https://github.com/oi-contrib/vislite-plugin-chart/issues">
        <img src="https://img.shields.io/github/issues/oi-contrib/vislite-plugin-chart" alt="issue">
    </a>
    <a href="https://github.com/oi-contrib/vislite-plugin-chart" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/oi-contrib/vislite-plugin-chart?style=social">
    </a>
    <a href="https://github.com/oi-contrib/vislite-plugin-chart">
        <img src="https://img.shields.io/github/forks/oi-contrib/vislite-plugin-chart" alt="forks">
    </a>
     <a href="https://gitee.com/oi-contrib/vislite-plugin-chart" target='_blank'>
        <img alt="Gitee repo stars" src="https://gitee.com/oi-contrib/vislite-plugin-chart/badge/star.svg">
    </a>
    <a href="https://gitee.com/oi-contrib/vislite-plugin-chart">
        <img src="https://gitee.com/oi-contrib/vislite-plugin-chart/badge/fork.svg" alt="forks">
    </a>
</p>

<img src="https://nodei.co/npm/@vislite/chart.png?downloads=true&amp;downloadRank=true&amp;stars=true" alt="NPM">

## 如何使用？

```
npm install --save @vislite/canvas
```

安装后，准备好渲染位置

```html
<div id="root" style="width:400px;height:400px"></div>
```

然后直接使用（以饼图为例）：

```js
import { Pie } from "@vislite/chart"
let pie = new Pie({
    el: document.getElementById("root"),
    data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ],
    isRing: true, // 可选
    beginDeg: 0, // 可选
    deg: Math.PI * 1.5 // 可选
})
```

这样一个饼图就出来了:

<img src="./docs/Pie.png" />

下面是更多图表明细：

- [Pie 饼图](./docs/Pie.md)

更多图表或特性探索设计中，你也可以给我们[ 留言 ](https://github.com/oi-contrib/vislite-plugin-chart/issues)，告诉我们你的想法或希望提供的图表！

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步