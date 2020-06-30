//Identity for Textile ThreadsDB
@nearBindgen
export class UserIdentity {
    identity: string; //libp2p string of key
    threadId: string;
}

@nearBindgen
export class UserRole {
    user: string;
    role: string;
}

@nearBindgen
export class UserRoleArray {
    roles: Array<UserRole>;
    len: i32;
}

@nearBindgen
export class UserRoleMetaData {
    rolelog: Array<string>;
}

// Jump Structures

@nearBindgen
export class MilitaryJumpMetaData {
    jumpLog: Array<string>;
}

@nearBindgen
export class MilitaryParachuteJump {
    jumper: string;
    jumpIdentifier: string;
    verificationHash: string;
}

@nearBindgen
export class MilitaryJumpArray {
    jumps: Array<MilitaryParachuteJump>;
    len: i32;
}

// Drop Zone Structures

@nearBindgen
export class DropZone {
    registrar: string;
    dzId: string;
    dzVerificationHash: string;
}

@nearBindgen
export class DropZoneArray {
    dropZones: Array<DropZone>;
    len: i32;
}

@nearBindgen
export class DropZoneMetaData {
    dropZoneRegister: Array<string>;
}
