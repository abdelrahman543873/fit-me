import { RequestContext } from './../shared/interfaces/request-context.interface';
import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { FormService } from './form.service';
import { AddFormDto } from './inputs/add-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteFormDto } from './inputs/delete-form.dto';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { Get } from '@nestjs/common';
import { FilterFormsDto } from './inputs/filter-forms.dto';

@ApiTags('form')
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

  @Get('filter')
  async filterForms(
    @Request() request: RequestContext,
    @Query() filterFormsDto: FilterFormsDto,
  ) {
    return await this.formService.filterForms(
      request.trainerId || request.user._id,
      filterFormsDto,
    );
  }
}
