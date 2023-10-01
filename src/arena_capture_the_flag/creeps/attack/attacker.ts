import { state } from 'arena_capture_the_flag/constants/state'
import { getRange } from 'game/utils'

export const attack = () => {
    state.attackers.forEach(creep => {
        const targets = state.enemyCreeps.filter(i => getRange(i, creep.initialPos) < 10).sort((a, b) => getRange(a, creep) - getRange(b, creep))

        if (targets.length > 0) {
            creep.moveTo(targets[0])
            creep.attack(targets[0])
        } else {
            creep.moveTo(creep.initialPos)
        }
    })
}
