import { HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CommonCodeEntity } from '@/model/entities';
import { ItemDetails } from '@/model/entities';
import {
  GetCommonCodesRequest,
  GetCommonCodeRequest,
  PutCommonCodeRequest,
  CommonCodeResponse,
  ModCommonCodeRequest,
  GetItemDetailRequest,
  GetItemDetailResponse,
} from '@proto/backoffice.pb';

@Injectable()
export class CommonCodeService {
  @InjectRepository(CommonCodeEntity)
  private readonly commoncodeRepository: Repository<CommonCodeEntity>;
  @InjectRepository(ItemDetails)
  private readonly itemDetailRepository: Repository<ItemDetails>;

  public async getCommonCodes(): Promise<CommonCodeResponse> {
    const codeData = await this.commoncodeRepository.find({ where: { isDeleted: false } });
    const itemDetail = await this.itemDetailRepository.find();
    const cloneCodeData = Object.assign(codeData);
    cloneCodeData.map((item: any) => {
      if (item.groupCode === 'ITKD') {
        const detailItem = itemDetail.find((detail) => detail.code === item.code);
        item.detail = detailItem;
      }
    });

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: cloneCodeData,
    };
  }

  public async getCommonCode(payload: GetCommonCodeRequest): Promise<CommonCodeResponse> {
    const { groupCode, code } = payload;

    const codeData = await this.commoncodeRepository.findOne({ where: { groupCode, code } });
    if (!codeData) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: HttpStatus.NOT_FOUND.toString(),
        data: [],
      };
    }

    return {
      result: 'success - getCommonCode',
      status: HttpStatus.OK,
      message: 'success',
      data: [codeData],
    };
  }

  public async putCommonCode(payload: PutCommonCodeRequest): Promise<CommonCodeResponse> {
    const { groupCode, code, name, sort, kr, en, jp, ctkd } = payload;

    const dupleCheck = await this.commoncodeRepository.findOne({ where: { groupCode, code } });
    if (dupleCheck) {
      return {
        result: 'fail',
        status: HttpStatus.CONFLICT,
        message: 'this code does exists',
        data: [],
      };
    }

    if (groupCode !== 'MNMG') {
      const checkGroup = await this.commoncodeRepository.findOne({ where: { groupCode: 'MNMG', code: groupCode } });
      if (!checkGroup) {
        return {
          result: 'fail',
          status: HttpStatus.NOT_FOUND,
          message: 'this code does not exists',
          data: [],
        };
      }
    }

    const commoncode: CommonCodeEntity = new CommonCodeEntity();
    commoncode.groupCode = groupCode;
    commoncode.code = code;
    commoncode.name = name;
    commoncode.isDeleted = false;
    const savedInfo = await this.commoncodeRepository.save(commoncode);
    const codeInfo = Object.assign(savedInfo);

    if (kr && en && jp && ctkd) {
      const itemDetailObj = new ItemDetails();
      itemDetailObj.code = code;
      itemDetailObj.sort = sort;
      itemDetailObj.kr = kr;
      itemDetailObj.en = en;
      itemDetailObj.jp = jp;
      itemDetailObj.ctkd = ctkd;
      const detail = await this.itemDetailRepository.save(itemDetailObj);
      codeInfo.detail = detail;
    }

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [codeInfo],
    };
  }

  public async delCommonCode(payload: GetCommonCodeRequest): Promise<CommonCodeResponse> {
    const { groupCode, code } = payload;

    const checkGroup = await this.commoncodeRepository.findOne({ where: { groupCode, code } });
    if (!checkGroup) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'groupCode not found',
        data: [],
      };
    }

    checkGroup.isDeleted = true;
    await this.commoncodeRepository.save(checkGroup);

    return {
      result: 'success',
      status: HttpStatus.OK,
      message: 'success',
      data: [checkGroup],
    };
  }
  public async modCommonCode(payload: ModCommonCodeRequest): Promise<CommonCodeResponse> {
    const { groupCode, code, newCode, newName, detailId, sort, kr, en, jp, ctkd } = payload;

    const checkGroup = await this.commoncodeRepository.findOne({ where: { groupCode, code } });
    if (!checkGroup) {
      return {
        result: 'fail',
        status: HttpStatus.NOT_FOUND,
        message: 'commonCode not found',
        data: [],
      };
    }

    checkGroup.code = newCode;
    checkGroup.name = newName;
    const savedInfo = await this.commoncodeRepository.save(checkGroup);
    const codeInfo = Object.assign(savedInfo);

    if (groupCode === 'ITKD' && kr && en && jp && ctkd) {
      const existsDetailCode = await this.itemDetailRepository.findOne({ where: { id: detailId } });
      if (existsDetailCode) {
        existsDetailCode.code = newCode;
        existsDetailCode.sort = sort;
        existsDetailCode.kr = kr;
        existsDetailCode.en = en;
        existsDetailCode.jp = jp;
        existsDetailCode.ctkd = ctkd;
        const detail = await this.itemDetailRepository.save(existsDetailCode);
        codeInfo.detail = detail;
      }
    }

    return {
      result: 'success - modCommonCode',
      status: HttpStatus.OK,
      message: 'success',
      data: [codeInfo],
    };
  }

  public async getDetailCode(payload: GetItemDetailRequest): Promise<GetItemDetailResponse> {
    const commonCode = await this.commoncodeRepository.findBy({ groupCode: In(['CTKD', 'ITKD']) });
    const detailCode = await this.itemDetailRepository.find({
      select: {
        code: true,
        ctkd: true,
      },
    });
    const assignObj = Object.assign(commonCode);

    const transformData = await assignObj.map((item) => {
      const ctkd = detailCode.find((detail) => detail.code === item.code);
      if (ctkd) {
        item.ctkd = ctkd.ctkd;
      }
      return item;
    });

    return {
      result: 'success - getDetailCode',
      status: HttpStatus.OK,
      message: 'success',
      data: transformData,
    };
  }
}
