export abstract class CommonUtilService {
	public abstract createComponentId(): string;
	public abstract createEntityId(): string;
	public abstract createId(length: number): string;
	public abstract createItemId(): string;
}
