/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from 'arena_capture_the_flag/constants/enums'
import { state } from 'arena_capture_the_flag/constants/state'
import { searchPath } from 'game/path-finder'
import { Creep } from 'game/prototypes'
import { getDirection, getRange } from 'game/utils'

declare module 'game/prototypes' {
    interface Creep {
        initialPos: RoomPosition
        role: Role
        flee(range: number): void
    }
}

if (!Creep.prototype.flee) {
    Creep.prototype.flee = function (range: number): void {
        const enemyCreeps = [...state.enemyAttackers, ...state.enemyHealers, ...state.enemyRangedAttackers]

        const enemiesInRange = enemyCreeps.filter(enemyCreep => getRange(enemyCreep, this) < range)

        const result = searchPath(
            this,
            enemiesInRange.map(i => ({ pos: i, range })),
            { flee: true },
        )
        if (result.path.length > 0) {
            const direction = getDirection(result.path[0].x - this.x, result.path[0].y - this.y)
            this.move(direction)
        }
    }
}

export const init = () => {
    console.log('merge.proto.ts.init()')
}
