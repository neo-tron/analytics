export function isLinkElement(
    eventTarget?: EventTarget
): eventTarget is HTMLLinkElement {
    return (eventTarget as HTMLElement)?.tagName === 'A'
}
