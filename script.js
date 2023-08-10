/*DAMAGE FORMULA

([(2*Level/5)+2]*Move BP* A/D)/50 + 2

example:

Charizard 
HP: 150
ATK : 120 
DEF : 70
SPE : 120

Voltorb
HP: 95
ATK : 60 
DEF : 57
SPE : 140

Charizard uso lanzallamas (95)
Damage Formula =([(2* 40 /5)+2]* 95* 120/57)/50 + 2
               = (18*95*2.1)/50 + 2
               = 73.82
*/

class Trainer {
    constructor(name, id, pokemon, badges){
        this.name = name;
        this.id = id;
        this.pokemon = pokemon;
        this.badges = badges; 
    }
}

class Pokemon {
    constructor(name,type1,type2,ability,hp,atk,def,speed,moveSet){
        //NEW CLASS ! SPECIES (Cambiar name por species )( TYPE :CHARIZARD , ABILITY : SOLARPOWER, BaseStat, MAXSTATS, Level)
        //NATURE (name, effect)
        //NAME
        //LEVEL
        //MoveSet
        //Movepool
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.ability = ability;
        this.hp = hp;
        this.hpReal = hp;
        this.atk = atk;
        this.def = def;
        this.speed = speed;
        this.hpBar = 100;
        this.moveSet = moveSet;
    }
    attackFoe(foe,move){
        //Damage Formula
        let dmgFormula = Math.floor(([(2* 50 /5)+2]* move.basePower* this.atk/foe.def)/50 + 2);
        let criticalHit = move.isCriticalHit();
        let superEffectiveDmg = move.isVeryEffective(foe);
        let notEffectiveDmg = move.isNotEffective(foe);
        let totalDmg = dmgFormula* criticalHit* superEffectiveDmg* notEffectiveDmg;

        foe.hpReal = foe.hpReal - totalDmg;

        textDisplay(this,move,totalDmg,foe);

        foe.hpBar = foe.hpBar - Math.floor(totalDmg * 100 / foe.hp);
        if(foe.hpBar>0){
            foe.hpBar=foe.hpBar;
        }else{
            foe.hpBar = 0;
        }

        newHpBar(foe);
        console.log('------------------');
         //Multiple Hits
    }

    faint(){};
    evolve(){};
    levelUp(){};
    gainExp(){};

}

class Type {
    constructor (name, superEffectiveDmg, notVeryEffectiveDmg, noDamage){
        this.name = name;
        this.superEffectiveDmg = superEffectiveDmg;
        this.notVeryEffectiveDmg = notVeryEffectiveDmg;
        this.noDamage = noDamage;
    }
}

class Move {
    constructor(name, basePower, accuracy, type, effect, category, pps ) {
        this.name = name;
        this.basePower = basePower;
        this.accuracy = accuracy;
        this.type = type;
        this.effect = effect;
        this.category = category;
        this.pps = pps;
    }

    isCriticalHit(){
        let randomNumb = Math.random()
        let threshold = 1/24;
        if (randomNumb <= threshold) {
            console.log('Critical hit landed!')
            return 1.5;
        }else{
            return 1;
        }
    };
    isVeryEffective(foe){
        let superEffective = 1;

        for (let x = 0; x < this.type.superEffectiveDmg.length;x++){
            if(this.type.superEffectiveDmg[x] == foe.type1.name || this.type.superEffectiveDmg[x] == foe.type2.name ){
                superEffective = superEffective * 2;
            } else{
                superEffective = superEffective * 1;
            }
        }
        return superEffective;
    }
    isNotEffective(foe){
        let notEffective = 1;

        for (let x = 0; x < this.type.notVeryEffectiveDmg.length;x++){
            if(this.type.notVeryEffectiveDmg[x] == foe.type1.name){
                notEffective = notEffective * 0.5;
            } else{
                notEffective = notEffective * 1;
            }
        }

        for (let x = 0; x < this.type.notVeryEffectiveDmg.length;x++){
            if(this.type.notVeryEffectiveDmg[x] == foe.type2.name){
                notEffective = notEffective * 0.5;
            } else{
                notEffective = notEffective * 1;
            }
        }
        return notEffective;
    };

    isMultipleHit(){};
    //missedAttack(){};
    stabMove(){};
    totalDmg(){}
}

const newHpBar = function(pkmn){
    let tempString = `${pkmn.hpBar}%`

    if(pkmn.name == 'Jolteon'){
        foeHpBar.style.width = tempString;
    }else if(pkmn.name == 'Charizard'){
        playerHpBar.style.width = tempString;
    }else{
        console.log('hay un error ptm');
    }
}

const textDisplay = function(attacker,move,dmg,defender){
    console.log(`${attacker.name} used ${move.name} on ${defender.name} `);
    battleText.textContent = `${attacker.name} used ${move.name} on ${defender.name} `;
    console.log(`Damage cause by this move : ${dmg}`);
    battleText1.textContent = `Damage cause by this move : ${dmg}`;
    console.log(`HP remaining: ${defender.hpReal}/${defender.hp}`);
    battleText2.textContent = `HP remaining: ${defender.hpReal}/${defender.hp}`;
    console.log(`${defender.name} lost ${Math.floor(dmg * 100 / defender.hp)}% of its total health`);
    battleText3.textContent = `${defender.name} lost ${Math.floor(dmg * 100 / defender.hp)}% of its total health`;
}

const playerTurn = function(playerPkmn, cpuPkmn){
    const moveId = this.id.slice(4);
    playerPkmn.attackFoe(cpuPkmn,playerPkmn.moveSet[moveId]);
}

//const cpuTurn = function(cpuPkmn){}

const activeBattle = function(){
    moveBox.style.display = 'none';
    scriptBox.style.display = 'block';
}

const inactiveBattle = function(){
    moveBox.style.display = 'flex';
    scriptBox.style.display = 'none';
}

const battle = function(){
    
    activeBattle();
    // EVALUAR SI UNO DE ELLOS YA NO PUEDE CONTINUAR
    const randomMoveId = Math.floor(Math.random() * 4);
    const randomMove = jolteon.moveSet[randomMoveId];

    setTimeout(jolteon.attackFoe(charizard, randomMove),2000);
    setTimeout(playerTurn.bind(this, charizard, jolteon),4000);

    setTimeout(inactiveBattle, 7000);
}

/*TRAINER LIST

TROPIUS = new Pokemon('Charizard','Fire','ninguna',150,100,70,120);
DONPHAN( Earthquake, rock tomb, rollout, take down)
LUCARIO ( aura sphear, close combat, meteor mash, bone rush)
GRENINJA ( water shuriken, double team, ice beam, night slash)
UMBREON ( moonlight, snarl, foul play, faint attack )
SNORLAX ( belly drum, body slam, rest, fire punch)
SALAMENCE (dragon claw, earthquake, rock slide, aerial ace)
GARDEVOIR (moonblast, pychic, hypnosis, dream eater )
JOLTEON (thunderbolt, volt switch, pin misile, double kick )
DECIDUEYE (spirit shackle, leaf storm, shadow sneak, brave bird)
HERACROSS (megahorn, brick break, rock tomb, night slash)
SERPERIOR (leaf blade, giga drain, coil, dragon pulse)
EXCADRILL (sword dance, metal claw, earthquake, rock slide)
TOXAPEX (baneful bunker, venonshock, pin misile, liquidation)
QUAQUAVAL (Aqua step, bulk up, close combat, acrobatics)
ELECTIVIRE ( meditate, thunderpunch, cross chop, ice punch)
weabile (sword dance, ice spinner, ice shard, night slash)
typlosion Hisuian (Infernal parade, willowisp, Flamethrower, shadow ball)

*/
//TYPING LIST
//class Type (name, superEffectiveDmg, notVeryEffectiveDmg, noDamage){
const typeList = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
const normal = new Type ([typeList[0]],[],[typeList[12],typeList[16]], [typeList[13]]);
const fire = new Type([typeList[1]], [typeList[4],typeList[5],typeList[11],typeList[16]], [typeList[1], typeList[2], typeList[12], typeList[14]],[]);
const water = new Type([typeList[2]],[typeList[1], typeList[8], typeList[12]],[typeList[2],typeList[4],typeList[14]], []);
const electric = new Type([typeList[3]],[typeList[2], typeList[9]],[typeList[3],typeList[4],typeList[14]], [typeList[8]]);
const grass = new Type([typeList[4]],[typeList[2], typeList[8], typeList[12]],[typeList[1],typeList[4],typeList[7],typeList[9],typeList[11],typeList[14],typeList[16]], []);
const ice = new Type([typeList[5]],[typeList[4], typeList[8],typeList[9], typeList[14]],[typeList[1],typeList[2],typeList[5],typeList[16]], []);
const fighting = new Type([typeList[6]],[typeList[0], typeList[5], typeList[12], typeList[15], typeList[16]],[typeList[7],typeList[9],typeList[10],typeList[11], typeList[17]], [typeList[13]]);
const poison = new Type([typeList[7]],[typeList[4], typeList[17]],[typeList[7],typeList[8],typeList[12],typeList[13]], [typeList[16]]);
const ground = new Type([typeList[8]],[typeList[1], typeList[3], typeList[7],typeList[12],typeList[16]],[typeList[4],typeList[11]], [typeList[9]]);
const flying = new Type([typeList[9]],[typeList[4], typeList[6], typeList[11]],[typeList[3],typeList[12],typeList[16]], []);
const psychic = new Type([typeList[10]],[typeList[6], typeList[7]],[typeList[10],typeList[16]], [typeList[15]]);
const bug = new Type([typeList[11]],[typeList[4], typeList[10], typeList[15]],[typeList[1],typeList[6],typeList[7], typeList[9], typeList[13],typeList[16],typeList[17]], []);
const rock = new Type([typeList[12]],[typeList[1], typeList[5], typeList[9],typeList[11]],[typeList[6],typeList[8],typeList[16]], []);
const ghost = new Type([typeList[13]],[typeList[10],typeList[13]],[typeList[15]], [typeList[0]]);
const dragon = new Type([typeList[14]],[typeList[14]],[typeList[16]],[typeList[17]]);
const dark = new Type([typeList[15]],[typeList[10],typeList[13]],[typeList[6],typeList[15],typeList[17]], []);
const steel = new Type([typeList[16]],[typeList[5], typeList[12], typeList[17]],[typeList[1],typeList[2],typeList[3],typeList[16]], []);
const fairy = new Type([typeList[17]],[typeList[6], typeList[14], typeList[15]],[typeList[1],typeList[7],typeList[16]], []);
const emptyType = new Type ([],[],[],[]);

//MOVE LIST
//class Move  (name, basePower, accuracy, type, effect, category, pps) {
const thunderBolt = new Move('Thunderbolt', 90, 100, electric, undefined, undefined, 15);
const voltSwitch = new Move('Volt Switch', 70, 100, electric, undefined, undefined, 20);
const pinMissile = new Move('Pin Missile', 25, 95, bug, undefined, undefined, 20);
const doubleKick = new Move('Double Kick', 30, 100, fighting, undefined, undefined, 20);

const dragonPulse = new Move('Dragon Pulse', 90, 100, dragon, undefined, undefined, 10);
const fireBlast = new Move('Fire Blast', 110, 85, fire, undefined, undefined, 8);
const hurricane = new Move('Hurricane', 110, 70, flying, undefined, undefined, 8);
const flameThrower = new Move('Flamethrower', 90, 100, fire, undefined, undefined, 10);

const solarBeam = new Move('Solar Beam', 120, 100, grass, undefined, undefined, 10);
const sunnyDay = new Move('Sunny Day', 0, 100, fire, undefined, undefined, 8);
const synthesis = new Move('Synthesis', 0, 100, grass, undefined, undefined, 8);
const airSlash = new Move('Air Slash', 75, 95, flying, undefined, undefined, 15);

const earthQuake = new Move('Earthquake', 100, 100, ground, undefined, undefined, 10);
const rockTomb = new Move('Rock Tomb', 60, 100, rock, undefined, undefined, 10);
const rollOut = new Move('Rollout', 30, 100, rock, undefined, undefined, 15);
const bodySlam = new Move('Body Slam', 85, 100, normal, undefined, undefined, 15);

//POKEMON LIST
// Class Pokemon (name,type1,type2,ability,hp,atk,def,speed,moveSet)
const charizard = new Pokemon('Charizard',fire,flying,undefined,185,136,130,152,[dragonPulse,fireBlast,hurricane,flameThrower]);
const jolteon = new Pokemon('Jolteon',electric,emptyType,undefined,172,117,112,182,[thunderBolt,voltSwitch,pinMissile,doubleKick]);
//DONPHAN
//Tropius
//Jolteon

let playerPkmnStats = [0,0,0,0];
let cpuPkmnStats = [0,0,0,0];

const playerMove1 = document.getElementById("move0");
const playerMove2 = document.getElementById("move1");
const playerMove3 = document.getElementById("move2");
const playerMove4 = document.getElementById("move3");

const foeHpBar = document.getElementById("foe_lp");
const playerHpBar = document.getElementById("player_lp");

const moveBox = document.getElementById('moves_box');
const scriptBox = document.getElementById('script_box');

const battleText = document.getElementById('text_battle');
const battleText1 = document.getElementById('text_battle1');
const battleText2 = document.getElementById('text_battle2');
const battleText3 = document.getElementById('text_battle3');

playerMove1.addEventListener('click',battle);
playerMove2.addEventListener('click',battle);
playerMove3.addEventListener('click',battle);
playerMove4.addEventListener('click',battle);

doubleKick.isNotEffective(charizard);