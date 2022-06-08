export interface Pagination {
	index?: number;
	rows: number;
	isPagination: boolean;
	showPageLinks: boolean;
	showJumpToPageDropdown: boolean;
	total?: number;
}
