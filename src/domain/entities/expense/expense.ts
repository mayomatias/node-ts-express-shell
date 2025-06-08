export interface ExpenseProps {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ExpenseEntity {
  public readonly id: string;
  public amount: number;
  public description: string;
  public date: Date;
  public category: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: ExpenseProps) {
    this.id = props.id;
    this.amount = props.amount;
    this.description = props.description;
    this.date = props.date;
    this.category = props.category;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}