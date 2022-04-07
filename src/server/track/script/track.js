var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
function toISO8601(date) {
    return (
        date.getFullYear() +
        '-' +
        getMonth(date) +
        '-' +
        getDate(date) +
        'T' +
        getHours(date) +
        ':' +
        getMinutes(date) +
        ':' +
        getSeconds(date) +
        '.' +
        getMilliseconds(date) +
        getTimezoneOffset(date)
    )
}
function getMonth(date) {
    const month = String(date.getMonth())
    return addZero(month)
}
function getDate(date) {
    const day = String(date.getDate())
    return addZero(day)
}
function getHours(date) {
    const hours = String(date.getHours())
    return addZero(hours)
}
function getMinutes(date) {
    const minutes = String(date.getMinutes())
    return addZero(minutes)
}
function getSeconds(date) {
    const seconds = String(date.getSeconds())
    return addZero(seconds)
}
function getMilliseconds(date) {
    const milliseconds = String(date.getMilliseconds())
    if (milliseconds.length === 1) {
        return '00' + milliseconds
    } else if (milliseconds.length === 2) {
        return '0' + milliseconds
    }
    return milliseconds
}
function getTimezoneOffset(date) {
    const os = Math.abs(date.getTimezoneOffset())
    let h = String(Math.floor(os / 60))
    let m = String(os % 60)
    h.length === 1 ? (h = '0' + h) : h
    m.length === 1 ? (m = '0' + m) : m
    return date.getTimezoneOffset() < 0 ? '+' + h + ':' + m : '-' + h + ':' + m
}
function addZero(str) {
    return str.length === 1 ? '0' + str : str
}
function isLinkElement(eventTarget) {
    return (
        (eventTarget === null || eventTarget === void 0
            ? void 0
            : eventTarget.tagName) === 'A'
    )
}
class Track {
    constructor() {
        this.trackUrl = 'http://localhost:8001/track'
        this.TRACKER_DEMO_PAGE = 'TRACKER_DEMO_PAGE'
        this.isPending = false
        this.timeoutId = 0
        if (Track._instance) {
            return Track._instance
        }
        Track._instance = this
        this.init()
    }
    init() {
        window.addEventListener('unload', this.unloadHandler.bind(this), false)
    }
    get trackItems() {
        try {
            return (
                JSON.parse(localStorage.getItem(this.TRACKER_DEMO_PAGE)) || []
            )
        } catch (_a) {
            return []
        }
    }
    set trackItems(items) {
        localStorage.setItem(this.TRACKER_DEMO_PAGE, JSON.stringify(items))
    }
    track(event, ...tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const trackItems = this.trackItems
            trackItems.push({
                event,
                tags,
                url: this.getUrl(),
                title: this.getTitle(),
                ts: this.getTs(),
            })
            this.trackItems = trackItems
            const linkElement = this.getLinkElementFromEvent(window.event)
            if (linkElement) window.event.preventDefault()
            if (trackItems.length >= 3 || linkElement) {
                yield this.sendTrackItems()
            }
            if (linkElement) location.href = linkElement.href
        })
    }
    getUrl() {
        return location.href
    }
    getTitle() {
        return document.title
    }
    getTs() {
        return toISO8601(new Date())
    }
    getLinkElementFromEvent(event) {
        if (
            isLinkElement(
                event === null || event === void 0 ? void 0 : event.target
            )
        )
            return event.target
        return null
    }
    sendTrackItems() {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(this.timeoutId)
            if (!this.isPending) {
                let trackItems = this.trackItems
                const trackItemsLengthBeforeFetch = trackItems.length
                this.isPending = true
                const response = yield fetch(this.trackUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(this.trackItems),
                })
                this.isPending = false
                if (response.ok) {
                    trackItems = this.trackItems
                    trackItems.splice(0, trackItemsLengthBeforeFetch)
                    this.trackItems = trackItems
                    return
                }
            }
            this.timeoutId = setTimeout(() => {
                this.sendTrackItems()
            }, 1000)
        })
    }
    unloadHandler() {
        const trackItems = this.trackItems
        this.trackItems = []
        if (trackItems.length) {
            const blob = new Blob([JSON.stringify(trackItems)], {
                type: 'text/plain',
            })
            navigator.sendBeacon(this.trackUrl, blob)
        }
    }
}
window.tracker = new Track()
