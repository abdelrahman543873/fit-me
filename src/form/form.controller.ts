import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { FormService } from './form.service';
import { AddFormDto } from './inputs/add-form.dto';
import { RequestContext } from '../../dist/shared/interfaces/request-context.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteFormDto } from './inputs/delete-form.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';

@ApiBearerAuth()
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  async addForm(
    @Request() request: RequestContext,
    @Body() addFormDto: AddFormDto,
  ) {
    return await this.formService.addForm(request.user._id, addFormDto);
  }

  @Delete()
  @UseInterceptors(RequestInBodyInterceptor)
  async deleteForm(
    @Request() request: RequestContext,
    @Body() deleteFormDto: DeleteFormDto,
  ) {
    return await this.formService.deleteForm(request.user._id, deleteFormDto);
  }
}
