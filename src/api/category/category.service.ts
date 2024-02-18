import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, SubCategory } from '@model/entities';
import {
  CreateCategoryReq,
  CreateCategoryRes,
  GetCategoryReq,
  GetCategoryRes,
  ListCategoryReq,
  ListCategoryRes,
  CreateSubCategoryReq,
} from '@proto/backoffice.pb';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;
  @InjectRepository(SubCategory)
  private readonly subCategoryRepository: Repository<SubCategory>;

  public async CreateCategory(payload: CreateCategoryReq): Promise<CreateCategoryRes> {
    const category: Category = new Category();

    category.name = payload.name.toUpperCase();
    category.code = payload.code.toUpperCase();
    category.description = payload.description;

    await this.categoryRepository.save(category);

    return {
      status: 'success',
      message: 'Category created successfully',
    };
  }

  public async CreateSubCategory(payload: CreateSubCategoryReq): Promise<CreateCategoryRes> {
    const subCateCode = await this.subCategoryRepository.findOne({ where: { code: payload.code.toUpperCase() } });
    if (subCateCode) {
    return {
        status: 'fail',
        message: 'SubCategory code already exists',
      };
    }
    const subCateName = await this.subCategoryRepository.findOne({ where: { code: payload.name.toUpperCase() } });
    if (subCateName) {
    return {
        status: 'fail',
        message: 'SubCategory name already exists',
      };
    }

    const subCategory: SubCategory = new SubCategory();

    subCategory.name = payload.name.toUpperCase();
    subCategory.code = payload.code.toUpperCase();
    subCategory.description = payload.description;

    await this.subCategoryRepository.save(subCategory);

    return {
      status: 'success',
      message: 'SubCategory created successfully',
    };
  }

  public async GetCategory(payload: GetCategoryReq): Promise<GetCategoryRes> {
    const category: Category = await this.categoryRepository.findOne({ where: { id: payload.id } });

    return {
      status: `${HttpStatus.OK}`,
      message: '카테고리 조회 성공',
      data: category,
    };
  }

  public async ListCategory(payload: ListCategoryReq): Promise<ListCategoryRes> {
    const page: number = payload.page || 1;
    const limit: number = payload.limit || 10;
    const sort: string = payload.sort || 'id';
    const order: string = payload.order || 'DESC';

    const categories: Category[] = await this.categoryRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { [sort]: order },
    });

    return {
      status: `${HttpStatus.OK}`,
      message: '카테고리 목록 조회 성공',
      data: categories,
      meta: {
        page: payload.page,
        size: payload.limit,
        total: categories.length,
        sort: payload.sort,
        order: payload.order,
      },
    };
  }
}
