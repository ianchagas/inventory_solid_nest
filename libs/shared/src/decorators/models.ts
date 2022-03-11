import { IsDateString, IsNotEmpty } from 'class-validator';

export class IntervalDateCheck {
  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;
}
export class EmptyCheck {
  @IsNotEmpty()
  startDate: Date;
  @IsNotEmpty()
  endDate: Date;
}

export class RequiredConditionDateCheck {
  @IsNotEmpty()
  finalDate: Date;
}
export class FinalDateCheck {
  @IsDateString()
  finalDate: Date;
}
export class DateCheckRequired {
  @IsNotEmpty()
  date: Date;
}
export class DateCheck {
  @IsDateString()
  date: Date;
}
