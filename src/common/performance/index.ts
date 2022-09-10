import { PerformanceObserver, performance, Performance } from 'perf_hooks'
import { getMarkStartName, getMarkEndName, Mark } from './mark'

class PerformanceWrap extends Performance {}

export default function init() {
    // 新建性能观察者
    const obs = new PerformanceObserver((items) => {
        const measurements = items.getEntriesByType('measure')
        measurements.forEach((measurement: { name: any; duration: any }) => {
            console.log(measurement.name, measurement.duration)
        })
    })
    // 观察条目为 'measure'，可以观察多种类型的条目
    obs.observe({ entryTypes: ['measure'] })
}

export function performanceTimeline(name: Mark) {
    performance.measure(name, getMarkStartName(name), getMarkEndName(name))
}
