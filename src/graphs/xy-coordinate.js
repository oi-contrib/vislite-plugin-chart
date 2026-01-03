import Canvas from "@vislite/canvas"

Canvas.defineElement("ui-xy-coordinate", function (attr) {

    this.painter.config({
        fillStyle: "#000000",
        strokeStyle: "#aeaeae",
        fontSize: 12,
        textAlign: "center",
        textBaseline: "top",
        lineWidth: 1
    })

    let splitWidth

    // label刻度尺
    splitWidth = attr.width / attr.category.length
    for (let i = 0; i < attr.category.length; i++) {
        this.painter.fillText(attr.category[i], attr.x + splitWidth * (i + 0.5), attr.y + 10)
    }
    this.painter.beginPath().moveTo(attr.x, attr.y).lineTo(attr.x + attr.width, attr.y).stroke()
    for (let i = 0; i <= attr.category.length; i++) {
        let x = attr.x + splitWidth * i
        let y = attr.y
        this.painter.beginPath().moveTo(x, y).lineTo(x, y + 5).stroke()
    }

    this.painter.config({
        textAlign: "right",
        textBaseline: "middle"
    })

    // value 刻度尺
    splitWidth = attr.height / (attr.data.length - 1)
    for (let i = 0; i < attr.data.length; i++) {
        let x = attr.x
        let y = attr.y - splitWidth * i
        this.painter.fillText(attr.data[i], x - 5, y)
        if (i != 0) {
            this.painter.beginPath().moveTo(x, y).lineTo(x + attr.width, y).stroke()
        }
    }

}, {
    x: {
        type: "number"
    },
    y: {
        type: "number"
    },
    width: {
        type: "number"
    },
    height: {
        type: "number"
    },
    data: {},
    category: {}
})