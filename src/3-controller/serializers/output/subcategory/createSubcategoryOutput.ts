export type CreateSubcategoryOutput = {
  subcategoryId: number,
  category: CreateCategoryOutput,
  name: string
}

export type CreateCategoryOutput = {
  categoryId: number,
  name: string
}