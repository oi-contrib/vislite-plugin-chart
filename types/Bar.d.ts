export default interface BarType {
    new(option: {
        el: HTMLElement | null
        xAxis: {
            value: Array<any>
        }
        data: Array<number>
    }): this
    setData(data: Array<number>): this
}