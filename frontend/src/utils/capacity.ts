import type { SkillLevel } from '../types/carver'

/** 同时在刻版数上限：学徒两块、熟练三块、师傅四块，超过就刻不过来。 */
export const CARVER_CAPACITY: Record<SkillLevel, number> = {
  学徒: 2,
  熟练: 3,
  师傅: 4,
}

export function carverCapacity(level: SkillLevel): number {
  return CARVER_CAPACITY[level]
}

export function isCarverFull(level: SkillLevel, activeCount: number): boolean {
  return activeCount >= carverCapacity(level)
}
