import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DietService } from './diet.service';
import { AddDietDto } from './inputs/add-diet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { Role } from '../shared/decorators/client.decorator';

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
}
