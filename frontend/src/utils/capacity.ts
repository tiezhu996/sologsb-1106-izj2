import type { Block } from '../types/block'
import type { Carver, SkillLevel } from '../types/carver'

/** 各技艺等级同时在刻的版片上限：学徒两块、熟练三块、师傅四块。 */
export const CARVER_CAPACITY: Record<SkillLevel, number> = {
  学徒: 2,
  熟练: 3,
  师傅: 4,
}

export interface CarverSlot {
  /** 当前在刻块数 */
  active: number
  /** 在刻上限 */
  capacity: number
  /** 在刻数是否已到顶 */
  full: boolean
}

export function carverCapacity(level: SkillLevel): number {
  return CARVER_CAPACITY[level]
}

/** 只统计名下仍在刻的版片；已刻成、已修版或已撤下的版片不占名额。 */
export function countActiveBlocks(carver: Carver, blocks: Block[]): number {
  return blocks.filter((block) => block.state === '在刻' && carver.activeBlockIds.includes(block.id)).length
}

export function carverSlot(carver: Carver, blocks: Block[]): CarverSlot {
  const active = countActiveBlocks(carver, blocks)
  const capacity = carverCapacity(carver.skillLevel)
  return { active, capacity, full: active >= capacity }
}
