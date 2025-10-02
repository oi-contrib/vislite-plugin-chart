interface dataType {
    value: number
    name: string
}

export default interface SimplePieType {
    new(option: {
        el: HTMLElement | null
        data: Array<dataType>
    }): this
    setData(data: Array<dataType>): this
}