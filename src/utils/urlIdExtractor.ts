export function extract(url: string) {
    return Number(url.split('/').filter(Boolean).pop());
}