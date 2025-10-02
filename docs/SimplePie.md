# SimplePie 基本饼图

```js
import {SimplePie} from "@vislite/chart"
let pie = new SimplePie({
    el: document.getElementById("root"),
    data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ]
})
```

<img src='./SimplePie.png'/>

## 方法

### setData

动态修改数据：

```js
pie.setData([
    { value: 108, name: 'Search Engine' },
    { value: 175, name: 'Direct' },
    { value: 80, name: 'Email' },
    { value: 84, name: 'Union Ads' },
    { value: 100, name: 'Video Ads' }
])
```