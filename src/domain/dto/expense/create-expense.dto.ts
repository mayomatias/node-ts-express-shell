export class CreateExpenseDTO {

  public readonly amount: number;
  public readonly description: string;
  public readonly date: Date;
  public readonly category: string;

  public readonly createdBy: string; //user who created the expense
  public readonly groupId?: string; //can be null
  public readonly asignatedTo?: string; // its noGroup

  private constructor( amount: number, description: string, date: Date, category: string, createdBy: string, groupId?: string, asignatedTo?: string) {
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.category = category;
    this.createdBy = createdBy;
    this.groupId = groupId;
    this.asignatedTo = asignatedTo;
  }

  public static create(props: {[key: string]: any}): [string?, CreateExpenseDTO?] {
      
    const createdBy = props.user?.id;
    const asignatedTo = props.user?.id;
    const { amount, description, date, category, groupId } = props;


    if (!createdBy || !amount || !description || !date || !category) {
      return ['-All fields are required', undefined];
    }
    if (typeof amount !== 'number' || amount <= 0) {
      return ['Amount must be a positive number', undefined];
    }
    if (typeof description !== 'string' || description.trim() === '') {
      return ['Description must be a non-empty string', undefined];
    }
 /*    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return ['Date must be a valid date object', undefined];
    } */
    if (typeof category !== 'string' || category.trim() === '') {
      return ['Category must be a non-empty string', undefined];
    }
    // If all validations pass, create and return a new CreateExpenseDTO instance
    
    return [undefined ,new CreateExpenseDTO(amount, description, date, category, createdBy, groupId, asignatedTo)];
  }

}