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

class pokemon {
    constructor(name,type,hp,atk,def,speed,){
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.hpReal = hp;
        this.atk = atk;
        this.def = def;
        this.speed = speed;
        this.hpBar = 100;
    }
    attackFoe(foe,move){
        //Damage Formula
        console.log(`${this.name} attacked ${foe.name}`);
        let dmgFormula = Math.floor(([(2* 40 /5)+2]* move* this.atk/foe.def)/50 + 2);
        console.log(`Damage cause by this move : ${dmgFormula}`);

        //Update new HP to opponent pokemon
        foe.hpReal = foe.hpReal - dmgFormula;
        console.log(`HP remaining: ${foe.hpReal}/${foe.hp}`);

        //Update new hp Bar in percentage
        let percentDmg = Math.floor(dmgFormula * 100 / foe.hp);
        console.log(`${foe.name} lost ${percentDmg}% of its total health`);

        foe.hpBar = foe.hpBar - percentDmg;
        if(foe.hpBar>0){
            foe.hpBar=foe.hpBar;
        }else{
            foe.hpBar = 0;
        }

        newHpBar(foe);
        console.log('-----------------');
    }
}

const newHpBar = function(pkmn){
    let tempString = `${pkmn.hpBar}%`
    console.log(pkmn);

    if(pkmn.name == 'Voltorb'){
        foeHpBar.style.width = tempString;
    }else if(pkmn.name == 'Charizard'){
        playerHpBar.style.width = tempString;
    }else{
        console.log('hay un error ptm');
    }
}

const batalla = function(){
    voltorb.attackFoe(charizard,voltMove1);
    setTimeout(function() {charizard.attackFoe(voltorb, this.value)}.bind(this), 4000);
}



const charizard = new pokemon('Charizard','Fire',150,100,70,120);
const voltorb = new pokemon('Voltorb','Electric',105,60,57,140);


const fireBlast = document.getElementById("move1");
const flameThrower = document.getElementById("move2");
const dragonRage = document.getElementById("move3");
const hurricane = document.getElementById("move4");

const foeHpBar = document.getElementById("foe_lp");
const playerHpBar = document.getElementById("player_lp");

const voltMove1 = 50 ;
const voltMove2 = 70;
const voltMove3 = 80;
const voltMove4 = 100;


fireBlast.value= 120;
flameThrower.value = 95;
dragonRage.value = 60;
hurricane.value = 100;

fireBlast.addEventListener('click',batalla);
flameThrower.addEventListener('click',batalla);
dragonRage.addEventListener('click',batalla);
hurricane.addEventListener('click',batalla);



/*const checkSpeed = function(pkmn1,pkmn2){
    if(pkmn1.speed >pkmn2.speed){
        return pkmn1;
    }else{
        return pkmn2;
    }
}
*/