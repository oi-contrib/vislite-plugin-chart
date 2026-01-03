# Line 折线图

> v1.1.0 新增

```js
import { Line } from "@vislite/chart"
let line = new Line({
    el: document.getElementById("root"),
    xAxis: {
        value: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    data: [120, 200, 150, 80, 70, 110, 130]
})
```

完整的例子代码你可以访问： [../test/Line.html](../test/Line.html) ，下面是运行截图：

<img src='./Line.png'/>

## 方法

### setData

动态修改数据：

```js
line.setData([10, 100, 50, 80, 170, 40, 30])
```

## 配置项

### el

原始挂载点。

### data

数据。

### isSmooth

boolean类型，默认false，表示是否需要平滑曲线。