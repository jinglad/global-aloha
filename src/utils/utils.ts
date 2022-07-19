export const isBrowser = typeof window !== "undefined";
export const token = isBrowser && localStorage.getItem("ga_token");