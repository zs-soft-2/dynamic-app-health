import { BaseService } from '../../common';

export abstract class I18nUtil extends BaseService {
	public abstract updateLanguage(language: string): void;
}
