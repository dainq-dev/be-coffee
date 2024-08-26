/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function pagingHandler(page: number, size: number) {
  return {
    take: size,
    skip: (page - 1) * size,
  };
}

export function pagingResponse(
  data: any,
  total: number,
  page: number,
  pageSize: number,
) {
  const pageCount = Math.ceil(Number(total) / pageSize);
  return {
    records: data,
    total,
    page,
    pageCount,
  };
}
