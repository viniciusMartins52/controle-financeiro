import ILogger, { LoggerToken } from '../../modules/iLogger'
import { ICategoryRepository, ICategoryRepositoryToken } from '../../repositories/iCategoryRepository'
import { BaseUseCase } from '../../utils/baseUseCase'
import { CategoryEntity, ICategory } from '../../../1-domain/entities/categoryEntity'
import { baseErrorList, CodeErrors } from '../../../1-domain/utils/baseErrorList'
import { Inject, Service } from 'typedi'

export const UpdateCategoryUseCaseToken = 'UpdateCategoryUseCase'

@Service(UpdateCategoryUseCaseToken)
export class UpdateCategoryUseCase extends BaseUseCase<ICategory> {
  
  @Inject(ICategoryRepositoryToken)
  private readonly _categoryRepository!: ICategoryRepository

  @Inject(LoggerToken)
  private readonly _logger!: ILogger
  
  private _categoryEntity!: CategoryEntity

  constructor() {
    super()
    this._categoryEntity = new CategoryEntity()
  }

  async exec (categoryId: number, name: string): Promise<CategoryEntity> {
    this._logger.info(`class: ${UpdateCategoryUseCase.name} | method: exec | message: starting useCase execution`)

    const existingCategory = await this._categoryRepository.getById(categoryId)

    if(!existingCategory) {
      this._logger.error(`class: ${UpdateCategoryUseCase.name} | method: exec | message: non-existent category ${name} `)
      this._categoryEntity.setError({
        code: CodeErrors.NON_EXISTENT_VALUE,
        message: `Categoria com categoryId: ${categoryId} não existe`
      } as baseErrorList)

      return this._categoryEntity
    }

    const existingCategoryWithName = await this._categoryRepository.getByName(name)

    if(existingCategoryWithName) {
      this._logger.error(`class: ${UpdateCategoryUseCase.name} | method: exec | message: existing category with name ${name} `)

      this._categoryEntity.setError({
        code: CodeErrors.EXISTING_VALUE,
        message: `Categoria ${name} já existe`
      } as baseErrorList)

      return this._categoryEntity
    }
    if(name) {
      existingCategory.name = name
    }
    const category = await this._categoryRepository.update(existingCategory)

    this._logger.info(`class: ${UpdateCategoryUseCase.name} | method: exec | message: finishing useCase execution`)
    this._categoryEntity.setCategory(category)
    return this._categoryEntity
  }
  
}