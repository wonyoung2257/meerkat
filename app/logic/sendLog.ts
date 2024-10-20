// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendLog = (event: string, data?: Record<string, any>) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", event, data);
  }
};
