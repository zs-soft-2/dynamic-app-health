import { DynamicLayout } from '@dynamic-app-health/api';

export const dynamicLayouts: DynamicLayout[] = [
	{
		name: '[100]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 100,
					},
				],
				layout: 'row',
			},
		],
	},
	{
		name: '[100] [100]',
		rows: [
			{
				columns: [
					{
						class: 'col1 colh50',
						percent: 100,
					},
					{
						class: 'col1 colh50',
						percent: 100,
					},
				],
				layout: 'row wrap',
			},
		],
	},
	{
		name: '[30-70]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 30,
					},
					{
						class: 'col2',
						percent: 70,
					},
				],
				layout: 'row',
			},
		],
	},
	{
		name: '[50-50]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 50,
					},
					{
						class: 'col2',
						percent: 50,
					},
				],
				layout: 'row',
			},
		],
	},
	{
		name: '[33-33-33] [50-50]',
		rows: [
			{
				columns: [
					{
						class: 'col1 colh50',
						percent: 33,
					},
					{
						class: 'col2 colh50',
						percent: 33,
					},
					{
						class: 'col3 colh50',
						percent: 34,
					},
					{
						class: 'col1 colh50',
						percent: 50,
					},
					{
						class: 'col2 colh50',
						percent: 50,
					},
				],
				layout: 'row wrap',
			},
		],
	},
	{
		name: '[20-50-30]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 20,
					},
					{
						class: 'col2',
						percent: 50,
					},
					{
						class: 'col3',
						percent: 30,
					},
				],
				layout: 'row',
			},
		],
	},
	{
		name: '[20-20-60]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 20,
					},
					{
						class: 'col2',
						percent: 20,
					},
					{
						class: 'col3',
						percent: 60,
					},
				],
				layout: 'row',
			},
		],
	},
	{
		name: '[25-25-25-25]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 25,
					},
					{
						class: 'col2',
						percent: 25,
					},
					{
						class: 'col3',
						percent: 25,
					},
					{
						class: 'col4',
						percent: 25,
					},
				],
				layout: 'row',
			},
		],
	},
];

export const dynamicLayoutsForPages: DynamicLayout[] = [
	{
		name: '[100]',
		rows: [
			{
				columns: [
					{
						class: 'col1',
						percent: 100,
					},
				],
				layout: 'row',
			},
		],
	},
];
