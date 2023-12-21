import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sector } from '@model/entities/sector.entity';
import { Venue } from '@model/entities/Venue.entity';

import { CreateSectorRequestDto, GetSectorRequestDto, ListSectorRequestDto, UpdateSectorRequestDto } from '@model/dto/sector.dto';
import { CreateSectorResponse, GetSectorResponse, ListSectorResponse, UpdateSectorResponse } from '@proto/backoffice.pb';

@Injectable()
export class SectorService {
  @InjectRepository(Sector)
  private readonly sectorRepository: Repository<Sector>;
  @InjectRepository(Venue)
  private readonly venueRepository: Repository<Venue>;

  private async makeSectorId(): Promise<string> {
    const sectorCount: number = await this.sectorRepository.count();
    return `${(sectorCount + 1).toString().padStart(3, '0')}`;
  }

  public async CreateSector({ customerId, venueId, name, description }: CreateSectorRequestDto): Promise<CreateSectorResponse> {
    const sectorId: string = await this.makeSectorId();
    const sector: Sector = new Sector();

    sector.id = sectorId;
    sector.customerId = customerId;
    sector.venueId = venueId;
    sector.name = name;
    sector.description = description;

    await this.sectorRepository.save(sector);

    return {
      status: HttpStatus.CREATED,
      error: null,
      result: {
        id: venueId,
      },
    };
  }

  public async GetSector({ id }: GetSectorRequestDto): Promise<GetSectorResponse> {
    const sector: Sector = await this.sectorRepository.findOne({ where: { id } });
    const sportsId: string = (await this.venueRepository.findOne({ where: { id: sector.venueId } })).sportsId;
    if (!sector) {
      return {
        status: HttpStatus.NOT_FOUND,
        result: null,
        error: ['Sector 정보가 존재하지 않습니다.'],
      };
    }

    return {
      status: HttpStatus.OK,
      result: {
        sector: {
          id: sector.id,
          sportsId: sportsId,
          customerId: sector.customerId,
          venueId: sector.venueId,
          name: sector.name,
          description: sector.description,
        },
      },
      error: null,
    };
  }

  public async ListSector({ page, pagesize, sort, order }: ListSectorRequestDto): Promise<ListSectorResponse> {
    const [sectors, totalCount]: [Sector[], number] = await this.sectorRepository.findAndCount({
      skip: (page - 1) * pagesize,
      take: pagesize,
      order: {
        [sort]: order,
      },
    });

    return {
      status: HttpStatus.OK,
      totalCount,
      page,
      lastPage: Math.ceil(totalCount / pagesize),
      error: null,
      result: {
        sectors: sectors.map((sector: Sector) => ({
          id: sector.id,
          customerId: sector.customerId,
          venueId: sector.venueId,
          name: sector.name,
          description: sector.description,
        })),
      },
    };
  }

  public async UpdateSector({
    id,
    customerId,
    venueId,
    name,
    description,
  }: UpdateSectorRequestDto): Promise<UpdateSectorResponse> {
    const sector: Sector = await this.sectorRepository.findOne({ where: { id } });

    if (!sector) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Sector 정보가 존재하지 않습니다.'],
      };
    }

    sector.customerId = customerId;
    sector.venueId = venueId;
    sector.name = name;
    sector.description = description;

    await this.sectorRepository.save(sector);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
