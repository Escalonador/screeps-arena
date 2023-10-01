import { state } from 'arena_capture_the_flag/constants/state'
import { getRange } from 'game/utils'
import { findSuitablePart } from '../strategy'

export const rangedAttack = () => {
    state.rangedAttackers.forEach(creep => {
        const targets = state.enemyCreeps.sort((a, b) => getRange(a, creep) - getRange(b, creep))

        const suitablePart = findSuitablePart(creep)[0]

        if (suitablePart) {
            creep.moveTo(suitablePart)
        } else if (targets.length > 0) {
            if (getRange(targets[0], creep) > 3) {
                creep.moveTo(targets[0])
            }
            creep.rangedAttack(targets[0])
            creep.flee(3)
        } else if (state.enemyFlag) {
            creep.moveTo(state.enemyFlag)
        }
    })
}
