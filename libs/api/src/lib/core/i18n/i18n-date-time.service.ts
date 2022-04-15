import { BaseService } from '../base';

export abstract class DateUtilService extends BaseService {
	public abstract convertToDate(date: number | Date): number;
	public abstract createActionTime(minute: number, second: number): number;
	public abstract createFullTime(
		startTime: number,
		minute: number,
		second: number
	): number;
	public abstract getNextDay(baseDate: Date): Date;
	public abstract getNow(): number;
	public abstract getPreviousDay(baseDate: Date): Date;
	public abstract getToday(): Date;
	public abstract getTomorrow(): Date;
}
