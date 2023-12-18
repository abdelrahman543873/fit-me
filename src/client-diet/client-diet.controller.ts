import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ClientDietService } from './client-diet.service';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientDiet } from './client-diet.schema';

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
}
