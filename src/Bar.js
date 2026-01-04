import Canvas from "@vislite/canvas"
import getLoopColors from "vislite/lib/getLoopColors/index.es.js"
import ruler from "vislite/lib/ruler/index.es.js"
import "./graphs/xy-coordinate.js"
import tooltip from "./graphs/tooltip.js"

export function Bar(option) {
    let that = this

    this.__canvas = new Canvas({
        el: option.el,
        data: {
            rects: [],
            hoverIndex: -1,
            ruler: [],
            coordinate: {}
        },
        lifecycle: {
            resized() {
                if (this.sized) {
                    setTimeout(() => {
                        that.setData()
                    }, 50)
                }
            }
        },
        template: [{
            if: _this => _this.data.ruler.length > 0,
            name: "ui-xy-coordinate",
            attr: {
                x: _this => _this.data.coordinate.x,
                y: _this => _this.data.coordinate.y,
                width: _this => _this.data.coordinate.width,
                height: _this => _this.data.coordinate.height,
                data: _this => _this.data.ruler,
                category: option.xAxis.value
            }
        }, {
            for: _this => _this.data.rects,
            name: "rect",
            attr: {
                type: "fill",
                x: _this => _this.$value.x,
                y: _this => _this.$value.y,
                width: _this => _this.$value.width,
                height: _this => _this.$value.height
            },
            config: {
                fillStyle: _this => _this.$value.color,
                shadowBlur: _this => _this.data.hoverIndex !== _this.$index ? 0 : 10
            },
        }],
        event: {
            mousemove(event) {
                let hoverIndex = -1
                if (event.id && event.id.startsWith("id-1for")) {
                    hoverIndex = +event.id.replace("id-1for", "")
                }

                let notRefresh = hoverIndex === this.data.hoverIndex

                if (!notRefresh) {
                    this.setData({
                        hoverIndex
                    })
                }

                let currentRect = this.data.rects[hoverIndex]
                if (currentRect) {
                    tooltip(true, event.x, event.y, "", [{
                        label: option.xAxis.value[hoverIndex],
                        value: currentRect.value,
                        color: currentRect.color
                    }], notRefresh)
                } else {
                    tooltip(false, event.x, event.y, "", [], notRefresh)
                }

            }
        },
    })

    let initData = []

    // option.data
    // 1、单个 Array<number>
    // 2、多个 Array<{ // 目前不支持
    //     name:String,
    //     value:Array<number>
    // }>

    for (let i = 0; i < option.data.length; i++) {
        initData.push(0)
    }
    this.setData(initData)

    setTimeout(() => {
        this.setData(option.data)
    }, 500)

}

Bar.prototype.setData = function (data) {
    if (data) {
        this.__preData = data
    } else {
        data = this.__preData
    }

    if (data.length <= 0) return

    let grid = {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
    }

    let maxValue = data[0], minValue = data[0]
    for (let i = 1; i < data.length; i++) {
        if (data[i] > maxValue) maxValue = data[i]
        if (data[i] < minValue) minValue = data[i]
    }

    if (maxValue == minValue) {
        if (maxValue > 0) minValue = 0
        else if (minValue < 0) maxValue = 0
        else maxValue = 100
    }

    let colors = getLoopColors(1)

    let rulerArray = ruler(maxValue, minValue, 4, {
        min: minValue > 0 ? 0 : void 0,
        max: maxValue < 0 ? 0 : void 0
    })

    let singleWidth = (this.__canvas.width - grid.left - grid.right) / data.length
    let dataWidth = singleWidth * 0.9
    let dataHeight = this.__canvas.height - grid.top - grid.bottom
    let perHeight = dataHeight / (rulerArray[rulerArray.length - 1] - rulerArray[0])

    let rects = []
    for (let i = 0; i < data.length; i++) {
        rects.push({
            value: data[i],
            x: grid.left + (i + 0.5) * singleWidth - dataWidth * 0.5,
            y: this.__canvas.height - grid.bottom,
            width: dataWidth,
            height: perHeight * (data[i] - rulerArray[0]) * -1,
            color: colors[0]
        })
    }

    this.__canvas.setData({
        rects,
        ruler: rulerArray,
        coordinate: {
            x: grid.left,
            y: this.__canvas.height - grid.bottom,
            width: this.__canvas.width - grid.left - grid.right,
            height: this.__canvas.height - grid.top - grid.bottom,
        }
    })

}