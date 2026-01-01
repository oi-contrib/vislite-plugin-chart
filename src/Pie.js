import Canvas from "@vislite/canvas"
import getLoopColors from "vislite/lib/getLoopColors/index.es.js"
import "./graphs/pieItemLabel.js"
import tooltip from "./graphs/tooltip.js"

export function Pie(option) {

    this.__isRing = "isRing" in option ? option.isRing : false
    this.__beginDeg = "beginDeg" in option ? option.beginDeg : -0.5 * Math.PI
    this.__deg = "deg" in option ? option.deg : 2 * Math.PI

    this.__canvas = new Canvas({
        el: option.el,
        data: {
            arcs: [],
            hoverIndex: -1
        },
        template: [{
            for: _this => _this.data.arcs,
            name: "arc",
            attr: {
                type: "fill",
                cx: _this => _this.width * 0.5,
                cy: _this => _this.height * 0.5,
                r1: _this => {
                    return (this.__isRing ? Math.min(_this.width * 0.8, _this.height) * 0.2 : 0) * (_this.$index === _this.data.hoverIndex ? 0.9 : 1)
                },
                r2: _this => {
                    return (Math.min(_this.width * 0.8, _this.height) * 0.4) * (_this.$index === _this.data.hoverIndex ? 1.05 : 1)
                },
                beginDeg: _this => _this.$value.beginDeg,
                deg: _this => _this.$value.deg
            },
            config: {
                fillStyle: _this => _this.$value.color,
                shadowBlur: _this => _this.data.hoverIndex !== _this.$index ? 0 : 10
            },
            children: [{
                name: "ui-pieItemLabel",
                attr: {
                    hidden: _this => _this.$parent.$value.deg === 0,
                    cx: _this => _this.width * 0.5,
                    cy: _this => _this.height * 0.5,
                    deg: _this => _this.$parent.$value.deg * 0.5 + _this.$parent.$value.beginDeg,
                    r: _this => {
                        return (Math.min(_this.width * 0.8, _this.height) * 0.4) * (_this.$parent.$index === _this.data.hoverIndex ? 1.05 : 1)
                    },
                    label: _this => _this.$parent.$value.label
                }
            }]
        }],
        event: {
            mousemove(event) {
                let hoverIndex = -1
                if (event.id && event.id.startsWith("id-0for")) {
                    hoverIndex = +event.id.replace("id-0for", "")
                }

                let notRefresh = hoverIndex === this.data.hoverIndex

                if (!notRefresh) {
                    this.setData({
                        hoverIndex
                    })
                }

                let currentArc = this.data.arcs[hoverIndex]
                if (currentArc) {
                    tooltip(true, event.x, event.y, "", [{
                        label: currentArc.label,
                        value: currentArc.value,
                        color: currentArc.color
                    }], notRefresh)
                } else {
                    tooltip(false, event.x, event.y, "", [], notRefresh)
                }

            }
        },
    })

    let initData = []
    for (let i = 0; i < option.data.length; i++) {
        initData.push({
            name: option.data[i].name,
            value: 0
        })
    }
    this.setData(initData)

    setTimeout(() => {
        this.setData(option.data)
    }, 500)

}

Pie.prototype.setData = function (data) {
    if (data.length <= 0) return

    let total = 0
    for (let i = 0; i < data.length; i++) total += data[i].value

    let arcs = []
    let colors = getLoopColors(data.length)

    if (total !== 0) {
        let preDeg = this.__beginDeg

        for (let i = 0; i < data.length; i++) {
            let curDeg = data[i].value / total * this.__deg

            arcs.push({
                beginDeg: preDeg,
                deg: curDeg,
                color: colors[i],
                label: data[i].name,
                value: data[i].value
            })

            preDeg += curDeg
        }

        this.__canvas.setData({
            arcs
        })
    } else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            arcs.push({
                beginDeg: this.__beginDeg,
                deg: 0,
                color: colors[i],
                label: data[i].name,
                value: data[i].value
            })
        }
        this.__canvas.setData({
            arcs
        })
    }

    return this
}