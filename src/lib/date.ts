const date = (unformated: string = "") =>
  new Date(unformated).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export { date };
