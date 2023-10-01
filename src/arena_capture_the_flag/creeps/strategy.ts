import { BodyPart } from 'arena/prototypes'
import { bridge, roleMapper } from 'arena_capture_the_flag/constants/enums'
import { MOVE } from 'game/constants'
import { Creep } from 'game/prototypes'
import { getObjectsByPrototype, getRange } from 'game/utils'

export const findSuitablePart = (creep: Creep) => {
    return getObjectsByPrototype(BodyPart).filter(
        part => (roleMapper(part.type) === creep.role || part.type === MOVE) && getRange(part, bridge.upSide) <= 7,
    )
}
