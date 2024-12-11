import { Calculator } from "@/components/Calculator/Calculator";

const questions = [
  // Food Category
  {
    id: "diet",
    category: "Food",
    text: "What best describes your typical diet?",
    hint: "Consider your eating habits over the past month",
    options: [
      { text: "Meat with most meals", value: 4 },
      { text: "Meat occasionally", value: 3 },
      { text: "Predominantly fish", value: 2 },
      { text: "Vegetarian", value: 1 },
      { text: "Vegan", value: 0 },
    ],
  },
  {
    id: "local",
    category: "Food",
    text: "How often do you consume locally sourced food?",
    hint: "Local food is produced within 100km of where you live",
    options: [
      { text: "Always", value: 0 },
      { text: "Often", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Rarely", value: 3 },
    ],
  },
  {
    id: "waste",
    category: "Food",
    text: "How much of your purchased food goes to waste?",
    hint: "Think about the food you throw away each week",
    options: [
      { text: "None", value: 0 },
      { text: "A small amount", value: 1 },
      { text: "A moderate amount", value: 2 },
      { text: "A significant amount", value: 3 },
    ],
  },
  // Travel Category
  {
    id: "driving",
    category: "Travel",
    text: "How many kilometers do you drive weekly?",
    hint: "Estimate your total driving distance in a week",
    options: [
      { text: "Less than 50 km", value: 1 },
      { text: "50-100 km", value: 2 },
      { text: "100-200 km", value: 3 },
      { text: "Over 200 km", value: 4 },
    ],
  },
  {
    id: "public_transport",
    category: "Travel",
    text: "How often do you use public transport (buses, BRT, trains)?",
    hint: "Consider your usage over the past month",
    options: [
      { text: "Daily", value: 1 },
      { text: "A few times a week", value: 2 },
      { text: "Occasionally", value: 3 },
      { text: "Never", value: 4 },
    ],
  },
  {
    id: "domestic_flights",
    category: "Travel",
    text: "How many domestic flights do you take annually?",
    hint: "Count all flights within your country",
    options: [
      { text: "None", value: 0 },
      { text: "1-2", value: 1 },
      { text: "3-5", value: 2 },
      { text: "More than 5", value: 3 },
    ],
  },
  {
    id: "international_flights",
    category: "Travel",
    text: "How many international flights do you take annually?",
    hint: "Count all flights outside your country",
    options: [
      { text: "None", value: 0 },
      { text: "1-2", value: 2 },
      { text: "3-5", value: 4 },
      { text: "More than 5", value: 6 },
    ],
  },
  // Home Category
  {
    id: "energy_source",
    category: "Home",
    text: "What is your primary source of household energy?",
    hint: "Choose the main source you rely on",
    options: [
      { text: "National grid electricity", value: 2 },
      { text: "Generator", value: 4 },
      { text: "Solar power", value: 0 },
      { text: "Other", value: 3 },
    ],
  },
  {
    id: "electricity_hours",
    category: "Home",
    text: "On average, how many hours per day do you have electricity?",
    hint: "Estimate your daily electricity availability",
    options: [
      { text: "Less than 4 hours", value: 1 },
      { text: "4-8 hours", value: 2 },
      { text: "8-12 hours", value: 3 },
      { text: "More than 12 hours", value: 4 },
    ],
  },
  {
    id: "generator_fuel",
    category: "Home",
    text: "If you use a generator, how many liters of fuel does it consume weekly?",
    hint: "Estimate your weekly fuel consumption",
    options: [
      { text: "Less than 10 liters", value: 1 },
      { text: "10-20 liters", value: 2 },
      { text: "20-50 liters", value: 3 },
      { text: "Over 50 liters", value: 4 },
    ],
  },
  {
    id: "cooking_fuel",
    category: "Home",
    text: "What type of fuel do you primarily use for cooking?",
    hint: "Select the main fuel source for cooking",
    options: [
      { text: "Firewood", value: 4 },
      { text: "Charcoal", value: 3 },
      { text: "Kerosene", value: 2 },
      { text: "Liquefied Petroleum Gas (LPG)", value: 1 },
      { text: "Electricity", value: 0 },
    ],
  },
  // Stuff Category
  {
    id: "clothing",
    category: "Stuff",
    text: "How often do you buy new clothing?",
    hint: "Consider your purchasing habits over the past year",
    options: [
      { text: "Monthly", value: 4 },
      { text: "Quarterly", value: 3 },
      { text: "Biannually", value: 2 },
      { text: "Rarely", value: 1 },
    ],
  },
  {
    id: "electronics",
    category: "Stuff",
    text: "How frequently do you purchase new electronic devices (phones, laptops, etc.)?",
    hint: "Think about your purchases over the past few years",
    options: [
      { text: "Annually", value: 4 },
      { text: "Every 2-3 years", value: 3 },
      { text: "Every 4-5 years", value: 2 },
      { text: "Rarely", value: 1 },
    ],
  },
  {
    id: "waste_management",
    category: "Stuff",
    text: "How do you dispose of household waste?",
    hint: "Select the method you use most often",
    options: [
      { text: "Regular waste collection services", value: 1 },
      { text: "Burning", value: 4 },
      { text: "Dumping in open areas", value: 3 },
      { text: "Composting/recycling", value: 0 },
    ],
  },
];

const Index = () => {
  return (
    <Calculator questions={questions} />
  );
};

export default Index;
