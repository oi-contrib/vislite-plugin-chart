export default function (input) {
    let style = ""
    for (let key in input) {
        style += key + ":" + input[key] + ";"
    }
    return style
}