import {
    context,
    storage,
    PersistentMap,
    logging,
    base64,
    math,
} from "near-sdk-as";
import { ParachuteJump, JumpMetaData, JumpArray } from "./model";

const JUMPER_IDENTIFIER: u32 = 8;

// Collections where we store data
// store all unique parachute jumps
let parachuteJumps = new PersistentMap<string, ParachuteJump>("jumps");
// store all parachute jumps of a jumper
let jumpsByJumper = new PersistentMap<string, JumpMetaData>("jumpsByJumper");

// **************************************************

// Methods for owner

export function ownerOfJump(tokenId: string): string {
    let jump = getJump(tokenId);
    let jumper = jump.jumper;
    return jumper;
}

export function getJumps(jumper: string): JumpArray{
  logging.log("get jumps");
  let _jumps = getJumpsByJumper(jumper)
  let _jumpList = new Array<ParachuteJump>();
  for (let i=0; i<_jumps.length; i++) {
    if (parachuteJumps.contains(_jumps[i])){
      let _jump = getJump(_jumps[i]);
      _jumpList.push(_jump);
    }
  }
  let jl = new JumpArray();
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

export function setJumpsByJumper(jump: ParachuteJump): void {
  let _jumpId = getJumpsByJumper(jump.jumper);
  if(_jumpId == null) {
    _jumpId = new Array<string>();
    _jumpId.push(jump.jumpIdentifier);
  } else {
    _jumpId.push(jump.jumpIdentifier);
  }
  let jo = new JumpMetaData();
  jo.jumpLog = _jumpId;
  jumpsByJumper.set(jump.jumper, jo);
}

// Methods for Jumps

export function getJump(tokenId: string): ParachuteJump {
  let jump = parachuteJumps.getSome(tokenId);
  return jump;
}

export function setJump(jump: ParachuteJump): void {
  parachuteJumps.set(jump.jumpIdentifier, jump);
}

export function getSender(): string {
    return context.sender;
}

function deleteJump(tokenId: string): void {
  parachuteJumps.delete(tokenId);
}

export function deleteJumpProfile(tokenId: string): JumpArray {
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
  let jo = new JumpMetaData();
  jo.jumpLog = _jumpId;
  jumpsByJumper.set(from, jo);
  deleteJump(tokenId);
}

// Create unique Jump

export function logJump(
  jumpName: string,
  jumpDate: string,
  dropAltitude: u16,
  freefall: u8,
): ParachuteJump {
  let jumpIdentifier = generateId();
  logging.log("logging jump");
  return _logJump(
    jumpName,
    jumpDate,
    jumpIdentifier,
    dropAltitude,
    freefall,
  );
}

  function _logJump(
    jumpName: string,
    jumpDate: string,
    jumpIdentifier: string,
    dropAltitude:u16,
    freefall: u8,
  ): ParachuteJump {
    logging.log("start logging jump");
    let jump = new ParachuteJump();
    jump.jumper = context.sender;
    jump.jumpName = jumpName;
    jump.jumpDate = jumpDate;
    jump.jumpIdentifier = jumpIdentifier;
    jump.dropAltitude = dropAltitude;
    jump.freefall = freefall;
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
  function _jumpDNEError(jump: ParachuteJump): boolean {
    return assert(jump == null, "This jump does not exist");
  }