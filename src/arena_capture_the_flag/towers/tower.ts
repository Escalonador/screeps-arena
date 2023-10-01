import { state } from 'arena_capture_the_flag/constants/state'
import { TOWER_RANGE } from 'game/constants'

export const computeTower = () => {
    state.towers.forEach(tower => {
        const target = tower.findClosestByRange(state.enemyCreeps)
        if (target && tower.getRangeTo(target) <= TOWER_RANGE) {
            tower.attack(target)
        }
    })
}
