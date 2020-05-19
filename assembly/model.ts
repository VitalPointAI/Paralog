@nearBindgen
export class JumpMetaData {
    jumpLog: Array<string>;
}

@nearBindgen
export class ParachuteJump {
    jumper: string;
    jumpName: string;
    jumpDate: string;
    jumpIdentifier: string;
    dropAltitude: u16;
    freefall: u8;
}

@nearBindgen
export class JumpArray {
    jumps: Array<ParachuteJump>;
    len: i32;
}