import { CustomError } from '../errors/custom.error';

export interface ExpenseProps {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: string;
  createdBy: string;
  groupId?: string;
  asignatedTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ExpenseEntity {
  public readonly id: string;
  public amount: number;
  public description: string;
  public date: Date;
  public category: string;
  public readonly createdBy: string;
  public readonly groupId?: string;
  public asignatedTo?: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: ExpenseProps) {
    this.id = props.id;
    this.amount = props.amount;
    this.description = props.description;
    this.date = props.date;
    this.category = props.category;
    this.createdBy = props.createdBy;
    this.groupId = props.groupId;
    this.asignatedTo = props.asignatedTo;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  static fromObject( object: {[key:string]:any}){
  
          const { id , amount, description, date, category, createdBy, groupId, asignatedTo, createdAt, updatedAt } = object
              
          if ( !id ) {
              throw CustomError.badRequest( 'Missing id' );
          }
      
          if ( !id ) throw CustomError.badRequest( 'Missing ID' );
          if ( !amount ) throw CustomError.badRequest( 'Missing amount' );
          if ( !createdBy ) throw CustomError.badRequest( 'Missing createdBy' );
          if ( !date ) throw CustomError.badRequest( 'Missing date' );
  
  
          return new ExpenseEntity({ id, amount, description, date, category, createdBy, groupId, asignatedTo, createdAt, updatedAt });
      
      }
}