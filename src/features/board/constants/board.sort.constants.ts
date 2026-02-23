export const SORT_BY = {
  CREATED_AT: 'CREATED_AT',
  DUE_DATE: 'DUE_DATE',
} as const;

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const SORT_OPTIONS = [
  { label: '생성일자순', value: SORT_BY.CREATED_AT },
  { label: '마감일자순', value: SORT_BY.DUE_DATE },
] as const;

export const DIRECTION_OPTIONS = [
  { label: '오름차순', value: DIRECTION.ASC },
  { label: '내림차순', value: DIRECTION.DESC },
] as const;
