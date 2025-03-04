import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/orders/enum';

export class UpdateOrderDto {
  @IsNumber()
  id: number;

  @IsEnum(OrderStatusList, { message: `Valid status are ${OrderStatusList}` })
  status: OrderStatus;
}
