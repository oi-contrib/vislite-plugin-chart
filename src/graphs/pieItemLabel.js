import Canvas from "@vislite/canvas"
import rotate from "vislite/lib/rotate/index.es"

Canvas.defineElement("ui-pieItemLabel", function (attr) {
    if (attr.hidden) return

    let llp = attr.r * 0.005

    let p1 = rotate(attr.cx, attr.cy, attr.deg, attr.cx + attr.r, attr.cy)
    let p2 = rotate(attr.cx, attr.cy, attr.deg, attr.cx + attr.r + 15 * llp, attr.cy)

    let flag = p1[0] > attr.cx ? 1 : -1

    // 连线
    this.painter.config({
        lineWidth: 1.5 * llp
    }).beginPath().moveTo(p1[0], p1[1]).lineTo(p2[0], p2[1]).lineTo(p2[0] + flag * 15 * llp, p2[1]).stroke()

    // 文字
    this.painter.config({
        fillStyle: "#929292",
        textAlign: flag === 1 ? "left" : "right",
        fontSize: attr.r * 0.08,
        fontWeight: 400
    }).fillText(attr.label, p2[0] + flag * 20 * llp, p2[1])

}, {
    cx: {
        type: "number"
    },
    cy: {
        type: "number"
    },
    deg: {
        type: "number"
    },
    r: {
        type: "number"
    },
    label: {},
    hidden: {
        default: false
    }
})