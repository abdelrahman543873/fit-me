import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddFollowUpDto } from './inputs/add-follow-up.dto';
import { FollowUpService } from './follow-up.service';
import { RequestContext } from '../../dist/shared/interfaces/request-context.interface';
import { RoleGuard } from '../shared/guards/role.guard';
import { USER_ROLE } from '../user/user.constants';
import { Role } from '../shared/decorators/client.decorator';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('follow-up')
@Controller('follow-up')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Post()
  @Role(USER_ROLE.TRAINER)
  @UseGuards(RoleGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  async addFollowUp(
    @Request() request: RequestContext,
    @Body() addFollowUpDto: AddFollowUpDto,
  ) {
    return await this.followUpService.addFollowUp(
      request.user._id,
      addFollowUpDto,
    );
  }
}
