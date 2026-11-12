// Testimonials for the landing page. Each person gave the remarks to Arpit in a meeting, and Arpit supplied the substance on 12 November 2026.
// The wording here is an edited version of those remarks. No written original exists.
export type Testimonial = { quote: string; name: string; role: string; placeholder?: boolean };

export const testimonials = {
  featured: { quote: 'Arpit joined as our first employee and became a core member of the team. He took full ownership of his work and went well beyond what we expected, both in optimisation and in leading conversations with external clients. His communication and eye for detail are among the team’s greatest strengths. I wish him a great future.', name: 'Nandit Mehra', role: 'Founder, Lighthouse' } as Testimonial,
  more: [
    { quote: 'Some of our hardest problems needed solutions from outside the usual playbook, and Arpit was the person we could count on for them. He never builds for today’s scale alone. He expects the platform to grow fast, and his systems have held every time we scaled.', name: 'Ravish Sharma', role: 'CTO, Lighthouse' },
    { quote: 'Insurance is one of the most quantitative and complex domains there is. With Arpit, we never had to teach everything from scratch. He took the initiative to learn it himself, and at times he seemed to understand the mechanics of insurance better than our own team.', name: 'Dr. Librado Gonzales', role: 'Director, Harmony Insurance and Consultancy' },
    { quote: 'We go into a meeting with a set of problems and come out with more than solutions. After talking to Arpit, our own vision is larger than it was. He is never satisfied with the bare minimum and wants to excel at every problem.', name: 'Maria O’Connel', role: 'Managing Director, People Accel Group' },
    { quote: 'Our platform was already live and serving thousands of users in Trinidad and Tobago, so every new feature carried risk. This is where Arpit outshone everyone. His work was precise and structured, and he added complex functionality in production without our system going offline even once.', name: 'Mr. Atiba', role: 'Director, Xhuma Healthcare' },
  ] as Testimonial[],
};
