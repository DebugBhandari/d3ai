export const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:3002"
    : "https://d3ai.jobd.link";
