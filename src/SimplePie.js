import Canvas from "@vislite/canvas"
import getLoopColors from "vislite/lib/getLoopColors/index.es"
import rotate from "vislite/lib/rotate/index.es"

Canvas.defineElement("pieLine", function (attr) {

    // 连线
    this.painter.config({
        lineWidth: 1.5
    }).beginPath().moveTo(attr.p1x, attr.p1y).lineTo(attr.p2x, attr.p2y).lineTo(attr.p3x, attr.p3y).stroke()

    // 文字
    this.painter.config({
        fillStyle: "#929292",
        textAlign: attr.align,
        fontSize: 12,
        fontWeight: 400
    }).fillText(attr.label, attr.tx, attr.ty)

}, {
    p1x: {
        type: "number"
    },
    p1y: {
        type: "number"
    },
    p2x: {
        type: "number"
    },
    p2y: {
        type: "number"
    },
    p3x: {
        type: "number"
    },
    p3y: {
        type: "number"
    },
    tx: {
        type: "number"
    },
    ty: {
        type: "number"
    },
    align: {
        type: "string"
    },
    label: {
        type: "string"
    },
})

let calcData = function () {
    let result = []

    let total = 0
    for (let i = 0; i < this.__data.length; i++) total += this.__data[i].value
    if (total === 0) return result

    let colors = getLoopColors(this.__data.length)

    let preDeg = this.__beginDeg
    for (let i = 0; i < this.__data.length; i++) {
        let curDeg = this.__data[i].value / total * this.__deg

        let deg = preDeg + curDeg * 0.5
        let p1 = rotate(this.__cx, this.__cy, deg, this.__cx + this.__radius, this.__cy)
        let p2 = rotate(this.__cx, this.__cy, deg, this.__cx + this.__radius + 15, this.__cy)

        let flag = p1[0] > this.__cx ? 1 : -1

        result.push({
            beginDeg: preDeg,
            deg: curDeg,
            color: colors[i],

            // 连线
            p1, p2, p3: [p2[0] + flag * 15, p2[1]],

            // 文字说明
            txy: [p2[0] + flag * 20, p2[1]],
            align: p1[0] > this.__cx ? "left" : "right",
            label: this.__data[i].name
        })

        preDeg += curDeg
    }

    return result
}

export function SimplePie(option) {
    this.__canvas = new Canvas({
        el: option.el,
        data: {
            list: []
        },
        template: [{
            for: _this => _this.data.list,
            name: "arc",
            attr: {
                type: "fill",
                cx: _this => this.__cx,
                cy: _this => this.__cy,
                r1: 0,
                r2: _this => this.__radius,
                beginDeg: _this => _this.$value.beginDeg,
                deg: _this => _this.$value.deg
            },
            config: {
                fillStyle: _this => _this.$value.color
            },
            children: [{
                name: "pieLine",
                attr: {
                    p1x: _this => _this.$parent.$value.p1[0],
                    p1y: _this => _this.$parent.$value.p1[1],
                    p2x: _this => _this.$parent.$value.p2[0],
                    p2y: _this => _this.$parent.$value.p2[1],
                    p3x: _this => _this.$parent.$value.p3[0],
                    p3y: _this => _this.$parent.$value.p3[1],
                    tx: _this => _this.$parent.$value.txy[0],
                    ty: _this => _this.$parent.$value.txy[1],
                    align: _this => _this.$parent.$value.align,
                    label: _this => _this.$parent.$value.label
                }
            }]
        }]
    })

    this.__beginDeg = -0.5 * Math.PI
    this.__deg = Math.PI * 2
    this.__radius = Math.min(this.__canvas.width, this.__canvas.height) * 0.5 - 100
    this.__cx = this.__canvas.width * 0.5
    this.__cy = this.__canvas.height * 0.5

    this.setData(option.data)
}

SimplePie.prototype.setData = function (data) {
    this.__data = data
    this.__canvas.setData({
        list: calcData.call(this)
    })
    return this
}


