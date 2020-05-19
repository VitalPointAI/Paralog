![alt text](https://github.com/ALuhning/Paralog/blob/master/src/assets/ParaLog-logo.png "PARALOG Logo")
---------

## Parachuting meets blockchain.  Provable, immutable, shareable.
### Demo:  [PARALOG](https://hungry-euler-2a0e33.netlify.app/)

### PROBLEM PARALOG SOLVES

Paralog endeavours to modernize several aspects of parachute records, tracking, instruction/coaching and drop zone operations.  This initial version's working demo addresses a portion of the first feature: jump logs.  The other features are still to come and a roadmap is being prepared.

It's estimated that there are approximately 100,000+ civilian skydivers globally.  That number increases if including military parachutists.  All of them rely on their jump record to track how many times they've jumped, where, under what conditions including altitude, drop zone, actions performed in the air, equipment used, aircraft used, how landing was, and so on.  It is all information that is critically important for their development in the sport or profession.

That jump record is currently typically analog - a log book - that is filled out after each jump and it is the jumper's responsibility to protect it.  The skydiver will then have the jumpmaster or instructor sign it indicating the parachutist completed the jump as logged.  

In a sport/profession where currency and safety are paramount, the parachutist's jump record is vital information.  If destroyed, damaged, tampered with or falsified it would be incredibly difficult to replace and could potentially lead to catastrophic consequences.  Further it is required to prove:

-currency as a parachutist must jump every 60-90 days in order to remain current/not have to conduct refresher training; and
-proficiency as proof of skill is required to progress and obtain higher certificates/licenses

By logging jumps to a blockchain (NEAR) - we remove a good deal of risk associated with current practices. Further we standardize log entries and information making it easier to conduct data analysis and improve the legitimacy of injury, malfunction and related investigations resulting from parachuting incidents.

### Technicality of Implementation

Coming to the hackathon late and never having used/heard of NEAR before, I quickly read all I could, asked questions in the chat, and ultimately used the Corgi repository as a starting point to learn how NEAR works and reach the current state of the Dapp.  Technical details include:
1. React frontend with several components
2. UI/UX designed using react-bootstrap, react-icons
3. Used near-api-js, near-sdk-as  (may delve into Rust in the future)
4. Relied heavily on near-shell initially to figure out what was happening with accounts/contracts
5. Currently one main contract (paralog.vitalpoint.testnet) and one model file.  Will undoubtedly be expanding to encompass additional features described above.
6. Treats each jump entry as a NFT that gets logged, then can be shared via Twitter/Facebook.  Currently the log entry is collecting basic data but will expand to include several other aspects related to the jump. (for example, automatic drop zone map when location entered, type of jump, etc...)

### Next Steps

Jump entries need to be attested to by a licensed skydiver/instructor.  The Dapp is going to address that by giving the parachutist the ability to request attestation by the instructor or licensed skydiver who watched their jump.  That instructor or coach will sign the entry using their account (signing transaction) indicating it is a verified jump.

This opens the door to providing a mechanism for novice skydivers to find/hire instructors and coaches - I see a jump economy emerging from use of the Dapp where people could pay instructors/coaches in NEAR tokens and/or use NEAR tokens as jump manifest tickets allowing better tracking and convenience.

With the fast/cheap transactions I've experienced with the NEAR blockchain - see massive potential for this Dapp and related types of Dapps and am excited to continue developing with it.
