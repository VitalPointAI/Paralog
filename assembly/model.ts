//Identity for Textile ThreadsDB
@nearBindgen
export class UserIdentity {
    identity: string; //libp2p string of key
    threadId: string;
}

// Jump Structures
@nearBindgen
export class MilitaryJumpMetaData {
    jumpLog: Array<string>;
}

@nearBindgen
export class MilitaryJumpPhotos {
    photos: Array<string>;
}

@nearBindgen
export class MilitaryJumpVideos {
    videos: Array<string>;
}

@nearBindgen
export class MilitaryParachuteJump {
    //Tombstone Jump Data
    jumpIdentifier: string; //unique string used to identify the jump
    jumper: string; //jumper account (owner)
    jumpName: string; //for elimination - not required
    jumpDate: string;
    dropZone: string;
    //Jump Data (Applicable to both Static-Line and Freefall)
    dropAltitude: u16;
    aircraftType: string; //CH147, CH146, CC130, C17, (military and civilian models)
    jumpType: string; //static-line or freefall
    milExitType: string; //double-door, single-door, ramp

    //Static-Line Jump Data


    //Static-Line Equipment
    milMainCanopyType: string; //CT1, CT2, CT6
    milMainCanopySN: string; //main canopy serial number
    milResCanopyType: string; //CR1
    milResCanopySN: string //reserve canopy serial number

    //Freefall Jump Data
    pullAltitude: u16; //only show if freefall jump
    freefall: u8; // duration in freefall in seconds

    //Freefall Equipment
    milFFCanopyType: string;
    milFFCanopySN: string;
    milFFResCanopyType: string;
    milFFResCanopySN: string;

    photos: MilitaryJumpPhotos;
    videos: MilitaryJumpVideos;
   
}

@nearBindgen
export class MilitaryJumpArray {
    jumps: Array<MilitaryParachuteJump>;
    len: i32;
}