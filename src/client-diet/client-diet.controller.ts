import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ClientDietService } from './client-diet.service';
import { AddClientDietDto } from './inputs/add-client-diet.input';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';

@Controller('client-diet')
export class ClientDietController {
  constructor(private readonly clientDietService: ClientDietService) {}

  @Post()
  @UseInterceptors(RequestInBodyInterceptor)
  async addClientDiet(@Body() addClientDietDto: AddClientDietDto) {
    return await this.clientDietService.addClientDiet(addClientDietDto);
  }
}
