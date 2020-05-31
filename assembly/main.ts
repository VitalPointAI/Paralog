import {
    context,
    storage,
    PersistentMap,
    logging,
    base64,
    math,
} from "near-sdk-as";
import { MilitaryParachuteJump, MilitaryJumpMetaData, MilitaryJumpArray, MilitaryJumpPhotos, MilitaryJumpVideos, UserIdentity } from "./model";

const JUMPER_IDENTIFIER: u32 = 8;

// Collections where we store data
// store all unique parachute jumps
let parachuteJumps = new PersistentMap<string, MilitaryParachuteJump>("jumps");
// store all parachute jumps of a jumper
let jumpsByJumper = new PersistentMap<string, MilitaryJumpMetaData>("jumpsByJumper");
// store all photo QID hashes of a jump
let jumpPhotos = new PersistentMap<string, MilitaryJumpPhotos>("jumpPhotos");
// store all video QID hashes of a jump
let jumpVideos = new PersistentMap<string, MilitaryJumpVideos>("jumpVideos");
// store user identity
let userIdentity = new PersistentMap<string, UserIdentity>("userIdentity");

// **************************************************

// Methods for owner

export function ownerOfJump(tokenId: string): string {
    let jump = getJump(tokenId);
    let jumper = jump.jumper;
    return jumper;
}

export function getJumps(jumper: string): MilitaryJumpArray{
  logging.log("get jumps");
  let _jumps = getJumpsByJumper(jumper)
  let _jumpList = new Array<MilitaryParachuteJump>();
  for (let i=0; i<_jumps.length; i++) {
    if (parachuteJumps.contains(_jumps[i])){
      let _jump = getJump(_jumps[i]);
      _jumpList.push(_jump);
    }
  }
  let jl = new MilitaryJumpArray();
  jl.jumps = _jumpList;
  jl.len = _jumpList.length;
  return jl;
}

export function getJumpsByJumper(jumper: string): Array<string> {
  let jumpId = jumpsByJumper.get(jumper);
  if(!jumpId) {
    return new Array<string>();
  }
  let id = jumpId.jumpLog;
  return id;
}

export function setJumpsByJumper(jump: MilitaryParachuteJump): void {
  let _jumpId = getJumpsByJumper(jump.jumper);
  if(_jumpId == null) {
    _jumpId = new Array<string>();
    _jumpId.push(jump.jumpIdentifier);
  } else {
    _jumpId.push(jump.jumpIdentifier);
  }
  let jo = new MilitaryJumpMetaData();
  jo.jumpLog = _jumpId;
  jumpsByJumper.set(jump.jumper, jo);
}

// Create new identity for threadsDB
export function setIdentity(threadId: string, threadIdarray: string): void {
  let newId = new UserIdentity();
  newId.identity = threadId;
  newId.threadId = threadIdarray;
  userIdentity.set(context.sender, newId);
}

export function getIdentity(threadId: string): UserIdentity {
  let identity = userIdentity.getSome(threadId);
  return identity;
}

// Methods for Jumps

export function getJump(tokenId: string): MilitaryParachuteJump {
  let jump = parachuteJumps.getSome(tokenId);
  return jump;
}

export function setJump(jump: MilitaryParachuteJump): void {
  parachuteJumps.set(jump.jumpIdentifier, jump);
}

export function getSender(): string {
    return context.sender;
}

function deleteJump(tokenId: string): void {
  parachuteJumps.delete(tokenId);
}

export function deleteJumpProfile(tokenId: string): MilitaryJumpArray {
  let jump = getJump(tokenId);
  decrementJumperJumps(jump.jumper, tokenId);
  let leftJumps = getJumps(jump.jumper);
  logging.log("after delete");
  return leftJumps;
}

function decrementJumperJumps(from: string, tokenId: string): void {
  let _jumpId = getJumpsByJumper(from);
  for (let i=0; i<_jumpId.length; i++) {
    if (tokenId == _jumpId[i]) {
      _jumpId.splice(i, 1);
      logging.log("match");
      break;
    }
  }
  let jo = new MilitaryJumpMetaData();
  jo.jumpLog = _jumpId;
  jumpsByJumper.set(from, jo);
  deleteJump(tokenId);
}

// Create unique Jump

export function logMilitaryJump(
  jumpName: string,
  jumpDate: string,
  dropZone: string,
  dropAltitude: u16,
  aircraftType: string,
  jumpType: string,
  milExitType: string,
  milMainCanopyType: string,
  milMainCanopySN: string,
  milResCanopyType: string,
  milResCanopySN: string,
  pullAltitude: u16,
  freefall: u8,
  milFFCanopyType: string,
  milFFCanopySN: string,
  milFFResCanopyType: string,
  milFFResCanopySN: string,
): MilitaryParachuteJump {
  let jumpIdentifier = generateId();
  logging.log("logging jump");
  return _logMilitaryJump(
    jumpName,
    jumpDate,
    dropZone,
    jumpIdentifier,
    dropAltitude,
    aircraftType,
    jumpType,
    freefall,
    milExitType,
    milMainCanopyType,
    milMainCanopySN,
    milResCanopyType,
    pullAltitude,
    milFFCanopyType,
    milFFCanopySN,
    milFFResCanopyType,
    milFFResCanopySN
  );
}

  function _logMilitaryJump(
    jumpName: string,
    jumpDate: string,
    dropZone: string,
    jumpIdentifier: string,
    dropAltitude:u16,
    aircraftType: string,
    jumpType: string,
    freefall: u8,
    milExitType: string,
    milMainCanopyType: string,
    milMainCanopySN: string,
    milResCanopyType: string,
    pullAltitude: u16,
    milFFCanopyType: string,
    milFFCanopySN: string,
    milFFResCanopyType: string,
    milFFResCanopySN: string
  ): MilitaryParachuteJump {
    logging.log("start logging jump");
    let jump = new MilitaryParachuteJump();
    jump.jumper = context.sender;
    jump.jumpName = jumpName;
    jump.jumpDate = jumpDate;
    jump.jumpIdentifier = jumpIdentifier;
    jump.dropAltitude = dropAltitude;
    jump.aircraftType = aircraftType;
    jump.jumpType = jumpType;
    jump.freefall = freefall;
    jump.milExitType = milExitType;
    jump.milMainCanopyType = milMainCanopyType;
    jump.milMainCanopySN = milMainCanopySN;
    jump.milResCanopyType = milResCanopyType;
    jump.pullAltitude = pullAltitude;
    jump.milFFCanopyType = milFFCanopyType;
    jump.milFFCanopySN = milFFCanopySN;
    jump.milFFResCanopyType = milFFResCanopyType;
    jump.milFFResCanopySN = milFFResCanopySN;
    setJump(jump);
    setJumpsByJumper(jump);
    logging.log("logged new jump");
    return jump;
  }

  function generateId(): string {
    let buf = math.randomBuffer(JUMPER_IDENTIFIER);
    let b64 = base64.encode(buf);
    return b64;
  }
  
  function randomNum(): u32 {
    let buf = math.randomBuffer(4);
    return (
      (((0xff & buf[0]) << 24) |
        ((0xff & buf[1]) << 16) |
        ((0xff & buf[2]) << 8) |
        ((0xff & buf[3]) << 0)) %
      100
    );
  }

  //ERROR handling
  function _jumpDNEError(jump: MilitaryParachuteJump): boolean {
    return assert(jump == null, "This jump does not exist");
  }