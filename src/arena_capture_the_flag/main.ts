/* eslint-disable no-underscore-dangle */
import { getTicks } from 'game/utils'
import { initialize, refreshState } from './constants/state'
import { attack } from './creeps/attack/attacker'
import { heal } from './creeps/healers/healer'
import { rangedAttack } from './creeps/rangedAttack/rangedAttacker'
import { init } from './prototypes/merge.proto'
import { computeTower } from './towers/tower'

init()
const _loop = (): void => {
    attack()
    rangedAttack()
    computeTower()
    heal()
}

export function loop(): void {
    if (getTicks() === 1) {
        initialize()
    }
    _loop()
    refreshState()
}
