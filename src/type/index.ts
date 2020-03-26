export interface ApiResponse {
  code: number;
  data: any;
  message: string;
}

export interface Filter {
  label: string;
  value: string;
}

export class Column {
  title?: string;
  key?: string;
  sortable?: boolean;
  type?: string;
  width?: number;
  align?: string;
  filters?: Array<Filter>;
  filterMultiple?: boolean;

}

