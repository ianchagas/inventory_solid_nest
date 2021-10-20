import { ProductDTO } from '../dto/request/product.dto';
import { ProductEntity } from '../infra/typeORM/entities/product.entity';

interface IProductRepository {
  create(data: ProductDTO): Promise<ProductEntity>;
}

export { IProductRepository };
