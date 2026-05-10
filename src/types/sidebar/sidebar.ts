export interface sidebarItem {
    label: string,
    path?: string,
    icon: string,
    subPath?: {
        label: string,
        path?: string,
        kPath?: {
            label: string,
            path: string,
        }[]
    }[]
}