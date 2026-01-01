import { setStyle } from "oipage/web/style/index.js"
import jsonToStyle from "../tools/jsonToStyle.js"

let tooltipEl
export default function (show, x, y, title, items, notRefresh) {
    if (!tooltipEl) {
        tooltipEl = document.createElement("div")
        document.body.appendChild(tooltipEl)

        setStyle(tooltipEl, {
            position: "fixed",
            "transition-duration": "300ms",
            "transition-timing-function": "linear",
            "transition-property": "all",
            "pointer-events": "none",
            "box-shadow": "rgb(0 0 0 / 20%) 1px 2px 10px",
            "border-style": "solid",
            "border-color": "#555555",
            "background-color": "rgb(255, 255, 255)",
            "border-width": "1px",
            "border-radius": "4px",
            color: "rgb(102, 102, 102)",
            font: "14px / 21px sans-serif",
            padding: "10px",
            "text-align": "left",
            display: "none"
        })
    }

    let w = 200, h = 300, d = 10, left, right, top, bottom

    if (x + w > window.innerWidth) {
        right = (window.innerWidth - x + d) + "px"
        left = ""
    } else {
        left = (x + d) + "px"
        right = ""
    }

    if (y + h > window.innerHeight) {
        bottom = (window.innerHeight - y + d) + "px"
        top = ""
    } else {
        top = (y + d) + "px"
        bottom = ""
    }

    setStyle(tooltipEl, {
        left,
        top,
        right,
        bottom
    })

    if (notRefresh) return

    setStyle(tooltipEl, {
        display: show ? "block" : "none"
    })

    if (show) {
        let template = ""

        if (title) {
            template += "<div style='" + jsonToStyle({
                "font-size": "14px",
                color: "#666",
                "font-weight": 400,
                "line-height": 1,
                display: "block"
            }) + "'>" + title + "</div>"
        }

        if (items.length > 0) {
            for (let item of items) {
                template += "<div style='" + jsonToStyle({
                    display: "flex",
                    "align-items": "center",
                    "white-space": "nowrap"
                }) + "'><span style='" + jsonToStyle({

                    // 圆球
                    width: "10px",
                    height: "10px",
                    "border-radius": "50%",
                    "background-color": item.color,
                    margin: "0 5px",
                    display: "inline-block"

                }) + "'></span><span style='" + jsonToStyle({

                    // 名称
                    "font-size": "14px",
                    color: "#666666",
                    "font-weight": 400,
                    "padding-right": "10px"

                }) + "'>" + item.label + "</span><span style='" + jsonToStyle({

                    // 值
                    "font-size": "14px",
                    color: "#666666",
                    "font-weight": 800,
                    "flex-grow": 1,
                    "text-align": "right"

                }) + "'>" + item.value + "</span></div>"
            }
        }
        tooltipEl.innerHTML = template
    } else {
        tooltipEl.innerHTML = ""
    }

}