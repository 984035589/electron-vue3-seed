const MarkStartSuffix = 'START'

const MarkEndSuffix = 'END'

const SEP = '.'

export type Mark = 'init' | 'browserWindow'

export const MarkName: Record<string, Mark> = {
    INIT: 'init',
    BROWSER_WINDOW: 'browserWindow'
}

export function getMarkStartName(name: Mark) {
    return getMarkName(name, SEP, MarkStartSuffix)
}

export function getMarkEndName(name: Mark) {
    return getMarkName(name, SEP, MarkEndSuffix)
}

function getMarkName(name: Mark, sep: string, suffix: string) {
    return name.concat(sep, suffix)
}
