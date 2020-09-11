export default interface Collection<T> {
    sizeRemains: number,
    nextOffset: number,
    collection: T[]
}
