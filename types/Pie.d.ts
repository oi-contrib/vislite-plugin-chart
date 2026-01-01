interface dataType {
    value: number
    name: string
}

export default interface PieType {
    new(option: {
        el: HTMLElement | null
        data: Array<dataType>
        isRing?: boolean
        beginDeg?: number
        deg?: number
    }): this
    setData(data: Array<dataType>): this
}