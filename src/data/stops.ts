// Section ids in page order. Each one is a tram stop in the navbar.
export const STOP_IDS = ['top', 'about', 'skills', 'projects', 'experience', 'contact'] as const
export type StopId = (typeof STOP_IDS)[number]
