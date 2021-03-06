import ILogger, { LoggerToken } from '../../modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../repositories/iCategoryRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { ICategory } from '../../../1-domain/entities/categoryEntity'
import { Inject, Service } from 'typedi'

export const GetByIdCategoryUseCaseToken = 'GetByIdCategoryUseCase'

@Service(GetByIdCategoryUseCaseToken)
export class GetByIdCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  async exec (categoryId: number): Promise<ICategory> {
    this._logger.info(`class: ${GetByIdCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const category = await this._categoryRepository.getById(categoryId)

    this._logger.info(`class: ${GetByIdCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    return category
  }
  
}