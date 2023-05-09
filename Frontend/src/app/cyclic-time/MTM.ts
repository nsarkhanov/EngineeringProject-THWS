import { Injectable } from "@angular/core";

Injectable({
  providedIn: 'root'
})


export interface MTMInterface {
    Grundvorgang: string;
    Gewicht: string;
    Fall_Aufnehmen: string;
    Fall_Platzieren: string;
    code: string;
    TMU_1: string;
    TMU_2: string;
    TMU_3: string;
  
  }

  const dataMTM: MTMInterface[] = [
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "easy", Fall_Platzieren: "approx", code: "AA", TMU_1: "20", TMU_2: "35", TMU_3: "50"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "easy", Fall_Platzieren: "loose", code: "AB", TMU_1: "30", TMU_2: "45", TMU_3: "60"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "easy", Fall_Platzieren: "tight", code: "AC", TMU_1: "40", TMU_2: "55", TMU_3: "70"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "difficult", Fall_Platzieren: "approx", code: "AD", TMU_1: "20", TMU_2: "45", TMU_3: "60"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "difficult", Fall_Platzieren: "loose", code: "AE", TMU_1: "30", TMU_2: "55", TMU_3: "70"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "difficult", Fall_Platzieren: "tight", code: "AF", TMU_1: "40", TMU_2: "65", TMU_3: "80"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg", Fall_Aufnehmen: "Hand voll", Fall_Platzieren: "approx", code: "AG", TMU_1: "40", TMU_2: "65", TMU_3: "80"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg bis <=8kg", Fall_Aufnehmen: "", Fall_Platzieren: "approx", code: "AH", TMU_1: "25", TMU_2: "45", TMU_3: "55"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: "<=1kg bis <=8kg", Fall_Aufnehmen: "", Fall_Platzieren: "loose", code: "AJ", TMU_1: "40", TMU_2: "65", TMU_3: "75"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: ">8kg bis <=22kg", Fall_Aufnehmen: "", Fall_Platzieren: "approx", code: "AL", TMU_1: "80", TMU_2: "105", TMU_3: "115"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: ">8kg bis <=22kg", Fall_Aufnehmen: "", Fall_Platzieren: "loose", code: "AM", TMU_1: "95", TMU_2: "120", TMU_3: "130"},
    {Grundvorgang: "Aufnehmen und Platzieren", Gewicht: ">8kg bis <=22kg", Fall_Aufnehmen: "", Fall_Platzieren: "tight", code: "AN", TMU_1: "120", TMU_2: "145", TMU_3: "160"},
    {Grundvorgang: "Platzieren", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "approx", code: "PA", TMU_1: "10", TMU_2: "20", TMU_3: "25"},
    {Grundvorgang: "Platzieren", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "loose", code: "PB", TMU_1: "20", TMU_2: "30", TMU_3: "35"},
    {Grundvorgang: "Platzieren", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "tight", code: "PC", TMU_1: "30", TMU_2: "40", TMU_3: "45"},
    {Grundvorgang: "Hilfsmittel handhaben", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "approx", code: "HA", TMU_1: "25", TMU_2: "45", TMU_3: "65"},
    {Grundvorgang: "Hilfsmittel handhaben", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "loose", code: "HB", TMU_1: "40", TMU_2: "60", TMU_3: "75"},
    {Grundvorgang: "Hilfsmittel handhaben", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "tight", code: "HC", TMU_1: "50", TMU_2: "70", TMU_3: "85"},
    {Grundvorgang: "Betätigen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "einfach", code: "BA", TMU_1: "10", TMU_2: "25", TMU_3: "40"},
    {Grundvorgang: "Betätigen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "zusammtightesetzt", code: "BB", TMU_1: "30", TMU_2: "45", TMU_3: "60"},
    {Grundvorgang: "Bewegungszyklen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "eine Bewegung", code: "ZA", TMU_1: "5", TMU_2: "15", TMU_3: "20"},
    {Grundvorgang: "Bewegungszyklen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "Bewegungsfolge", code: "ZB", TMU_1: "10", TMU_2: "30", TMU_3: "40"},
    {Grundvorgang: "Bewegungszyklen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "Umsetzen und eine Bewegung", code: "ZC", TMU_1: "30", TMU_2: "45", TMU_3: "55"},
    {Grundvorgang: "Bewegungszyklen", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "Festmachen und Lösen", code: "ZD", TMU_1: "20", TMU_2: "20", TMU_3: "20"},
    {Grundvorgang: "Körperbewegung", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "Gehen/m", code: "KA", TMU_1: "20", TMU_2: "20", TMU_3: "20"},
    {Grundvorgang: "Körperbewegung", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren:"Beugen, Bücken, Knien (inkl. Aufrichten)", code: "KB", TMU_1: "60", TMU_2: "60", TMU_3: "60"},
    {Grundvorgang: "Körperbewegung", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "Setzen und Aufstehen", code: "KC", TMU_1: "110", TMU_2: "110", TMU_3: "110"},
    {Grundvorgang: "Visuelle Kontrolle", Gewicht: "", Fall_Aufnehmen: "", Fall_Platzieren: "", code: "VA", TMU_1: "15", TMU_2: "15", TMU_3: "15"}
  ]



  export class MTM_Human{

    
    findTMU(distance: any, data:any)
    {
        if (distance ==1)
        {
            return data.TMU_1;
        }
        else if (distance == 2)
        {
            return data.TMU_2;
        }
        else if (distance ==3)
        {
            return data.TMU_3;
        }
    }
    
    findPosPicknPlace(distance:any, weigth:any, pick:any, place:any){
        for (var x of dataMTM)
        {
            if (x.Gewicht === weigth && x.Fall_Aufnehmen === pick) 
            {
                if (x.Fall_Platzieren==place)
                {
                    console.log(x.Fall_Platzieren)
                    return this.findTMU(distance, x); 
                }
            }
            
        }
    }

    picknplace(weight:any, pick:any, place:any, distance:any){
        if (weight <=1){
            return this.findPosPicknPlace(distance, "<=1kg", pick, place);   
        }
        else if (weight >1 && weight <=8)
        {
           return this.findPosPicknPlace(distance, "<=1kg bis <=8kg", pick, place);
        }
        else if (weight > 8 && weight <=22)
        {
           return this.findPosPicknPlace(distance, ">8kg bis <=22kg", pick, place);
        }
        return 0
    }




    findPosE(basic_process:any, place:any, distance:any)
    {
        for (var x of dataMTM)
        {
            if (x.Grundvorgang === basic_process && x.Fall_Platzieren === place) 
            {
                console.log(x.Fall_Platzieren)
                return this.findTMU(distance, x); 
            }
            
        }
    }

    /**
     * 
     * @param place 
     * @param distance 
     * @returns 
     */
    place(place:any, distance:any){
        
        this.findPosE("Platzieren", place, distance)
    }

    /**
     * 
     * @param place 
     * @param distance 
     * @returns 
     */
    tool(place:any, distance:any)
    {
        this.findPosE("Hilfsmittel handhaben", place, distance)
    }

    /**
     * 
     * @param place easy, difficult 
     * @param distance 
     * @returns 
     */
    use(place:any, distance:any)
    {
        this.findPosE("Betätigen", place, distance)
    }

    /**
     * 
     * @param place single, cycle, turnover, tightenloose
     * @param distance 
     * @returns 
     */
    move(place:any, distance:any)
    {
        this.findPosE("Bewegungszyklen", place, distance)
    }

    body(bodyvar:any, meters:any)
    {
        let returnvalue = 0
        switch(bodyvar)
        {
            case "walk": return returnvalue = 20*meters; 
            case "bend": return returnvalue = 60; 
            case "sit":  return returnvalue = 110; 
        }
        return returnvalue;
       
    }
}

