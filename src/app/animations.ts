import { trigger, transition, animate, style } from "@angular/animations";
 
export let slide = trigger('slide', [
    transition('void => *', [
      style({ transform: 'translateX(-50%)' }),
      //not working
  ])
  ]);

export let fade = trigger('fade', [
    transition('void => *', [
      style({
        opacity: 0.3
      }),
      animate(800)
  ])
  ])