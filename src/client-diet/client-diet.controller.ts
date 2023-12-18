import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ClientDietService } from './client-diet.service';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientDiet } from './client-diet.schema';
import { FilterClientDietsDto } from './inputs/filter-client-diets.input';
import { USER_ROLE } from '../user/user.constants';

@ApiBearerAuth()
@ApiTags('client-diet')
@Controller('client-diet')
export class ClientDietController {
  constructor(private readonly clientDietService: ClientDietService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addClientDiet(
    @Body() addClientDietDto: AddClientDietDto,
  ): Promise<ClientDiet> {
    return await this.clientDietService.addClientDiet(addClientDietDto);
  }

  @Get('filter')
  async filterClientDiets(
    @Request() request: RequestContext,
    @Query() filterClientDietsDto: FilterClientDietsDto,
  ) {
    return await this.clientDietService.filterClientDiets(
      request.user.role === USER_ROLE.CLIENT
        ? request.trainerId
        : request.user._id,
      filterClientDietsDto,
    );
  }
}
