import { ATTACK, BodyPartConstant, HEAL, RANGED_ATTACK } from 'game/constants'

export enum Role {
    None = '',
    Attacker = 'attacker',
    RangedAttacker = 'ranged-attacker',
    Healer = 'healer',
}

export const roleMapper = (bodyPart: BodyPartConstant) => {
    switch (bodyPart) {
        case ATTACK:
            return Role.Attacker
        case RANGED_ATTACK:
            return Role.RangedAttacker
        case HEAL:
            return Role.Healer
        default:
            return Role.None
    }
}

export const bridge = {
    upSide: { x: 65, y: 34 },
    downSide: { x: 34, y: 65 },
}
