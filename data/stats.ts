// data/stats.ts
// Numbers section. Set `value` to a real number to turn on the count-up animation.
// While `value` is null, the placeholder text is shown instead (e.g. "[XX]+").

export type Stat = {
  /** The real number, e.g. 45. Leave null until you have it. */
  value: number | null;
  /** Shown while value is null */
  placeholder: string;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 50, placeholder: "XX", suffix: "+", label: "Projects Delivered" },
  { value: 40, placeholder: "XX", suffix: "+", label: "Happy Clients" },
  { value: 5, placeholder: "X", suffix: "+", label: "Years Experience" },
  { value: 100, placeholder: "XX", suffix: "%", label: "Client Satisfaction" },
];
