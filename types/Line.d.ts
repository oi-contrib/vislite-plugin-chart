export default interface LineType {
    new(option: {
        el: HTMLElement | null
        xAxis: {
            value: Array<any>
        }
        data: Array<number>,
        isSmooth?: boolean
    }): this
    setData(data: Array<number>): this
}