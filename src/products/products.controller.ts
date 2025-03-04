import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { CreateProductDto, PaginationDto, UpdateProductDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productClient
      .send({ cmd: 'create-product' }, product)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Get()
  getAllProducts(@Query() pagination: PaginationDto) {
    return this.productClient.send({ cmd: 'find-all-products' }, pagination);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'find-one-product' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productClient
      .send({ cmd: 'update-product' }, { id, ...body })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productClient
      .send({ cmd: 'delete-products' }, { id })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
