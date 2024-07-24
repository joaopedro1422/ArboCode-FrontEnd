export interface PlantaData{
    id: number,
    nomePlanta: string,
    descriçaoPlanta: string,
    porte: string,
    imagem: string,
    valor:number
}

export interface PaginatedResponse<T> {
    content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}