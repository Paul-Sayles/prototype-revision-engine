export const questionData = {
  subject: "OCR Engineering Level 1/2",
  units: [
    {
      id: "materials",
      title: "Materials & Properties",
      topics: [
        {
          id: "properties",
          title: "Material Properties",
          questions: [
            {
              id: "mat-001",
              question: "Which material is most resistant to corrosion?",
              options: [
                "Mild steel",
                "Cast iron",
                "Stainless steel",
                "Brass",
              ],
              correctIndex: 2,
              explanation:
                "Stainless steel resists corrosion because it contains chromium.",
            },
            {
              id: "mat-002",
              question: "What does ductility mean?",
              options: [
                "Ability to resist impact",
                "Ability to be stretched into wire",
                "Ability to resist heat",
                "Ability to resist corrosion",
              ],
              correctIndex: 1,
              explanation:
                "Ductility is the ability of a material to be drawn or stretched into wire.",
            },
          ],
        },
      ],
    },
    {
      id: "manufacturing",
      title: "Manufacturing Processes",
      topics: [
        {
          id: "machining",
          title: "Machining Processes",
          questions: [
            {
              id: "man-001",
              question: "Which process permanently joins metal parts?",
              options: ["Filing", "Welding", "Drilling", "Marking out"],
              correctIndex: 1,
              explanation: "Welding permanently joins metals using heat.",
            },
            {
              id: "man-002",
              question: "Which process removes material from a rotating workpiece?",
              options: ["Turning", "Casting", "Forging", "Extrusion"],
              correctIndex: 0,
              explanation:
                "Turning removes material from a rotating workpiece.",
            },
          ],
        },
      ],
    },
  ],
};
