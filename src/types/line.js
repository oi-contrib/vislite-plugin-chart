import Canvas from "@vislite/canvas"
import deepValue from "../tools/deepValue"

Canvas.defineType("ui-line", (newValue, oldValue) => {
    return (deep) => {

        let value = [];
        for (let i = 0; i < newValue.length; i++) {

            if (oldValue[i] && newValue[i]) {
                value.push([
                    deepValue(newValue[i][0], oldValue[i][0], deep),
                    deepValue(newValue[i][1], oldValue[i][1], deep)
                ])
            } else if (deep === 1) {
                value.push([
                    newValue[i][0],
                    newValue[i][1]
                ])
            }

        }

        return value

    }
})