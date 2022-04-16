import { inject, TestBed } from '@angular/core/testing';

import { DynamicPageResolverService } from './dynamic-page-resolver.service';

describe('DynamicPageResolverService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DynamicPageResolverService],
		});
	});

	it('should be created', inject(
		[DynamicPageResolverService],
		(service: DynamicPageResolverService) => {
			expect(service).toBeTruthy();
		}
	));
});
