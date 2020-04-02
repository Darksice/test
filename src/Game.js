
import React from "react";
import Board from "./Board";
import Container from "./Container";

export default class Game extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tabBateau: Array(2).fill(null),
            tabPlateau:Array(100).fill(null),
            position: "vertical",
        }
    }

    // fonction quel bateau pour handle click V
    //une fonction suivant le bateau combien de cases

    whichBoat(i){
        let position=-1;
        for(let cpt=0;cpt<2;cpt++){
            if(this.state.tabBateau[cpt] === 1){
                position = cpt
            }
        }
        console.log("position = " + position);
        return position;
    }

    caseNumber(i){
        if(i===0)
            return 5;
        if(i===1)
            return 4;
    }

    isBoatFit(i,caseNumber){
        console.log("i = " + i);
        let casePressee = i;
        //si le bateau est placee verticalement
        if(this.state.position === "vertical"){
            //si le bateau rentre verticalement sans parle de voisin ou de superpsition
            if((caseNumber-1)*10+i<100){
              //si il n'est sur la premiere ligne
              if(casePressee > 9){
                 //on check si un bateau est au dessus
                if(this.state.tabPlateau[casePressee-10] === 'X')
                    return false;
              }
             //on regrde pour chaque case du bateau
             for(let cpt=0;cpt<caseNumber;cpt++){
                 //Si un bateau est deja sur la meme case ce n'est pas possible
                 if(this.state.tabPlateau[casePressee]==='X') {
                     return false;
                 }
                 //Si le bateau n'est pas sur un bord cote gauche il faut check si il n'est pas a cote d'un autre
                 if(casePressee !== 0 && casePressee !== 10 && casePressee !== 20 && casePressee !== 30 && casePressee !== 40 && casePressee !== 50 && casePressee !== 60 && casePressee !== 70 && casePressee !== 80 && casePressee !== 90)
                 {
                    if(this.state.tabPlateau[casePressee-1]==='X') {
                        console.log("je bloque a cause de gauche");
                        return false;
                    }
                 }
                 //Pareil pour le cote droit
                 if(casePressee !== 9 && casePressee !== 19 && casePressee !== 29 && casePressee !== 39 && casePressee !== 49 && casePressee !== 59 && casePressee !== 69 && casePressee !== 79 && casePressee !== 89 && casePressee !== 99)
                 {
                     if(this.state.tabPlateau[casePressee+1]==='X')
                         return false;
                 }

                 //il faut actualiser casePresse pour chec celle d'apres
                 casePressee += 10;
             }
            }
            else{
                return false;
            }
        }
        return true;
    }

    handleClickPlateau(i){
        console.log(i);


        if(this.whichBoat(i) !== -1){
            let caseNumber = this.caseNumber(this.whichBoat(i));
            if(this.isBoatFit(i,caseNumber)) {
                console.log("bateau deja clique est true");
                const tabPlateauSlice = this.state.tabPlateau.slice();
                for(let k=0;k<caseNumber;k++) {
                    tabPlateauSlice[k*10+i] = 'X';
                }
                this.setState({tabPlateau: tabPlateauSlice})
            }
        }
        else{
            console.log("bateau deja clique est false");
        }
    }

    handleClickBateau(i){
       /* if(i===0)
            return (console.log("je suis le bateau du haut"));
        if(i===1)
            return (console.log("je suis le bateau du bas")); */
         console.log(i);
        const tabBateauSlice = this.state.tabBateau.slice();
       for(let cpt=0;cpt<2;cpt++){
           tabBateauSlice[cpt] = 0;
       }
       tabBateauSlice[i] = 1;

       this.setState({tabBateau:tabBateauSlice})
    }

    handleClickPosition(i){
        if(i==="vertical"){
            this.setState({position : "vertical"})
        }
        if(i==="horizontal"){
            this.setState({position : "horizontal"})
        }

    }

    render() {
        return(
            <div className="all">
                <div className="Game_Board">
                    <Board
                        onClick = {(i) => this.handleClickPlateau(i)}
                        tabPlateau = {this.state.tabPlateau}
                    />
                </div>
                <div className="Game_Container">
                    <Container
                        onClick = {(i) => this.handleClickBateau(i)}
                        position = {(i) => this.handleClickPosition(i)}
                    />
                </div>
            </div>
        );
    }
}