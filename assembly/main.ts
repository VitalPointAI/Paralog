import {
    context,
    storage,
    PersistentMap,
    PersistentVector,
    logging,
    base64,
    math,
} from "near-sdk-as";
import {  MilitaryParachuteJump, MilitaryJumpMetaData, MilitaryJumpArray, 
          DropZone, DropZoneArray, DropZoneMetaData, 
          UserIdentity, UserRole, UserRoleMetaData } from "./model";

const JUMPER_IDENTIFIER: u32 = 8;
const REGISTRAR_IDENTIFIER: u32 = 8;

// Collections where we store data

// JUMPS
// store all unique parachute jumps
let parachuteJumps = new PersistentMap<string, MilitaryParachuteJump>("jumps");
// store all parachute jumps of a jumper
let jumpsByJumper = new PersistentMap<string, MilitaryJumpMetaData>("jumpsByJumper");

// DROP ZONES
// store all unique drop zones
let dropZones = new PersistentMap<string, DropZone>("dropzone");
// store all drop zones of a registrar
let dropZonesByRegistrar = new PersistentMap<string, DropZoneMetaData>("dropZonesByRegistrar");

// store user identity
let userIdentity = new PersistentMap<string, UserIdentity>("userIdentity");
let userRoleList = new PersistentVector<UserRoleMetaData>("role");
let userRoles = new PersistentMap<string, UserRoleMetaData>("userRoles");
let users = new PersistentVector<string>("users")

//enum UserRoleTypes { jumper, coach, dzoperator, association }

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

export function getUserRoles(user: string): Array<string> {
  let roleId = userRoles.get(user);
  if(!roleId) {
    return new Array<string>();
  }
  let role = roleId.rolelog;
  return role;
}

export function getAllUserRoles(): Array<UserRoleMetaData> {
  let users = new Array<UserRoleMetaData>();
  logging.log(users);
  for (let i: i32 = 0; i < userRoleList.length; i++) {
    users.push(userRoleList[i]);
  }
  return users;
}

export function setUserRoles(role: UserRole): void {
  let _userId = getUserRoles(role.user);
  logging.log(_userId);
  if(_userId == null) {
    _userId = new Array<string>();
    _userId.push(role.role);
  }
  let jo = new UserRoleMetaData();
  jo.rolelog = _userId;
  userRoles.set(role.user, jo);
}

export function addMember(user: string): void {
  let present = false;
  for(let i: i32 = 0; i < users.length; i++) {
    if (users[i] == user) {
      present = true;
    }
  }
  if (!present) {
    users.push(user);
  }
}

export function listMembers(): Array<string> {
  let members = new Array<string>();
for (let i: i32 = 0; i<users.length; i++) {
  members.push(users[i]);
}
  return members;
}

export function changeUserRole(user: string, role: string): void {
  if(context.sender == 'aaron.testnet') {
    logging.log('deleting old user')
    userRoles.delete(user)
    logging.log('registering new user/role')
    _registerUserRole(user, role);
  } else {
    logging.log("unauthorized function call");
  }
}

// Log user roles

export function registerUserRole(
  user: string,
  role: string
  ): UserRole {
  logging.log("registering user role");
  return _registerUserRole(
    user,
    role
  );
  }
  
  function _registerUserRole(
    user: string,
    role: string
  ): UserRole {
    logging.log("start registering user role");
    let userRole = new UserRole();
    userRole.user = user;
    userRole.role = role;
    setUserRoles(userRole);
    logging.log("registered new user role");
    return userRole;
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
  jumpIdentifier: string,
  verificationHash: string
): MilitaryParachuteJump {
  logging.log("logging jump");
  return _logMilitaryJump(
    jumpIdentifier,
    verificationHash
  );
}

  function _logMilitaryJump(
    jumpIdentifier: string,
    verificationHash: string
  ): MilitaryParachuteJump {
    logging.log("start logging jump");
    let jump = new MilitaryParachuteJump();
    jump.jumper = context.sender;
    jump.jumpIdentifier = jumpIdentifier;
    jump.verificationHash = verificationHash;
    setJump(jump);
    setJumpsByJumper(jump);
    logging.log("logged new jump");
    return jump;
  }
  
  // Methods for Drop Zone Registrars

export function registrarOfDropZone(tokenId: string): string {
  let dz = getDropZone(tokenId);
  let registrar = dz.registrar;
  return registrar;
}

export function getDropZones(registrar: string): DropZoneArray{
logging.log("get drop zones");
let _dropZones = getDropZonesByRegistrar(registrar)
let _dropZoneList = new Array<DropZone>();
for (let i=0; i<_dropZones.length; i++) {
  if (dropZones.contains(_dropZones[i])){
    let _dropZone = getDropZone(_dropZones[i]);
    _dropZoneList.push(_dropZone);
  }
}
let dzl = new DropZoneArray();
dzl.dropZones = _dropZoneList;
dzl.len = _dropZoneList.length;
return dzl;
}

export function getDropZonesByRegistrar(registrar: string): Array<string> {
let dzId = dropZonesByRegistrar.get(registrar);
if(!dzId) {
  return new Array<string>();
}
let id = dzId.dropZoneRegister;
return id;
}

export function setDropZonesByRegistrar(dropZone: DropZone): void {
let _dzId = getDropZonesByRegistrar(dropZone.registrar);
if(_dzId == null) {
  _dzId = new Array<string>();
  _dzId.push(dropZone.dzId);
} else {
  _dzId.push(dropZone.dzId);
}
let jo = new DropZoneMetaData();
jo.dropZoneRegister = _dzId;
dropZonesByRegistrar.set(dropZone.registrar, jo);
}

// Methods for Drop Zones

export function getDropZone(tokenId: string): DropZone {
  let dropZone = dropZones.getSome(tokenId);
  return dropZone;
}

export function setDropZone(dropZone: DropZone): void {
  dropZones.set(dropZone.dzId, dropZone);
}

export function getRegistrar(): string {
  return context.sender;
}

function deleteDropZone(tokenId: string): void {
  dropZones.delete(tokenId);
}

export function deleteDropZonesProfile(tokenId: string): DropZoneArray {
let dropZone = getDropZone(tokenId);
decrementRegistrarDropZones(dropZone.registrar, tokenId);
let leftDropZones = getDropZones(dropZone.registrar);
logging.log("after dz delete");
return leftDropZones;
}

function decrementRegistrarDropZones(from: string, tokenId: string): void {
let _dzId = getDropZonesByRegistrar(from);
for (let i=0; i<_dzId.length; i++) {
  if (tokenId == _dzId[i]) {
    _dzId.splice(i, 1);
    logging.log("match");
    break;
  }
}
let jo = new DropZoneMetaData();
jo.dropZoneRegister = _dzId;
dropZonesByRegistrar.set(from, jo);
deleteDropZone(tokenId);
}

// Create unique Drop Zone

export function registerDropZone(
dzId: string,
dzVerificationHash: string
): DropZone {
logging.log("registering drop zone");
return _registerDropZone(
  dzId,
  dzVerificationHash
);
}

function _registerDropZone(
  dzId: string,
  dzVerificationHash: string
): DropZone {
  logging.log("start registering drop zone");
  let dropZone = new DropZone();
  dropZone.registrar = context.sender;
  dropZone.dzId = dzId;
  dropZone.dzVerificationHash = dzVerificationHash;
  setDropZone(dropZone);
  setDropZonesByRegistrar(dropZone);
  logging.log("registered new drop zone");
  return dropZone;
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

function _dropZoneDNEError(dropZone: DropZone): boolean {
    return assert(dropZone == null, "This drop zone does not exist");
}