export function debugLog (...msgs) {
    if (process.env.NODE_ENV === 'development') console.log(...msgs)
}