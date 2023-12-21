import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVenueRequestDto, GetVenueRequestDto, ListVenueRequestDto, UpdateVenueRequestDto } from '@model/dto/venue.dto';
import { Venue } from '@model/entities/venue.entity';
import { CreateVenueResponse, GetVenueResponse, ListVenueResponse, UpdateVenueResponse } from '@proto/backoffice.pb';

@Injectable()
export class VenueService {
  @InjectRepository(Venue)
  private readonly venueRepository: Repository<Venue>;

  private async makeVenueId(): Promise<string> {
    const venueCount: number = await this.venueRepository.count();
    return `${(venueCount + 1).toString().padStart(3, '0')}`;
  }

  public async CreateVenue({
    customerId,
    countryId,
    sportsId,
    stateId,
    cityId,
    name,
    description,
  }: CreateVenueRequestDto): Promise<CreateVenueResponse> {
    const venueId: string = await this.makeVenueId();
    const venue: Venue = new Venue();

    venue.id = venueId;
    venue.customerId = customerId;
    venue.sportsId = sportsId;
    venue.countryId = countryId;
    venue.stateId = stateId;
    venue.cityId = cityId;
    venue.name = name;
    venue.description = description;

    await this.venueRepository.save(venue);

    return {
      status: HttpStatus.CREATED,
      error: null,
      result: {
        id: venueId,
      },
    };
  }

  public async GetVenue({ id }: GetVenueRequestDto): Promise<GetVenueResponse> {
    const venue: Venue = await this.venueRepository.findOne({ where: { id } });

    if (!venue) {
      return {
        status: HttpStatus.NOT_FOUND,
        result: null,
        error: ['Venue 정보가 존재하지 않습니다.'],
      };
    }

    return {
      status: HttpStatus.OK,
      error: null,
      result: {
        venue: {
          id: venue.id,
          customerId: venue.customerId,
          sportsId: venue.sportsId,
          countryId: venue.countryId,
          stateId: venue.stateId,
          cityId: venue.cityId,
          name: venue.name,
          description: venue.description,
        },
      },
    };
  }

  public async ListVenue({ page, pagesize, sort, order }: ListVenueRequestDto): Promise<ListVenueResponse> {
    !sort ? (sort = 'id') : (sort = sort.toLowerCase());
    !order ? (order = 'DESC') : (order = order.toUpperCase());
    const [venues, totalCount] = await this.venueRepository.findAndCount({
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
        venues: venues.map((venue) => {
          return {
            id: venue.id,
            customerId: venue.customerId,
            sportsId: venue.sportsId,
            countryId: venue.countryId,
            stateId: venue.stateId,
            cityId: venue.cityId,
            name: venue.name,
            description: venue.description,
          };
        }),
      },
    };
  }

  public async UpdateVenue({
    id,
    customerId,
    sportsId,
    countryId,
    stateId,
    cityId,
    name,
    description,
  }: UpdateVenueRequestDto): Promise<UpdateVenueResponse> {
    const venue: Venue = await this.venueRepository.findOne({ where: { id } });

    if (!venue) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Venue 정보가 존재하지 않습니다.'],
      };
    }

    venue.customerId = customerId;
    venue.sportsId = sportsId;
    venue.countryId = countryId;
    venue.stateId = stateId;
    venue.cityId = cityId;
    venue.name = name;
    venue.description = description;
    venue.updatedAt = new Date();

    await this.venueRepository.save(venue);

    return {
      status: HttpStatus.OK,
      error: null,
    };
  }
}
