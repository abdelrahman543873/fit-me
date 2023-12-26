import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DietService } from './diet.service';
import { AddDietDto } from './inputs/add-diet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { Role } from '../shared/decorators/client.decorator';
import { UpdateDietDto } from './inputs/update-diet.dto';
import { MongoIdDto } from '../shared/inputs/mongo-id.dto';
import { Get } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('diet')
@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  async addDiet(
    @Request() request: RequestContext,
    @Body() addDietDto: AddDietDto,
  ) {
    return await this.dietService.addDiet(request.user._id, addDietDto);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Role(USER_ROLE.TRAINER)
  async updateDiet(
    @Request() request: RequestContext,
    @Body() updateDietDto: UpdateDietDto,
    @Param() id: MongoIdDto,
  ) {
    return await this.dietService.updateDiet(
      id.id,
      request.user._id,
      updateDietDto,
    );
  }

  @Get(':id')
  async getDiet(@Request() request: RequestContext, @Param() diet: MongoIdDto) {
    return await this.dietService.getDiet(
      diet.id,
      request.trainerId || request.user._id,
    );
  }
}
