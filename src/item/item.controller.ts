import { RequestContext } from './../shared/interfaces/request-context.interface';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { AddItemsDto } from './inputs/add-items.dto';
import { Role } from '../shared/decorators/client.decorator';
import { USER_ROLE } from '../user/user.constants';
import { RoleGuard } from '../shared/guards/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Item } from './item.schema';

@ApiTags('item')
@ApiBearerAuth()
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  @Post('bulk')
  async addItems(
    @Request() request: RequestContext,
    @Body() addItemsDto: AddItemsDto,
  ): Promise<Item[]> {
    return await this.itemService.addItems(request.user._id, addItemsDto);
  }
}
