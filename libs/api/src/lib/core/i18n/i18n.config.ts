import { LanguagesEnum } from './languages.enum';

export interface I18nConfig {
	availableLangs?: LanguagesEnum[];
	defaultLang?: LanguagesEnum;
	prodMode: boolean;
	reRenderOnLangChange?: boolean;
}
