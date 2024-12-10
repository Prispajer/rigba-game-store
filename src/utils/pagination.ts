export const paginatePages = <T>(array: T[]): T[][] => {
  let pages: T[][] = [];
  const pagesSize: number = 10;

  for (let i = 0; i < array.length; i = i + pagesSize) {
    pages.push(array.slice(i, i + pagesSize));
  }

  return pages;
};
