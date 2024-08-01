import { User } from 'entities/User';
import { SelectQueryBuilder } from 'typeorm';

export class ApiFeatures {
  constructor(
    private query: SelectQueryBuilder<User>,
    private queryString,
  ) {}
  convertOperator(op: string) {
    const operatorMap = {
      gte: '>=',
      gt: '>',
      lt: '<',
      lte: '<=',
    };
    return operatorMap[op];
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['fields', 'sort', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);

    //Advanced filtering
    Object.entries(queryObj).forEach(([key, value]) => {
      const [[operator, operatorValue]] = Object.entries(value);

      if (/\b(gte|gt|lte|lt)\b/.test(operator)) {
        const typeOrmOperator = this.convertOperator(operator);
        this.query.andWhere(`user.${key} ${typeOrmOperator} :${key}`, {
          [key]: operatorValue,
        });
      } else
        this.query.andWhere(`user.${key} = :${key}`, { [key]: queryObj[key] });
    });
    return this;
  }

  sort() {
    if (this.queryString.sort && this.queryString.sortOrder) {
      this.query.orderBy(
        `user.${this.queryString.sort}`,
        this.queryString.sortOrder.toUpperCase(),
      );
    } else {
      this.query = this.query.orderBy('user.id', 'ASC');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields
        .split(',')
        .map((field) => `user.${field}`);
      this.query = this.query.select(fields);
    }
    return this;
  }
  returnQuery() {
    return this.query;
  }
}
