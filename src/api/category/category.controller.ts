import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CATEGORY_SERVICE_NAME,
  CreateCategoryReq,
  CreateCategoryRes,
  CreateSubCategoryReq,
  GetCategoryReq,
  GetCategoryRes,
  ListCategoryReq,
  ListCategoryRes,
} from '@proto/backoffice.pb';

import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  @Inject(CategoryService)
  private readonly categoryService: CategoryService;

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'createCategory')
  private createCategory(payload: CreateCategoryReq): Promise<CreateCategoryRes> {
    return this.categoryService.CreateCategory(payload);
  }

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'createSubCategory')
  private createSubCategory(payload: CreateSubCategoryReq): Promise<CreateCategoryRes> {
    return this.categoryService.CreateSubCategory(payload);
  }

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'listCategory')
  private listCategory(payload: ListCategoryReq): Promise<ListCategoryRes> {
    return this.categoryService.ListCategory(payload);
  }

  @GrpcMethod(CATEGORY_SERVICE_NAME, 'getCategory')
  private getCategory(payload: GetCategoryReq): Promise<GetCategoryRes> {
    return this.categoryService.GetCategory(payload);
  }
}
