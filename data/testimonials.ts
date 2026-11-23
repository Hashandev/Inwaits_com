// data/testimonials.ts
// Client reviews for the "What our clients say" section.

export type Testimonial = {
  name: string;
  /** Optional line next to the name, e.g. "Owner, LearnWell.lk". Leave out if unknown. */
  role?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Isuru Gayashan",
    role: "Owner, LearnWell.lk",
    quote:
      "Inwaits did an excellent job building our learning site, LearnWell.lk. Their skills, understanding of our needs, and strong after-service show their professionalism. They are a top recommendation for website development.",
  },
  {
    name: "Physics From Tidas",
    quote: "Highly recommend. Flexible staff. Great support.",
  },
  {
    name: "Duminda Nuwan Bandara",
    role: "dumindabandara.lk",
    quote:
      "Highly recommended their service to those who are waiting to get their service. They created a nice website for me, dumindabandara.lk.",
  },
  {
    // TODO: check the spelling of the name
    name: "Combined Maths with Madhushan Neranjan",
    quote: "Great Service Recommended.",
  },
  {
    name: "Sasindu D. Pattidura",
    quote:
      "Don't hesitate to get your work done with them, they do an amazing job! Highly recommended.",
  },
];
