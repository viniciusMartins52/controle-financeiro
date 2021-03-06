import { GetAllFiltersDto } from '../../dto/release/getAllFiltersDto'
import ILogger, { LoggerToken } from '../../modules/iLogger'
import { IReleaseRepository, IReleaseRepositoryToken } from '../../repositories/iReleaseRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { IRelease } from '../../../1-domain/entities/releaseEntity'
import { Inject, Service } from 'typedi'

export const GetAllReleaseUseCaseToken = 'GetAllReleaseUseCase'

@Service(GetAllReleaseUseCaseToken)
export class GetAllReleaseUseCase extends BaseUseCase<IRelease> {
  
  @Inject(IReleaseRepositoryToken)
  private readonly _releaseRepository!: IReleaseRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (input: GetAllFiltersDto): Promise<IRelease[]> {
    this._logger.info(`class: ${GetAllReleaseUseCase.name} | method: exec | message: starting useCase execution`)

    const releases = await this._releaseRepository.getAll(input)
    this._logger.info(`class: ${GetAllReleaseUseCase.name} | method: exec | message: return useCase ${JSON.stringify(releases)}`)

    this._logger.info(`class: ${GetAllReleaseUseCase.name} | method: exec | message: finishing useCase execution`)
    return releases
  }
  
}