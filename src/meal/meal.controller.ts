import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { USER_ROLE } from '../user/user.constants';
import { Role } from '../shared/decorators/client.decorator';
import { RoleGuard } from '../shared/guards/role.guard';
import { AddMealDto } from './inputs/add-meal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
