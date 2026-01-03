import Canvas from "@vislite/canvas"
import "../types/line"

Canvas.defineElement("ui-line", function (attr) {
    if (attr.line.length > 0) {

        this.painter.beginPath()
        for (let point of attr.line) {
            this.painter.lineTo(point[0], point[1])
        }
        this.painter.stroke()

    }
}, {
    line: {
        type: "ui-line"
    }
})