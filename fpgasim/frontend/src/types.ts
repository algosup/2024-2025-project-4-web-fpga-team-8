export interface TimingDelay {
    min: number;
    typ: number;
    max: number;
  }
  
  export interface TimingCell {
    cell_type: string;
    instance: string;
    delays: Record<string, TimingDelay>;
    constraints: Record<string, TimingDelay>;
  }
  
  export interface ModuleTiming {
    design: string;
    timescale: string;
    cells: TimingCell[];
  }
  
  export interface FPGAModule {
    module: string;
    inputs: string[];
    outputs: string[];
    bel_type: string | null;
    timing?: ModuleTiming | null;
  }
  