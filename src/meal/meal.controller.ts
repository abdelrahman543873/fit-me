import { MongoIdDto } from './../shared/inputs/mongo-id.dto';
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
import { MealService } from './meal.service';
import { USER_ROLE } from '../user/user.constants';
import { Role } from '../shared/decorators/client.decorator';
import { RoleGuard } from '../shared/guards/role.guard';
import { AddMealDto } from './inputs/add-meal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateMealDto } from './inputs/update-meal.dto';

@ApiTags('meal')
@ApiBearerAuth()
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  async addMeal(
    @Request() request: RequestContext,
    @Body() addMealDto: AddMealDto,
  ) {
    return await this.mealService.addMeal(request.user._id, addMealDto);
  }

  @Put(':id')
  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  async updateMeal(
    @Request() request: RequestContext,
    @Body() updateMealDto: UpdateMealDto,
    @Param() id: MongoIdDto,
  ) {
    return await this.mealService.updateMeal(
      request.user._id,
      id.id,
      updateMealDto,
    );
  }
}
