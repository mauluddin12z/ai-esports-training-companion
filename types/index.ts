export interface Insight {
   id: string;
   mistake: string;
   advice: string;
   motivation: string;
}

export type Drill = {
   id: string;
   title: string;
   desc: string;
   time: string;
   category: "Mechanics" | "Game Sense" | "Decision Making";
};

export type DrillInput = {
   game: string;
   role: string;
   mistake: string;
   advice: string;
};
