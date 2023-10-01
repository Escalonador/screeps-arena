import { state } from 'arena_capture_the_flag/constants/state'
import { ERR_NOT_IN_RANGE } from 'game/constants'

export const heal = () => {
    state.healers.forEach(creep => {
        const damagedCreeps = state.allyCreeps.filter(i => i.hits < i.hitsMax)
        const target = creep.findClosestByRange(damagedCreeps)

        if (target && creep.heal(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
        }
    })
}
