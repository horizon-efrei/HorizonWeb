import type { FilterQuery } from '@mikro-orm/core';
import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Content } from '../contents/content.entity';
import { BaseRepository } from '../shared/lib/repositories/base.repository';
import { assertPermissions } from '../shared/lib/utils/assertPermission';
import { Action } from '../shared/modules/authorization';
import { CaslAbilityFactory } from '../shared/modules/casl/casl-ability.factory';
import type { PaginationOptions } from '../shared/modules/pagination/pagination-option.interface';
import type { PaginatedResult } from '../shared/modules/pagination/pagination.interface';
import { User } from '../users/user.entity';
import type { CreateReportDto } from './dto/create-report.dto';
import type { GetReportsDto } from './dto/get-reports.dto';
import type { UpdateReportDto } from './dto/update-report.dto';
import { ReportSearchService } from './report-search.service';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportRepository: BaseRepository<Report>,
    @InjectRepository(Content) private readonly contentRepository: BaseRepository<Content>,
    @InjectRepository(User) private readonly userRepository: BaseRepository<User>,
    private readonly reportSearchService: ReportSearchService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  public async create(userId: string, reporter: User, createReportDto: CreateReportDto): Promise<Report> {
    const user = await this.userRepository.findOneOrFail({ userId });

    let content: Content | null = null;
    if (createReportDto.contentId)
      content = await this.contentRepository.findOne({ contentId: createReportDto.contentId });

    if (content) {
      const ability = this.caslAbilityFactory.createForUser(reporter);
      assertPermissions(ability, Action.Report, content);
    }

    const reports = await this.reportRepository.count({ content, user, reporter });
    if (reports !== 0)
      throw new BadRequestException('User already reported through this content');

    const report = new Report({
      ...createReportDto,
      content,
      reporter,
      user,
    });
    await this.reportRepository.persistAndFlush(report);
    await this.reportSearchService.add(report);
    return report;
  }

  public async findAll(
    filters: GetReportsDto,
    paginationOptions?: PaginationOptions,
  ): Promise<PaginatedResult<Report>> {
    let options: FilterQuery<Report> = {};
    if (filters.byUserId)
      options = { ...options, reporter: { userId: filters.byUserId } };
    if (filters.forUserId)
      options = { ...options, user: { userId: filters.forUserId } };
    if (filters.throughContentId)
      options = { ...options, content: { contentId: filters.throughContentId } };

    return await this.reportRepository.findWithPagination(
      paginationOptions,
      options,
      { populate: ['content', 'user'] },
    );
  }

  public async findOne(reportId: number): Promise<Report> {
    return await this.reportRepository.findOneOrFail({ reportId }, ['content', 'user', 'reporter']);
  }

  public async update(user: User, reportId: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.reportRepository.findOneOrFail({ reportId }, ['content', 'user', 'reporter']);

    const ability = this.caslAbilityFactory.createForUser(user);
    assertPermissions(ability, Action.Update, report);

    wrap(report).assign(updateReportDto);
    await this.reportRepository.flush();
    await this.reportSearchService.update(report);
    return report;
  }

  public async remove(reportId: number): Promise<void> {
    const report = await this.reportRepository.findOneOrFail({ reportId });
    await this.reportRepository.removeAndFlush(report);
    await this.reportSearchService.remove(report.reportId.toString());
  }
}
