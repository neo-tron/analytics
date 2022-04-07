import { TrackInterface } from './track.interface'
import { toISO8601 } from './helpers/date'
import { isLinkElement } from './helpers/utils'

interface Tracker {
    track(event: string, ...tags: string[]): void
}

class Track implements Tracker {
    private static _instance: Track
    private trackUrl = 'http://localhost:8001/track'
    private TRACKER_DEMO_PAGE = 'TRACKER_DEMO_PAGE'

    constructor() {
        if (Track._instance) {
            return Track._instance
        }

        Track._instance = this
        this.init()
    }

    private init() {
        window.addEventListener('unload', this.unloadHandler.bind(this), false)
    }

    private get trackItems(): TrackInterface[] {
        try {
            return (
                JSON.parse(localStorage.getItem(this.TRACKER_DEMO_PAGE)) || []
            )
        } catch {
            return []
        }
    }

    private set trackItems(items: TrackInterface[]) {
        localStorage.setItem(this.TRACKER_DEMO_PAGE, JSON.stringify(items))
    }

    async track(event: string, ...tags: string[]) {
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
            await this.sendTrackItems()
        }

        if (linkElement) location.href = linkElement.href
    }

    private getUrl() {
        return location.href
    }

    private getTitle() {
        return document.title
    }

    private getTs() {
        return toISO8601(new Date())
    }

    private getLinkElementFromEvent(event?: Event): HTMLLinkElement | null {
        if (isLinkElement(event?.target)) return event.target
        return null
    }

    private isPending = false
    private timeoutId = 0

    private async sendTrackItems() {
        clearTimeout(this.timeoutId)

        if (!this.isPending) {
            let trackItems = this.trackItems
            const trackItemsLengthBeforeFetch = trackItems.length
            this.isPending = true
            const response = await fetch(this.trackUrl, {
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.timeoutId = setTimeout(() => {
            this.sendTrackItems()
        }, 1000)
    }

    private unloadHandler() {
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.tracker = new Track()
