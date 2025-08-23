declare module "locomotive-scroll" {
  interface LocomotiveScrollOptions {
    el: HTMLElement | null;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    [key: string]: any;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    on(event: string, func: (...args: any[]) => void): void;
    off(event: string, func: (...args: any[]) => void): void;
    scrollTo(target: HTMLElement | string | number, options?: any): void;
  }
}
