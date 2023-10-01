import { Flag } from 'arena/prototypes'
import { MOVE, TOUGH } from 'game/constants'
import { Creep, StructureTower } from 'game/prototypes'
import { getObjectsByPrototype } from 'game/utils'
import { Role, roleMapper } from './enums'

export const state: State = {
    flag: undefined,
    enemyFlag: undefined,
    attackers: [],
    enemyAttackers: [],
    healers: [],
    enemyHealers: [],
    rangedAttackers: [],
    enemyRangedAttackers: [],
    enemyCreeps: [],
    towers: [],
    enemyTowers: [],
}

interface State {
    flag: Flag | undefined
    enemyFlag: Flag | undefined
    attackers: Creep[]
    enemyAttackers: Creep[]
    healers: Creep[]
    enemyHealers: Creep[]
    rangedAttackers: Creep[]
    enemyRangedAttackers: Creep[]
    enemyCreeps: Creep[]
    towers: StructureTower[]
    enemyTowers: StructureTower[]
}

export function initialize(): void {
    const flags = getObjectsByPrototype(Flag)

    state.flag = flags.find(i => i.my)
    state.enemyFlag = flags.find(i => !i.my)

    getObjectsByPrototype(Creep).forEach(creep => {
        creep.initialPos = { x: creep.x, y: creep.y }

        const partType = creep.body.find(part => part.type !== TOUGH && part.type !== MOVE) || { type: TOUGH, hits: 0 }
        creep.role = roleMapper(partType.type)

        if (creep.my) {
            if (creep.role === Role.Attacker) {
                state.attackers.push(creep)
            } else if (creep.role === Role.Healer) {
                state.healers.push(creep)
            } else if (creep.role === Role.RangedAttacker) {
                state.rangedAttackers.push(creep)
            }
        } else {
            if (creep.role === Role.Attacker) {
                state.enemyAttackers.push(creep)
            } else if (creep.role === Role.Healer) {
                state.enemyHealers.push(creep)
            } else if (creep.role === Role.RangedAttacker) {
                state.enemyRangedAttackers.push(creep)
            }
        }

        state.enemyCreeps = [...state.enemyAttackers, ...state.enemyHealers, ...state.enemyRangedAttackers]
    })

    getObjectsByPrototype(StructureTower).forEach(tower => {
        if (tower.my) {
            state.towers.push(tower)
        } else {
            state.enemyTowers.push(tower)
        }
    })
}

export const refreshState = (): void => {
    state.attackers = state.attackers.filter(i => i.hits > 0)
    state.healers = state.healers.filter(i => i.hits > 0)
    state.rangedAttackers = state.rangedAttackers.filter(i => i.hits > 0)
    state.enemyAttackers = state.enemyAttackers.filter(i => i.hits > 0)
    state.enemyHealers = state.enemyHealers.filter(i => i.hits > 0)
    state.enemyRangedAttackers = state.enemyRangedAttackers.filter(i => i.hits > 0)
    state.enemyCreeps = state.enemyCreeps.filter(i => i.hits > 0)
}
