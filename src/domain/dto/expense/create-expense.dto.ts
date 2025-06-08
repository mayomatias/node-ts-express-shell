export class CreateExpenseDTO {

  public readonly id: string;
  public readonly amount: number;
  public readonly description: string;
  public readonly date: Date;
  public readonly category: string;
  // The CreateExpenseDTO class is used to transfer data for creating a new expense.
  // It encapsulates the necessary properties required to create an expense entity.
  // This class is typically used in the context of a use case or service that handles the creation of expenses.
  // It includes properties such as id, amount, description, date, and category.
  // The constructor is private to enforce the use of the static create method for instantiation. 


  private constructor(id: string, amount: number, description: string, date: Date, category: string) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.category = category;
  }

  public static create(props: {[key: string]: any}): [string?, CreateExpenseDTO?] {
    
    
    const { id, amount, description, date, category } = props;


    if (!id || !amount || !description || !date || !category) {
      return ['All fields are required', undefined];
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
    
    return [undefined ,new CreateExpenseDTO(id, amount, description, date, category)];
  }

}