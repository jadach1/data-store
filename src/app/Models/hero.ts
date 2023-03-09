var counter: number = 0;

export class Hero {
    id: number = 0;
    name: string = "";
    height: string = "";
    origin: string = "";
    skills: Array<string> = [];
    constructor(Iname: string = "", Iheight: string = "", Iorigin: string = "", Iskills: string[] = [], id=0){
            this.name = Iname;
            this.height = Iheight;
            this.origin = Iorigin;
            this.skills = Iskills;
            counter += id;
            this.id = counter + id;
            console.log("creating hero " + counter)
    }
}