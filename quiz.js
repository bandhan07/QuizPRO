// ========== CONFIGURATION ========== //
const totalQuestionsPerLevel = 10;
let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 15;
let lives = 3; // NEW: initial lives

// ========== QUESTION BANK ========== //
const allQuestions = {
  1: [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars" },
    { question: "Boiling point of water?", options: ["90°C", "100°C", "110°C", "80°C"], answer: "100°C" },
    { question: "√16 = ?", options: ["2", "4", "6", "8"], answer: "4" },
    { question: "King of Jungle?", options: ["Tiger", "Lion", "Elephant", "Bear"], answer: "Lion" },
    { question: "Color of Sun?", options: ["Red", "Blue", "White", "Yellow"], answer: "Yellow" },
    { question: "How many continents?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Inventor of Bulb?", options: ["Newton", "Edison", "Tesla", "Einstein"], answer: "Edison" },
    { question: "Capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], answer: "Delhi" },
  ],
  2: [
  {
    question: "Which country has the largest population?",
    options: ["China", "India", "United States", "Indonesia"],
    answer: "India"
  },
  {
    question: "Which is the deepest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "What does Newton's third law of motion mean?",
    options: [
      "The relationship between force and acceleration",
      "The law of gravitational force",
      "Every action has an equal and opposite reaction",
      "Law of conservation of mass"
    ],
    answer: "Every action has an equal and opposite reaction"
  },
  {
    question: "Between which two countries is Mount Everest located?",
    options: ["India and China", "Nepal and China", "Bhutan and India", "Pakistan and India"],
    answer: "Nepal and China"
  },
  {
    question: "Where is the Eiffel Tower located?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which number is divisible by 3 and 5?",
    options: ["10", "15", "20", "30"],
    answer: "15"
  },
  {
    question: "What is the cube of 2?",
    options: ["4", "8", "6", "12"],
    answer: "8"
  },
  {
    question: "What is the fraction form of 50%?",
    options: ["1/2", "1/4", "1/5", "3/4"],
    answer: "1/2"
  },
  {
    question: "Which number is the first prime number?",
    options: ["1", "2", "3", "5"],
    answer: "2"
  },
  {
    question: "(3 + 5) × 2 = how much?",
    options: ["12", "16", "18", "20"],
    answer: "16"
  }
],
  3: [
  {
    question: "What is the square root of 27?",
    options: ["3", "5", "9", "7"],
    answer: "9"
  },
  {
    question: "How can 35% be expressed as a fraction?",
    options: ["7/20", "7/25", "35/100", "1/3"],
    answer: "35/100"
  },
  {
    question: "Which number is divisible by 5 and 10?",
    options: ["20", "25", "30", "15"],
    answer: "20"
  },
  {
    question: "What is the common approximation of the value of π (pi)?",
    options: ["3.12", "3.16", "3.14", "3.18"],
    answer: "3.14"
  },
  {
    question: "Which is the most populous country in the world?",
    options: ["China", "India", "United States", "Indonesia"],
    answer: "India"
  },
  {
    question: "Where is the Great Barrier Reef located?",
    options: ["India", "Australia", "Brazil", "United Kingdom"],
    answer: "Australia"
  },
  {
    question: "Which gas is present in the largest amount in the air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Nitrogen"
  },
  {
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
    answer: "Pacific"
  },
  {
    question: "Which country is located on two continents?",
    options: ["India", "Turkey", "Japan", "Mexico"],
    answer: "Turkey"
  },
  {
    question: "Which is the highest mountain in the world?",
    options: ["Everest", "Kilimanjaro", "Kanchenjunga", "Mont Blanc"],
    answer: "Everest"
  }
],
  4: [
  {
    question: "What is 20% of 45?",
    options: ["9", "8", "7", "10"],
    answer: "9"
  },
  {
    question: "What is the square root of 16?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "What is the value of 1/2 + 1/4?",
    options: ["3/4", "1/2", "5/4", "2/3"],
    answer: "3/4"
  },
  {
    question: "Which is the largest continent in the world?",
    options: ["Africa", "Asia", "Europe", "North America"],
    answer: "Asia"
  },
  {
    question: "Which country has the most mountains?",
    options: ["Nepal", "Switzerland", "Japan", "China"],
    answer: "Switzerland"
  },
  {
    question: "Which is the national animal of India?",
    options: ["Lion", "Elephant", "Tiger", "Deer"],
    answer: "Tiger"
  },
  {
    question: "Where is the headquarters of the World Health Organization (WHO) located?",
    options: ["New York", "Geneva", "London", "Tokyo"],
    answer: "Geneva"
  },
  {
    question: "Who is known as the ‘Father of Mathematics’?",
    options: ["Euclid", "Pythagoras", "Aryabhata", "Al-Khwarizmi"],
    answer: "Euclid"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Ganges"],
    answer: "Nile"
  },
  {
    question: "Which is the driest place on earth?",
    options: ["Sahara Desert", "Atacama Desert", "Gobi Desert", "Kalahari Desert"],
    answer: "Atacama Desert"
  }
],
  5: [
  {
    question: "(8 × 4) - 12 = how much?",
    options: ["20", "24", "30", "32"],
    answer: "24"
  },
  {
    question: "How can 1.25 be expressed as a fraction?",
    options: ["5/4", "5/10", "1/25", "2/5"],
    answer: "5/4"
  },
  {
    question: "Which number is divisible by 2 and 3?",
    options: ["9", "12", "15", "18"],
    answer: "12"
  },
  {
    question: "Which is the largest island in the world?",
    options: ["Greenland", "Madagascar", "Sri Lanka", "Indonesia"],
    answer: "Greenland"
  },
  {
    question: "Between which two countries is the ‘English Channel’ located?",
    options: ["United States and Canada", "India and Bangladesh", "France and United Kingdom", "China and Russia"],
    answer: "France and United Kingdom"
  },
  {
    question: "Which is the tallest building in the world?",
    options: ["One World Trade Center", "Burj Khalifa", "Petronas Towers", "Taipei 101"],
    answer: "Burj Khalifa"
  },
  {
    question: "In which year were the first Olympic Games held?",
    options: ["1896", "1900", "1924", "1932"],
    answer: "1896"
  },
  {
    question: "Who received the title of 'Mahatma'?",
    options: ["Rabindranath Tagore", "Subhash Chandra Bose", "Mahatma Gandhi", "Vivekananda"],
    answer: "Mahatma Gandhi"
  },
  {
    question: "On which river is 'Paris' located?",
    options: ["Ganges", "Nile", "Sin", "Amazon"],
    answer: "Sin" // Note: This should actually be "Seine" — let me know if you'd like me to correct this.
  },
  {
    question: "Who was the first person to step on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    answer: "Neil Armstrong"
  }
],
  6: [
  {
    question: "What is the value of 12 + (5 × 3)?",
    options: ["27", "25", "20", "30"],
    answer: "27"
  },
  {
    question: "Which is the largest ocean in the world?",
    options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
    answer: "Pacific"
  },
  {
    question: "What is the value of √49?",
    options: ["6", "7", "8", "5"],
    answer: "7"
  },
  {
    question: "Which is the tallest building in the world?",
    options: ["Taipei 101", "One World Trade Center", "Burj Khalifa", "Petronas Towers"],
    answer: "Burj Khalifa"
  },
  {
    question: "What happens if 15% is expressed as a fraction?",
    options: ["3/20", "15/100", "1/4", "1/5"],
    answer: "15/100"
  },
  {
    question: "Who is the artist of the painting 'Mona Lisa'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Raphael"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the square of 8?",
    options: ["16", "32", "64", "80"],
    answer: "64"
  },
  {
    question: "How long is the 'Great Wall of China'?",
    options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
    answer: "8,850 km"
  },
  {
    question: "How many grams does 1 kilogram equal?",
    options: ["100 grams", "1,000 grams", "10,000 grams", "10 grams"],
    answer: "1,000 grams"
  },
  {
    question: "What is the driest place on earth?",
    options: ["Sahara Desert", "Atacama Desert", "Gobi Desert", "Kalahari Desert"],
    answer: "Atacama Desert"
  }
],
  7: [
  {
    question: "What is the value of 15 + (6 × 2)?",
    options: ["24", "27", "30", "32"],
    answer: "27"
  },
  {
    question: "Which is the smallest continent in the world?",
    options: ["Europe", "Australia", "South America", "Africa"],
    answer: "Australia"
  },
  {
    question: "What is the value of √64?",
    options: ["7", "8", "9", "10"],
    answer: "8"
  },
  {
    question: "Which is the most populous city in the world?",
    options: ["Tokyo", "New York", "London", "Delhi"],
    answer: "Tokyo"
  },
  {
    question: "What is 40% expressed as a fraction?",
    options: ["2/5", "4/10", "40/100", "1/3"],
    answer: "40/100"
  },
  {
    question: "Which forest is known as the 'lungs of the Earth'?",
    options: ["Amazon rainforest", "Taiga forest", "Congo rainforest", "Sumatra forest"],
    answer: "Amazon rainforest"
  },
  {
    question: "What is 10² (square of 10)?",
    options: ["50", "100", "150", "200"],
    answer: "100"
  },
  {
    question: "How many countries does the continent 'Europe' consist of?",
    options: ["35", "44", "50", "57"],
    answer: "44"
  },
  {
    question: "1 liter = how many milliliters?",
    options: ["100 milliliters", "500 milliliters", "1000 milliliters", "5000 milliliters"],
    answer: "1000 milliliters"
  },
  {
    question: "In which ocean is the 'Great Barrier Reef' located?",
    options: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Southern Ocean"],
    answer: "Pacific Ocean"
  }
],
  8: [
  {
    question: "What is the value of 18 ÷ 3 + 5?",
    options: ["8", "9", "10", "11"],
    answer: "9"
  },
  {
    question: "Which is the highest waterfall in the world?",
    options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
    answer: "Angel Falls"
  },
  {
    question: "What is 3³ (cube of 3)?",
    options: ["9", "27", "12", "36"],
    answer: "27"
  },
  {
    question: "Which is the largest desert in the world?",
    options: ["Gobi", "Kalahari", "Sahara", "Atacama"],
    answer: "Sahara"
  },
  {
    question: "What happens if 60% is expressed as a fraction?",
    options: ["3/5", "6/10", "2/3", "5/8"],
    answer: "3/5"
  },
  {
    question: "Which two countries have the largest land border in the world?",
    options: ["United States-Canada", "India-China", "Russia-China", "Brazil-Argentina"],
    answer: "Russia-China"
  },
  {
    question: "What is the square root of 81?",
    options: ["8", "9", "10", "11"],
    answer: "9"
  },
  {
    question: "Which is the most populous city in the world?",
    options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
    answer: "Tokyo"
  },
  {
    question: "How many centimeters is 1 meter?",
    options: ["100 cm", "10 cm", "1,000 cm", "10,000 cm"],
    answer: "100 cm"
  },
  {
    question: "In which country is the 'Great Pyramid of Giza' located?",
    options: ["India", "Egypt", "China", "Mexico"],
    answer: "Egypt"
  }
],
  9: [
  {
    question: "What is the value of 25 ÷ 5 + 7?",
    options: ["12", "10", "11", "14"],
    answer: "12"
  },
  {
    question: "Which is the largest country in the world (in area)?",
    options: ["China", "United States", "Russia", "India"],
    answer: "Russia"
  },
  {
    question: "What is the value of √36?",
    options: ["5", "6", "7", "8"],
    answer: "6"
  },
  {
    question: "Which is the largest football stadium in the world?",
    options: ["Maracana Stadium", "Camp Nou", "Rungrado Maiden Stadium", "Wembley Stadium"],
    answer: "Rungrado Maiden Stadium"
  },
  {
    question: "What happens if 75% is expressed as a fraction?",
    options: ["3/4", "7/10", "5/8", "1/2"],
    answer: "3/4"
  },
  {
    question: "Which country is located on two continents?",
    options: ["India", "Turkey", "Japan", "Mexico"],
    answer: "Turkey"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Nile", "Amazon", "Mississippi", "Ganges"],
    answer: "Nile"
  },
  {
    question: "Where is ‘Trafalgar Square’ located?",
    options: ["London", "Paris", "Berlin", "New York"],
    answer: "London"
  },
  {
    question: "1 ton = how many kilograms?",
    options: ["100 kg", "500 kg", "1000 kg", "1500 kg"],
    answer: "1000 kg"
  },
  {
    question: "The ‘Cotplus Trophy’ is related to which sport?",
    options: ["Cricket", "Football", "Badminton", "Hockey"],
    answer: "Cricket"
  }
],
 10: [
  {
    question: "What is the value of 42 ÷ 6 + 4?",
    options: ["10", "11", "12", "14"],
    answer: "11"
  },
  {
    question: "Which ocean has the most water?",
    options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
    answer: "Pacific"
  },
  {
    question: "What is 5³ (cube of 5)?",
    options: ["125", "250", "150", "100"],
    answer: "125"
  },
  {
    question: "Which is the most populous city in the world?",
    options: ["Tokyo", "New York", "Shanghai", "Mumbai"],
    answer: "Tokyo"
  },
  {
    question: "What happens if 80% is expressed as a fraction?",
    options: ["4/5", "8/10", "2/3", "3/4"],
    answer: "4/5"
  },
  {
    question: "Where is the 'Great Barrier Reef' located?",
    options: ["India", "Australia", "South Africa", "Brazil"],
    answer: "Australia"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    answer: "12"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Ganges"],
    answer: "Nile"
  },
  {
    question: "1 meter = how many centimeters?",
    options: ["100 cm", "10 cm", "1,000 cm", "10,000 cm"],
    answer: "100 cm"
  },
  {
    question: "In which country is the 'Great Pyramid of Giza' located?",
    options: ["India", "Egypt", "China", "Mexico"],
    answer: "Egypt"
  }
],
 11: [
  {
    question: "Which country has the most linguistic diversity?",
    options: ["India", "China", "Papua New Guinea", "United States"],
    answer: "Papua New Guinea"
  },
  {
    question: "Where is 'Stonehenge' located?",
    options: ["United Kingdom", "France", "United States", "Germany"],
    answer: "United Kingdom"
  },
  {
    question: "Where does the rainiest place in the world fall?",
    options: ["Cherrapunji, India", "Mawsynram, India", "Kigali, Rwanda", "Hawaii, United States"],
    answer: "Mawsynram, India"
  },
  {
    question: "Which is the oldest city in the world?",
    options: ["Jericho", "Baghdad", "Cairo", "Rome"],
    answer: "Jericho"
  },
  {
    question: "Which country has the most tourist attractions in the world?",
    options: ["United States", "France", "Italy", "China"],
    answer: "France"
  },
  {
    question: "Which is the highest waterfall in the world?",
    options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
    answer: "Angel Falls"
  },
  {
    question: "Which is the oldest university in the world?",
    options: ["Oxford", "Al-Azhar", "Nalanda", "Karuwain"],
    answer: "Karuwain"
  },
  {
    question: "Which is the most populous city in the world?",
    options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
    answer: "Tokyo"
  },
  {
    question: "Where is the largest scientific research center in the world?",
    options: ["NASA, USA", "CERN, Switzerland", "MIT, USA", "Moscow Scientific Research Center"],
    answer: "CERN, Switzerland"
  },
  {
    question: "The 'Great Pyramid of Giza' was built during the reign of which pharaoh?",
    options: ["Tutankhamun", "Khufu", "Ramses II", "Seti I"],
    answer: "Khufu"
  }
],
 12: [
  {
    question: "Which country has the most volcanoes?",
    options: ["Indonesia", "United States", "Japan", "Italy"],
    answer: "Indonesia"
  },
  {
    question: "In which country is the 'Grand Canyon' located?",
    options: ["Mexico", "United States", "China", "Brazil"],
    answer: "United States"
  },
  {
    question: "Which is the deepest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Why is the 'Dead Sea' famous?",
    options: [
      "It is the largest lake",
      "Its water has high salinity",
      "It is the deepest sea in the world",
      "It is the longest river in the world"
    ],
    answer: "Its water has high salinity"
  },
  {
    question: "Which is the hottest place on earth?",
    options: ["Sahara Desert", "Death Valley, USA", "Lut Desert, Iran", "Atacama Desert"],
    answer: "Lut Desert, Iran"
  },
  {
    question: "Which is the largest biscuit producing country in the world?",
    options: ["United Kingdom", "United States", "India", "China"],
    answer: "India"
  },
  {
    question: "Which is the coldest place in the world?",
    options: ["Antarctica", "Siberia", "Greenland", "Iceland"],
    answer: "Antarctica"
  },
  {
    question: "Where is the 'Bermuda Triangle' located?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Southern Ocean"],
    answer: "Atlantic Ocean"
  },
  {
    question: "Which is the most populated island in the world?",
    options: ["Java, Indonesia", "Honshu, Japan", "Luzon, Philippines", "Britain, United Kingdom"],
    answer: "Java, Indonesia"
  },
  {
    question: "Which country has had the longest dictatorship?",
    options: ["North Korea", "Cuba", "Libya", "Soviet Union"],
    answer: "North Korea"
  }
],
 13: [
    {
      question: "Which country has the most waterfalls?",
      options: ["Brazil", "Canada", "United States", "Venezuela"],
      answer: "Canada"
    },
    {
      question: "In which country is the 'Tower of Pisa' located?",
      options: ["France", "Italy", "Spain", "United Kingdom"],
      answer: "Italy"
    },
    {
      question: "Which is the largest airport in the world?",
      options: [
        "Hong Kong International Airport",
        "King Fahd International Airport",
        "Istanbul Airport",
        "Atlanta International Airport"
      ],
      answer: "King Fahd International Airport"
    },
    {
      question: "'Sydney Opera House' is located on which continent?",
      options: ["Europe", "North America", "Australia", "South America"],
      answer: "Australia"
    },
    {
      question: "Which country produces the most films in the world?",
      options: ["United States", "India", "China", "France"],
      answer: "India"
    },
    {
      question: "Which is the busiest seaport in the world?",
      options: ["Shanghai, China", "Dubai, UAE", "Singapore", "New York"],
      answer: "Shanghai, China"
    },
    {
      question: "'Mount Fuji' is located in which country?",
      options: ["South Korea", "Japan", "China", "Vietnam"],
      answer: "Japan"
    },
    {
      question: "Which is the most populous city in the world?",
      options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
      answer: "Tokyo"
    },
    {
      question: "Where were the 'Hanging Gardens of Babylon' located?",
      options: ["Egypt", "Greece", "Iraq", "Italy"],
      answer: "Iraq"
    },
    {
      question: "Which is the largest cricket stadium in the world?",
      options: [
        "Melbourne Cricket Ground",
        "Motera Stadium",
        "Lord's Stadium",
        "Eden Gardens"
      ],
      answer: "Motera Stadium"
    }
  ],
 14: [
    {
      question: "In which country is the 'Grand Canyon' located?",
      options: ["Mexico", "United States", "China", "Brazil"],
      answer: "United States"
    },
    {
      question: "Which is the oldest civilization in the world?",
      options: [
        "Roman civilization",
        "Egyptian civilization",
        "Indus Valley civilization",
        "Mesopotamian civilization"
      ],
      answer: "Mesopotamian civilization"
    },
    {
      question: "Which country was ruled by a dictator for the longest time?",
      options: ["North Korea", "Cuba", "Libya", "Soviet Union"],
      answer: "North Korea"
    },
    {
      question: "Which is the deepest lake in the world?",
      options: ["Lake Titicaca", "Caspian Lake", "Lake Baikal", "Lake Victoria"],
      answer: "Lake Baikal"
    },
    {
      question: "In which continent is the 'Amazon Rainforest' located?",
      options: ["Africa", "South America", "Asia", "Europe"],
      answer: "South America"
    },
    {
      question: "Which country has the most volcanoes in the world?",
      options: ["Indonesia", "Japan", "Philippines", "United States"],
      answer: "Indonesia"
    },
    {
      question: "Where is the 'Bermuda Triangle' located?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Southern Ocean"],
      answer: "Atlantic Ocean"
    },
    {
      question: "Which is the hottest place in the world?",
      options: ["Sahara Desert", "Death Valley, USA", "Lut Desert, Iran", "Atacama Desert"],
      answer: "Lut Desert, Iran"
    },
    {
      question: "Which is the busiest airport in the world?",
      options: [
        "Atlanta International Airport",
        "Dubai International Airport",
        "London Heathrow",
        "Beijing Capital Airport"
      ],
      answer: "Atlanta International Airport"
    },
    {
      question: "Which is the largest forest in the world?",
      options: [
        "Amazon Rainforest",
        "Congo Rainforest",
        "Sumatra Forest",
        "Taiga Forest"
      ],
      answer: "Amazon Rainforest"
    }
  ],
 15: [
      {
        question: "Which is the most populous city in the world?",
        options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
        answer: "Tokyo"
      },
      {
        question: "Which is the highest volcano in the world?",
        options: ["Mauna Loa", "Ojos del Salado", "Popocatepetl", "Etna"],
        answer: "Ojos del Salado"
      },
      {
        question: "Where is the 'Grand Catchment' located?",
        options: ["South Africa", "Australia", "United States", "Russia"],
        answer: "Australia"
      },
      {
        question: "Which place in the world receives the least rainfall?",
        options: ["Sahara Desert", "Atacama Desert", "Lut Desert", "Gobi Desert"],
        answer: "Atacama Desert"
      },
      {
        question: "Which country produces the most gold in the world?",
        options: ["United States", "South Africa", "China", "Australia"],
        answer: "China"
      },
      {
        question: "Which is the largest lake in the world?",
        options: ["Lake Titicaca", "Caspian Lake", "Lake Victoria", "Lake Baikal"],
        answer: "Caspian Lake"
      },
      {
        question: "Which country has been practicing democracy for the longest time?",
        options: ["United Kingdom", "United States", "Switzerland", "France"],
        answer: "United Kingdom"
      },
      {
        question: "How many countries does the 'Amazon Rainforest' cover?",
        options: ["6", "9", "11", "12"],
        answer: "9"
      },
      {
        question: "Which is the most popular sport in the world?",
        options: ["Cricket", "Basketball", "Football", "Tennis"],
        answer: "Football"
      },
      {
        question: "What is the longest bridge in the world?",
        options: ["Danyang-Kunshan Grand Bridge, China", "Pontchartrain Bridge, USA", "Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan"],
        answer: "Danyang-Kunshan Grand Bridge, China"
      }
    ],
 16: [
      {
        question: "Which country hosted the first Olympics?",
        options: ["Rome", "Greece", "United States", "France"],
        answer: "Greece"
      },
      {
        question: "What is the coldest city in the world?",
        options: ["Norilsk, Russia", "Yakutsk, Russia", "Reykjavik, Iceland", "Helsinki, Finland"],
        answer: "Yakutsk, Russia"
      },
      {
        question: "Where were the 'Hanging Gardens of Babylon' located?",
        options: ["Egypt", "Greece", "Iraq", "Italy"],
        answer: "Iraq"
      },
      {
        question: "What is the oldest novel in the world?",
        options: ["The Tale of Genji", "The Iliad", "The Mahabharata", "Gilgamesh"],
        answer: "The Tale of Genji"
      },
      {
        question: "Which ocean is surrounded by the most countries?",
        options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
        answer: "Indian Ocean"
      },
      {
        question: "Which is the largest scientific research center in the world?",
        options: ["NASA, USA", "CERN, Switzerland", "MIT, USA", "Moscow Scientific Center"],
        answer: "CERN, Switzerland"
      },
      {
        question: "Which is the largest natural gas producer in the world?",
        options: ["Russia", "USA", "Qatar", "Iran"],
        answer: "Russia"
      },
      {
        question: "Where is the 'Alhambra' fortress located?",
        options: ["Mexico", "Spain", "Morocco", "Turkey"],
        answer: "Spain"
      },
      {
        question: "Which is the fastest animal in the world?",
        options: ["Cheetah", "Peregrine Falcon", "African Greyhound", "Horseshoe Bat"],
        answer: "Peregrine Falcon"
      },
      {
        question: "Which city has the busiest metro railway in the world?",
        options: ["Tokyo", "New York", "London", "Shanghai"],
        answer: "Tokyo"
      }
  ],
 17: [
  {
    question: "What is the highest hot waterfall in the world?",
    options: ["Yellowstone Geyser", "Strokkur Geyser", "Steamboat Geyser", "Old Faithful Geyser"],
    correct: "Steamboat Geyser"
  },
  {
    question: "What is the fastest fish in the world?",
    options: ["Swordfish", "Marlin", "Tuna", "Barracuda"],
    correct: "Marlin"
  },
  {
    question: "What is the saltiest lake in the world?",
    options: ["Dead Sea", "Lake Asal", "Great Salt Lake", "Caspian Sea"],
    correct: "Lake Asal"
  },
  {
    question: "Which is the oldest nation in the world?",
    options: ["China", "Sumerian civilization", "Egyptian civilization", "Inca civilization"],
    correct: "Sumerian civilization"
  },
  {
    question: "Which is the deepest cave in the world?",
    options: ["Kurubara Cave", "Varonna Cave", "Krubera Cave", "Son Dong Cave"],
    correct: "Krubera Cave"
  },
  {
    question: "Which country has maintained sovereignty for the longest time?",
    options: ["Japan", "United Kingdom", "Sweden", "Iran"],
    correct: "Japan"
  },
  {
    question: "Which country has the most forests in the world?",
    options: ["Brazil", "Canada", "Russia", "Indonesia"],
    correct: "Russia"
  },
  {
    question: "Which country has the most earthquakes in the world?",
    options: ["Japan", "Chile", "Indonesia", "Philippines"],
    correct: "Japan"
  },
  {
    question: "In which country is the 'Stone Forest' located?",
    options: ["China", "Mexico", "Spain", "United States"],
    correct: "China"
  },
  {
    question: "Which is the busiest port in the world?",
    options: ["Shanghai, China", "Singapore", "Dubai", "New York"],
    correct: "Shanghai, China"
  },
 ],
 18: [
   {
    question: "Where is the largest ice sheet in the world?",
    options: ["Greenland", "Antarctica", "Iceland", "Siberia"],
    correct: "Antarctica"
  },
  {
    question: "In which country is the 'dragon blood tree' found?",
    options: ["Madagascar", "Yemen", "India", "Brazil"],
    correct: "Yemen"
  },
  {
    question: "Which is the highest lake in the world?",
    options: ["Lake Titicaca", "Dal Lake", "Manas Sarovar", "Lake Chad"],
    correct: "Lake Titicaca"
  },
  {
    question: "Which country has the most temples in the world?",
    options: ["India", "Nepal", "Thailand", "Myanmar"],
    correct: "India"
  },
  {
    question: "Which is the largest coral reef in the world?",
    options: ["The Great Barrier Reef", "Blue Hole, Belize", "Andaman Reef", "Florida Reef"],
    correct: "The Great Barrier Reef"
  },
  {
    question: "Which country uses the most agricultural land?",
    options: ["United States", "India", "China", "Brazil"],
    correct: "India"
  },
  {
    question: "What is the 'Big Bang'?",
    options: ["The world's largest clock", "The theory of the origin of the universe", "The largest museum in England", "The world's largest metal industry"],
    correct: "The theory of the origin of the universe"
  },
  {
    question: "Which is the highest bridge in the world?",
    options: ["Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan", "Panjiang Grand Bridge, China", "Hong Kong-Zhuhai-Macau Bridge"],
    correct: "Panjiang Grand Bridge, China"
  },
  {
    question: "In which laboratory is the world's most powerful magnet found?",
    options: ["CERN, Switzerland", "Los Alamos National Lab, USA", "Japan Magnetic Research Lab", "IMI, France"],
    correct: "Los Alamos National Lab, USA"
  },
  {
    question: "Which is the oldest book in the world?",
    options: ["Mahabharata", "Epic of Gilgamesh", "Bible", "Iliad"],
    correct: "Epic of Gilgamesh"
  }
],
 19: [
  {
    question: "What is the longest glacier in the world?",
    options: ["Lambert Glacier", "Saratov Glacier", "Hubbard Glacier", "Balto Glacier"],
    correctAnswer: "Lambert Glacier"
  },
  {
    question: "What is the largest peninsula in the world?",
    options: ["Arabian Peninsula", "Malay Peninsula", "Alaska Peninsula", "Korean Peninsula"],
    correctAnswer: "Arabian Peninsula"
  },
  {
    question: "What is the largest reservoir in the world?",
    options: ["Volta Reservoir", "Cariba Reservoir", "Brazil Reservoir", "Aswan Reservoir"],
    correctAnswer: "Volta Reservoir"
  },
  {
    question: "On which planet is the largest volcano found?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars"
  },
  {
    question: "Which is the highest capital in the world?",
    options: ["La Paz, Bolivia", "Quito, Ecuador", "Kathmandu, Nepal", "Bogota, Colombia"],
    correctAnswer: "La Paz, Bolivia"
  },
  {
    question: "Which is the largest zoo in the world?",
    options: ["San Diego Zoo", "Kruger National Park", "Bronx Zoo", "Berlin Zoo"],
    correctAnswer: "Bronx Zoo"
  },
  {
    question: "In which country is the tallest waterfall located?",
    options: ["United States", "Venezuela", "Canada", "Brazil"],
    correctAnswer: "Venezuela"
  },
  {
    question: "Which city has the world's busiest subway system?",
    options: ["Tokyo", "New York", "London", "Beijing"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Which is the world's oldest library?",
    options: ["Al-Qarawiyyin Library", "British Library", "Library of Congress", "Alexandria Library"],
    correctAnswer: "Al-Qarawiyyin Library"
  },
  {
    question: "Which country has the most rivers in the world?",
    options: ["Canada", "Russia", "Brazil", "China"],
    correctAnswer: "Russia"
  }
],
 20: [
  {
    question: "Which is the largest chocolate producing country in the world?",
    options: ["United States", "Switzerland", "Belgium", "Ivory Coast"],
    correctAnswer: "Ivory Coast"
  },
  {
    question: "Which is the largest flower in the world?",
    options: ["Rafflesia", "Titan Aram", "Sunflower", "Lotus"],
    correctAnswer: "Rafflesia"
  },
  {
    question: "Which is the oldest bank in the world?",
    options: ["Bank of England", "Bank of Italy", "Monte dei Paschi di Siena", "Federal Reserve"],
    correctAnswer: "Monte dei Paschi di Siena"
  },
  {
    question: "Which is the longest railway in the world?",
    options: ["Trans-Siberian Railway", "Rocky Mountain Express", "Eurostar Rail", "Great Northern Railway"],
    correctAnswer: "Trans-Siberian Railway"
  },
  {
    question: "Which is the least populated country in the world?",
    options: ["Vatican City", "Nauru", "Monaco", "Tuvalu"],
    correctAnswer: "Vatican City"
  },
  {
    question: "Which is the largest river island in the world?",
    options: ["Majuli Island", "Banana Island", "Marazo Island", "Saharan Island"],
    correctAnswer: "Marazo Island"
  },
  {
    question: "Which country has the most forest reserves in the world?",
    options: ["Canada", "Brazil", "Russia", "Indonesia"],
    correctAnswer: "Russia"
  },
  {
    question: "Which is the fastest bird?",
    options: ["Peregrine Falcon", "Golden Eagle", "Swift", "Albatross"],
    correctAnswer: "Peregrine Falcon"
  },
  {
    question: "Which country has the most mountain peaks in the world?",
    options: ["Nepal", "Switzerland", "China", "India"],
    correctAnswer: "Switzerland"
  },
  {
    question: "Where does the world get the least rainfall?",
    options: ["Sahara Desert", "Atacama Desert", "Lut Desert", "Gobi Desert"],
    correctAnswer: "Atacama Desert"
  }
],
 21: [
  {
    question: "Which is the highest waterfall in the world?",
    options: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Yosemite Falls"],
    answer: "Angel Falls"
  },
  {
    question: "Which is the largest tea producing country in the world?",
    options: ["India", "China", "Sri Lanka", "Kenya"],
    answer: "China"
  },
  {
    question: "Which is the deepest lake in the world?",
    options: ["Lake Baikal", "Lake Titicaca", "Caspian Lake", "Lake Victoria"],
    answer: "Lake Baikal"
  },
  {
    question: "Which country consists of the largest number of islands?",
    options: ["Indonesia", "Maldives", "Finland", "Philippines"],
    answer: "Indonesia"
  },
  {
    question: "In which country are the 'Pyramid of Sun' located?",
    options: ["Egypt", "Mexico", "China", "Peru"],
    answer: "Mexico"
  },
  {
    question: "Which country has been under monarchy for the longest time?",
    options: ["United Kingdom", "Japan", "Saudi Arabia", "Thailand"],
    answer: "Japan"
  },
  {
    question: "On which continent is the highest mountain peak in the world located?",
    options: ["Europe", "Asia", "North America", "South America"],
    answer: "Asia"
  },
  {
    question: "Which is the oldest city in the world?",
    options: ["Jericho", "Baghdad", "Cairo", "Rome"],
    answer: "Jericho"
  },
  {
    question: "In which country are the most books published in the world?",
    options: ["United States", "China", "United Kingdom", "India"],
    answer: "China"
  },
  {
    question: "Where is the 'Great Blue Hole' located?",
    options: ["Australia", "Maldives", "Belize", "Bahamas"],
    answer: "Belize"
  }
],
 22: [
  {
    question: "Which is the largest river island in the world?",
    options: ["Majuli Island", "Marazo Island", "Saharan Island", "Banana Island"],
    answer: "Marazo Island"
  },
  {
    question: "Which country has the most agricultural land in the world?",
    options: ["United States", "India", "China", "Brazil"],
    answer: "India"
  },
  {
    question: "Which is the highest bridge in the world?",
    options: ["Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan", "Panjiang Grand Bridge, China", "Hong Kong-Zhuhai-Macau Bridge"],
    answer: "Panjiang Grand Bridge, China"
  },
  {
    question: "Which country produces the most diamonds?",
    options: ["Russia", "South Africa", "Canada", "Australia"],
    answer: "Russia"
  },
  {
    question: "Which is the largest mosque in the world?",
    options: ["Masjid al-Haram", "Al-Nabawi Mosque", "Faisal Mosque", "Sheikh Zayed Mosque"],
    answer: "Masjid al-Haram"
  },
  {
    question: "Which country has the most tourist attractions in the world?",
    options: ["United States", "France", "Italy", "China"],
    answer: "France"
  },
  {
    question: "Which is the oldest bank in the world?",
    options: ["Bank of England", "Bank of Italy", "Monte dei Paschi di Siena", "Federal Reserve"],
    answer: "Monte dei Paschi di Siena"
  },
  {
    question: "Where is 'The Great Dividing Range' located?",
    options: ["United States", "Australia", "Russia", "South Africa"],
    answer: "Australia"
  },
  {
    question: "Which is the fastest animal in the world?",
    options: ["Cheetah", "Peregrine Falcon", "African Greyhound", "Horseshoe Bat"],
    answer: "Peregrine Falcon"
  },
  {
    question: "Which city has the busiest metro railway in the world?",
    options: ["Tokyo", "New York", "London", "Shanghai"],
    answer: "Tokyo"
  }
],
 23: [
  {
    question: "Which is the longest bridge in the world?",
    options: ["Danyang-Kunshan Grand Bridge, China", "Pontchartrain Bridge, United States", "Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan"],
    answer: "Danyang-Kunshan Grand Bridge, China"
  },
  {
    question: "Which is the most populous island in the world?",
    options: ["Java, Indonesia", "Honshu, Japan", "Luzon, Philippines", "Britain, United Kingdom"],
    answer: "Java, Indonesia"
  },
  {
    question: "In which country is the city of 'Acapulco' located?",
    options: ["Brazil", "Mexico", "Chile", "Argentina"],
    answer: "Mexico"
  },
  {
    question: "Which is the tallest building in the world?",
    options: ["Bund Khalifa", "Taipei 101", "One World Trade Center", "Petronas Towers"],
    answer: "Bund Khalifa"
  },
  {
    question: "In which country is the 'Portugal Palace' located?",
    options: ["France", "Poland", "Germany", "Russia"],
    answer: "Poland"
  },
  {
    question: "Which country has been practicing democracy for the longest time?",
    options: ["United Kingdom", "United States", "Switzerland", "France"],
    answer: "United Kingdom"
  },
  {
    question: "In which country is the 'Dragon Blood Tree' found?",
    options: ["Madagascar", "Yemen", "India", "Brazil"],
    answer: "Yemen"
  },
  {
    question: "Which is the highest capital in the world?",
    options: ["La Paz, Bolivia", "Quito, Ecuador", "Kathmandu, Nepal", "Bogota, Colombia"],
    answer: "La Paz, Bolivia"
  },
  {
    question: "In which country are the most films produced in the world?",
    options: ["United States", "India", "China", "France"],
    answer: "India"
  },
  {
    question: "Where is 'Stonehenge' located?",
    options: ["United Kingdom", "France", "United States", "Germany"],
    answer: "United Kingdom"
  }
],
 24: [
  {
    question: "Which is the highest volcano in the world?",
    options: ["Mauna Loa", "Ojos del Salado", "Popocatepetl", "Etna"],
    answer: "Ojos del Salado"
  },
  {
    question: "Which is the largest peninsula in the world?",
    options: ["Arabian Peninsula", "Malay Peninsula", "Alaska Peninsula", "Korean Peninsula"],
    answer: "Arabian Peninsula"
  },
  {
    question: "Which is the largest reservoir in the world?",
    options: ["Volta Reservoir", "Kariba Reservoir", "Brazil Reservoir", "Aswan Reservoir"],
    answer: "Volta Reservoir"
  },
  {
    question: "Which country has the most forest reserves in the world?",
    options: ["Canada", "Brazil", "Russia", "Indonesia"],
    answer: "Russia"
  },
  {
    question: "In which country is 'Mount Fuji' located?",
    options: ["South Korea", "Japan", "China", "Vietnam"],
    answer: "Japan"
  },
  {
    question: "Which is the oldest library in the world?",
    options: ["Al-Qarawiyyin Library", "British Library", "Library of Congress", "Alexandria Library"],
    answer: "Al-Qarawiyyin Library"
  },
  {
    question: "Where is the 'Grand Catchment' located?",
    options: ["South Africa", "Australia", "United States", "Russia"],
    answer: "Australia"
  },
  {
    question: "Where were the 'Hanging Gardens of Babylon' located?",
    options: ["Egypt", "Greece", "Iraq", "Italy"],
    answer: "Iraq"
  },
  {
    question: "Which is the fastest animal in the world?",
    options: ["Cheetah", "Peregrine Falcon", "African Greyhound", "Horseshoe Bat"],
    answer: "Peregrine Falcon"
  },
  {
    question: "Which city has the busiest metro railway in the world?",
    options: ["Tokyo", "New York", "London", "Shanghai"],
    answer: "Tokyo"
  }
],
 25: [
    {
      question: "Which is the highest volcano in the world?",
      options: ["Mauna Loa", "Ojos del Salado", "Popocatepetl", "Etna"],
      answer: "Ojos del Salado"
    },
    {
      question: "Which river is the longest in Europe?",
      options: ["Danube", "Rhine", "Volga", "Thames"],
      answer: "Volga"
    },
    {
      question: "In what year was the 'Taj Mahal' completed?",
      options: ["1632", "1648", "1653", "1671"],
      answer: "1653"
    },
    {
      question: "Which is the most populous country in the world?",
      options: ["China", "India", "United States", "Indonesia"],
      answer: "India"
    },
    {
      question: "Which is the largest football stadium in the world?",
      options: ["Maracana Stadium", "Camp Nou", "Rungrado Maiden Stadium", "Wembley Stadium"],
      answer: "Rungrado Maiden Stadium"
    },
    {
      question: "In which ocean is the 'Great Barrier Reef' located?",
      options: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Southern Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "In which continent is the highest mountain in the world located?",
      options: ["Europe", "Asia", "North America", "South America"],
      answer: "Asia"
    },
    {
      question: "Where is 'Machu Picchu' located?",
      options: ["Mexico", "Peru", "Brazil", "Argentina"],
      answer: "Peru"
    },
    {
      question: "In which country is the 'Grand Canyon' located?",
      options: ["Mexico", "United States", "China", "Brazil"],
      answer: "United States"
    },
    {
      question: "Which is the largest oil producing country in the world?",
      options: ["Saudi Arabia", "United States", "Russia", "Iran"],
      answer: "United States"
    }
  ],
 26: [
    {
      question: "Which country has the most railways in the world?",
      options: ["United States", "Russia", "India", "China"],
      answer: "Russia"
    },
    {
      question: "Which is the largest grain producing country in the world?",
      options: ["India", "China", "Brazil", "United States"],
      answer: "China"
    },
    {
      question: "In what year was the 'Eiffel Tower' built?",
      options: ["1887", "1889", "1895", "1900"],
      answer: "1889"
    },
    {
      question: "Which is the oldest city in the world?",
      options: ["Jericho", "Baghdad", "Cairo", "Rome"],
      answer: "Jericho"
    },
    {
      question: "Which country publishes the most books in the world?",
      options: ["United States", "China", "United Kingdom", "India"],
      answer: "China"
    },
    {
      question: "What is the 'Big Bang'?",
      options: [
        "The largest clock in the world",
        "The theory of the origin of the universe",
        "The largest museum in England",
        "The largest metal industry in the world"
      ],
      answer: "The theory of the origin of the universe"
    },
    {
      question: "Which is the highest waterfall in the world?",
      options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
      answer: "Angel Falls"
    },
    {
      question: "Which is the oldest bank in the world?",
      options: ["Bank of England", "Bank of Italy", "Monte dei Paschi di Siena", "Federal Reserve"],
      answer: "Monte dei Paschi di Siena"
    },
    {
      question: "Which is the longest railway in the world?",
      options: ["Trans-Siberian Railway", "Rocky Mountain Express", "Eurostar Rail", "Great Northern Railway"],
      answer: "Trans-Siberian Railway"
    },
    {
      question: "Which is the least populated country in the world?",
      options: ["Vatican City", "Nauru", "Monaco", "Tuvalu"],
      answer: "Vatican City"
    }
  ],
 27: [
  {
    question: "What is the highest mountain in the world?",
    options: ["Kanchenjunga", "Mont Blanc", "Mount Everest", "Kilimanjaro"],
    answer: "Mount Everest"
  },
  {
    question: "How long is the 'Great Wall of China'?",
    options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
    answer: "8,850 km"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Southern Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "What is the 'Big Bang'?",
    options: ["The world's largest clock", "The theory of the origin of the universe", "The largest museum in England", "The world's largest metal industry"],
    answer: "The theory of the origin of the universe"
  },
  {
    question: "Which country has the most tourist attractions in the world?",
    options: ["United States", "France", "Italy", "China"],
    answer: "France"
  },
  {
    question: "Which is the deepest lake in the world?",
    options: ["Lake Titicaca", "Caspian Lake", "Lake Baikal", "Lake Victoria"],
    answer: "Lake Baikal"
  },
  {
    question: "Which is the busiest airport in the world?",
    options: ["Atlanta International Airport", "Dubai International Airport", "London Heathrow", "Beijing Capital Airport"],
    answer: "Atlanta International Airport"
  },
  {
    question: "In which country is the 'Stone Forest' located?",
    options: ["China", "Mexico", "Spain", "United States"],
    answer: "China"
  },
  {
    question: "Which is the country with the most rivers in the world?",
    options: ["Canada", "Russia", "Brazil", "China"],
    answer: "Russia"
  },
  {
    question: "Where is the world's largest ice sheet?",
    options: ["Greenland", "Antarctica", "Iceland", "Siberia"],
    answer: "Antarctica"
  }
],
 28: [
  {
    question: "In which country is the 'Dragon Blood Tree' found?",
    options: ["Madagascar", "Yemen", "India", "Brazil"],
    answer: "Yemen"
  },
  {
    question: "Which is the highest lake in the world?",
    options: ["Lake Titicaca", "Dal Lake", "Manas Sarovar", "Lake Chad"],
    answer: "Lake Titicaca"
  },
  {
    question: "Which country has the most temples in the world?",
    options: ["India", "Nepal", "Thailand", "Myanmar"],
    answer: "India"
  },
  {
    question: "Which is the largest coral reef in the world?",
    options: ["The Great Barrier Reef", "Blue Hole, Belize", "Andaman Reef", "Florida Reef"],
    answer: "The Great Barrier Reef"
  },
  {
    question: "Which country uses the most agricultural land?",
    options: ["United States", "India", "China", "Brazil"],
    answer: "India"
  },
  {
    question: "Which country has the most tourist attractions in the world?",
    options: ["United States", "France", "Italy", "China"],
    answer: "France"
  },
  {
    question: "Which is the largest forest in the world?",
    options: ["Amazon rainforest", "Congo rainforest", "Sumatra forest", "Taiga forest"],
    answer: "Amazon rainforest"
  },
  {
    question: "In which laboratory is the world's most powerful magnet found?",
    options: ["CERN, Switzerland", "Los Alamos National Lab, United States", "Japan Magnetic Research Lab", "IMI, France"],
    answer: "Los Alamos National Lab, United States"
  },
  {
    question: "In which city is the world's busiest metro railway?",
    options: ["Tokyo", "New York", "London", "Shanghai"],
    answer: "Tokyo"
  },
  {
    question: "Where is the 'Great Blue Hole' located?",
    options: ["Australia", "Maldives", "Belize", "Bahamas"],
    answer: "Belize"
  }
],
 29: [
  {
    question: "Which is the deepest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "In which country is the 'Great Barrier Reef' located?",
    options: ["India", "Australia", "South Africa", "Brazil"],
    correctAnswer: "Australia"
  },
  {
    question: "Which is the country with the most rivers in the world?",
    options: ["Canada", "Russia", "Brazil", "China"],
    correctAnswer: "Russia"
  },
  {
    question: "What is the highest volcano in the world?",
    options: ["Mauna Loa", "Ojos del Salado", "Popocatepetl", "Etna"],
    correctAnswer: "Ojos del Salado"
  },
  {
    question: "What is the hottest place on earth?",
    options: ["Sahara Desert", "Death Valley, USA", "Lut Desert, Iran", "Atacama Desert"],
    correctAnswer: "Lut Desert, Iran"
  },
  {
    question: "What is the oldest civilization in the world?",
    options: ["Roman civilization", "Egyptian civilization", "Indus Valley civilization", "Mesopotamian civilization"],
    correctAnswer: "Mesopotamian civilization"
  },
  {
    question: "Which is the largest lake in the world?",
    options: ["Lake Titicaca", "Caspian Lake", "Lake Baikal", "Lake Victoria"],
    correctAnswer: "Caspian Lake"
  },
  {
    question: "Which country has been under dictatorial rule for the longest time?",
    options: ["North Korea", "Cuba", "Libya", "Soviet Union"],
    correctAnswer: "North Korea"
  },
  {
    question: "Which is the oldest university in the world?",
    options: ["Oxford", "Al-Azhar", "Nalanda", "Karuwain"],
    correctAnswer: "Karuwain"
  },
  {
    question: "Where is the largest scientific research center in the world?",
    options: ["NASA, USA", "CERN, Switzerland", "MIT, USA", "Moscow Scientific Research Center"],
    correctAnswer: "CERN, Switzerland"
  }
],
 30: [
  {
    question: "In which country is the 'Burj Al Arab' located?",
    options: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Turkey"],
    correctAnswer: "United Arab Emirates"
  },
  {
    question: "Which is the largest forest in the world?",
    options: ["Amazon rainforest", "Congo rainforest", "Sumatra forest", "Taiga forest"],
    correctAnswer: "Amazon rainforest"
  },
  {
    question: "Which is the oldest bank in the world?",
    options: ["Bank of England", "Bank of Italy", "Monte dei Paschi di Siena", "Federal Reserve"],
    correctAnswer: "Monte dei Paschi di Siena"
  },
  {
    question: "Which is the deepest cave in the world?",
    options: ["Kurubara Cave", "Varonna Cave", "Krubera Cave", "Son Dong Cave"],
    correctAnswer: "Krubera Cave"
  },
  {
    question: "Which is the fastest animal in the world?",
    options: ["Cheetah", "Peregrine Falcon", "African Greyhound", "Horseshoe Bat"],
    correctAnswer: "Peregrine Falcon"
  },
  {
    question: "Which city has the world's busiest metro railway?",
    options: ["Tokyo", "New York", "London", "Shanghai"],
    correctAnswer: "Tokyo"
  },
  {
    question: "In which laboratory is the world's most powerful magnet found?",
    options: ["CERN, Switzerland", "Los Alamos National Lab, USA", "Japan Magnetic Research Lab", "IMI, France"],
    correctAnswer: "Los Alamos National Lab, USA"
  },
  {
    question: "Where is the 'Great Blue Hole' located?",
    options: ["Australia", "Maldives", "Belize", "Bahamas"],
    correctAnswer: "Belize"
  },
  {
    question: "Where is 'Stonehenge' located?",
    options: ["United Kingdom", "France", "United States", "Germany"],
    correctAnswer: "United Kingdom"
  },
  {
    question: "Where is 'Machu Picchu' located?",
    options: ["Mexico", "Peru", "Brazil", "Argentina"],
    correctAnswer: "Peru"
  }
],
 31: [
    {
      question: "Which is the largest metropolitan city in the world?",
      options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
      answer: "Tokyo"
    },
    {
      question: "Which is the largest diamond producing country in the world?",
      options: ["Russia", "South Africa", "Canada", "Australia"],
      answer: "Russia"
    },
    {
      question: "Which is the largest chocolate producing country in the world?",
      options: ["United States", "Switzerland", "Belgium", "Ivory Coast"],
      answer: "Ivory Coast"
    },
    {
      question: "Which two countries share the world's largest land border?",
      options: ["United States-Canada", "India-China", "Russia-China", "Brazil-Argentina"],
      answer: "Russia-China"
    },
    {
      question: "Which is the world's largest lake?",
      options: ["Lake Titicaca", "Caspian Lake", "Lake Baikal", "Lake Victoria"],
      answer: "Caspian Lake"
    },
    {
      question: "Which country has the most railway lines in the world?",
      options: ["United States", "Russia", "India", "China"],
      answer: "Russia"
    },
    {
      question: "Which is the world's highest waterfall?",
      options: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Iguazu Falls"],
      answer: "Angel Falls"
    },
    {
      question: "Which is the largest ocean in the world?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Southern Ocean"],
      answer: "Pacific Ocean"
    },
    {
      question: "In which country is 'Burj Al Arab' located?",
      options: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Turkey"],
      answer: "United Arab Emirates"
    },
    {
      question: "Where is 'Machu Picchu' located?",
      options: ["Mexico", "Peru", "Brazil", "Argentina"],
      answer: "Peru"
    }
  ],
 32: [
    {
      question: "Which is the world's largest and busiest airport?",
      options: ["Atlanta International Airport", "Dubai International Airport", "London Heathrow", "Beijing Capital Airport"],
      answer: "Atlanta International Airport"
    },
    {
      question: "Which is the world's tallest building?",
      options: ["Taipei 101", "One World Trade Center", "Burj Khalifa", "Petronas Towers"],
      answer: "Burj Khalifa"
    },
    {
      question: "Which is the world's largest cricket stadium?",
      options: ["Lord's Stadium", "Motera Stadium", "Eden Gardens", "Melbourne Cricket Ground"],
      answer: "Motera Stadium"
    },
    {
      question: "Which is the largest scientific research center in the world?",
      options: ["NASA, USA", "CERN, Switzerland", "MIT, USA", "Moscow Scientific Research Center"],
      answer: "CERN, Switzerland"
    },
    {
      question: "Which is the largest tea producing country in the world?",
      options: ["India", "China", "Sri Lanka", "Kenya"],
      answer: "China"
    },
    {
      question: "In which country is the 'Grand Canyon' located?",
      options: ["Mexico", "United States", "China", "Brazil"],
      answer: "United States"
    },
    {
      question: "Where is 'Stonehenge' located?",
      options: ["United Kingdom", "France", "United States", "Germany"],
      answer: "United Kingdom"
    },
    {
      question: "Which is the highest bridge in the world?",
      options: ["Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan", "Panjiang Grand Bridge, China", "Hong Kong-Zhuhai-Macau Bridge"],
      answer: "Panjiang Grand Bridge, China"
    },
    {
      question: "Which city has the world's busiest metro railway?",
      options: ["Tokyo", "New York", "London", "Shanghai"],
      answer: "Tokyo"
    },
    {
      question: "How long is the 'Great Wall of China'?",
      options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
      answer: "8,850 km"
    }
  ],
 33: [
  {
    question: "Which country has the most waterfalls?",
    options: ["New Zealand", "Norway", "United States", "Canada"],
    answer: "Norway"
  },
  {
    question: "Which is the largest zoo in the world?",
    options: ["San Diego Zoo", "Bronx Zoo", "Berlin Zoo", "Kruger National Park"],
    answer: "Bronx Zoo"
  },
  {
    question: "Which is the highest road in the world?",
    options: ["Karakoram Highway", "Sichuan-Tibet Highway", "Eurasia Highway", "Andes Road"],
    answer: "Sichuan-Tibet Highway"
  },
  {
    question: "Which is the least populated city in the world?",
    options: ["Vatican City", "Adamstown", "Longyearbyen", "Dalhousie"],
    answer: "Adamstown"
  },
  {
    question: "Which ocean has the most islands?",
    options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
    answer: "Pacific"
  },
  {
    question: "Which is the largest train station in the world?",
    options: ["Grand Central Terminal, New York", "Kiev Passenger Station", "Tokyo Station", "Berlin Hauptbahnhof"],
    answer: "Grand Central Terminal, New York"
  },
  {
    question: "Which is the highest canyon in the world?",
    options: ["Yarlung Zangbo Grand Canyon", "Grand Canyon", "Fish River Canyon", "Waterfall Gulch"],
    answer: "Yarlung Zangbo Grand Canyon"
  },
  {
    question: "Where was the world's largest pearl found?",
    options: ["Philippines", "Australia", "China", "Japan"],
    answer: "Philippines"
  },
  {
    question: "Which is the highest temple in the world?",
    options: ["Angkor Wat, Cambodia", "Bhatarnath Temple, Nepal", "Sri Ranganathaswamy Temple, India", "Laysan Great Buddha, China"],
    answer: "Sri Ranganathaswamy Temple, India"
  },
  {
    question: "Which is the most populous island in the world?",
    options: ["Java, Indonesia", "Honshu, Japan", "Luzon, Philippines", "Britain, United Kingdom"],
    answer: "Java, Indonesia"
  }
],
 34: [
  {
    question: "Which is the highest airport in the world?",
    options: ["Daocheng Yading Airport, China", "Kushum Airport, Nepal", "Leh Airport, India", "El Alto Airport, Bolivia"],
    answer: "Daocheng Yading Airport, China"
  },
  {
    question: "Which is the largest mountain range in the world?",
    options: ["Andes Mountains", "Himalayas", "Rocky Mountains", "Alpine Range"],
    answer: "Himalayas"
  },
  {
    question: "Which is the largest museum in the world?",
    options: ["Louvre Museum, France", "British Museum, United Kingdom", "Hermitage Museum, Russia", "Metropolitan Museum, New York"],
    answer: "Louvre Museum, France"
  },
  {
    question: "Which is the largest natural gas producer in the world?",
    options: ["Russia", "United States", "Qatar", "Iran"],
    answer: "Russia"
  },
  {
    question: "Which is the longest suspension bridge in the world?",
    options: ["Akashi Kaikyo Bridge, Japan", "Golden Gate Bridge, United States", "Wuhan Yangtze River Bridge, China", "Millau Viaduct, France"],
    answer: "Akashi Kaikyo Bridge, Japan"
  },
  {
    question: "Which is the largest artificial lake in the world?",
    options: ["Lake Volta", "Aswan Reservoir", "Kariba Reservoir", "Maniako Pond Reservoir"],
    answer: "Lake Volta"
  },
  {
    question: "Which is the busiest railway station in the world?",
    options: ["Shinjuku Station, Japan", "New York Penn Station", "Kiev Passenger Station", "London Waterloo Station"],
    answer: "Shinjuku Station, Japan"
  },
  {
    question: "In which country is the world's largest rose garden located?",
    options: ["United Kingdom", "India", "Bulgaria", "France"],
    answer: "Bulgaria"
  },
  {
    question: "In which country are the most volcanoes in the world?",
    options: ["Indonesia", "Japan", "Philippines", "United States"],
    answer: "Indonesia"
  },
  {
    question: "Which is the highest dam in the world?",
    options: ["Nurek Dam, Tajikistan", "Ragun Dam, Tajikistan", "Three Gorges Dam, China", "Grand Coulee Dam, United States"],
    answer: "Nurek Dam, Tajikistan"
  }
],
 35: [
  {
    question: "Which is the highest mountain lake in the world?",
    options: ["Lake Manas Sarovar, Tibet", "Lake Titicaca, Peru-Bolivia", "Lake Ozong, China", "Lake Dal, India"],
    correct: "Lake Titicaca, Peru-Bolivia"
  },
  {
    question: "Which is the largest hot spring in the world?",
    options: ["Grand Prismatic Spring, United States", "Blue Lagoon, Iceland", "Pamukkale, Turkey", "Chihuahua Spring, Mexico"],
    correct: "Grand Prismatic Spring, United States"
  },
  {
    question: "Where is the largest underground river in the world?",
    options: ["Puerto Princesa River, Philippines", "Nile River, Egypt", "Suranga River, Turkey", "Edmonton River, Canada"],
    correct: "Puerto Princesa River, Philippines"
  },
  {
    question: "Which is the largest protected forest area in the world?",
    options: ["Amazon Rainforest", "Congo Rainforest", "Daing Christmas Forest, Indonesia", "Danum Valley, Malaysia"],
    correct: "Amazon Rainforest"
  },
  {
    question: "What is the oldest theater in the world?",
    options: ["Amphitheater of El Dorado", "Theater of Dionysus, Greece", "Globe Theater, United Kingdom", "La Scala Theater, Italy"],
    correct: "Theater of Dionysus, Greece"
  },
  {
    question: "What is the largest castle in the world?",
    options: ["Hohenzollern Castle, Germany", "Prague Castle, Czech Republic", "Edinburgh Castle, United Kingdom", "Alhambra Castle, Spain"],
    correct: "Prague Castle, Czech Republic"
  },
  {
    question: "What is the largest underground lake in the world?",
    options: ["Lost Sea, United States", "Dragon Lake, China", "Son Dong Lake, Vietnam", "La Goma Lake, Spain"],
    correct: "Lost Sea, United States"
  },
  {
    question: "Where is the 'Taj Mahal' located?",
    options: ["Pakistan", "Bangladesh", "India", "Iran"],
    correct: "India"
  },
  {
    question: "What is the largest underwater cave in the world?",
    options: ["Cenotes del Yucatan, Mexico", "World's Deepest Cave, Russia", "Nereta Cave, Croatia", "Blue Grotto, Italy"],
    correct: "Cenotes del Yucatan, Mexico"
  },
  {
    question: "Which is the world's largest mineral-rich area?",
    options: ["Quebec Mineral Region, Canada", "Karakum Mineral Field, Turkmenistan", "Kimberley Mineral Region, South Africa", "Cerro de Pasco Mineral Region, Peru"],
    correct: "Kimberley Mineral Region, South Africa"
  }
],
 36: [
  {
    question: "Where is the world's largest hanging garden located?",
    options: ["Singapore", "Dubai", "Germany", "United States"],
    correct: "Singapore"
  },
  {
    question: "What is the fastest fish in the world?",
    options: ["Swordfish", "Marlin", "Tuna", "Barracuda"],
    correct: "Marlin"
  },
  {
    question: "Which is the largest lake in the world?",
    options: ["Caspian Lake", "Lake Baikal", "Lake Victoria", "Lake Titicaca"],
    correct: "Caspian Lake"
  },
  {
    question: "Where was the world's largest pearl found?",
    options: ["Philippines", "Australia", "China", "Japan"],
    correct: "Philippines"
  },
  {
    question: "Where is the world's largest ice sheet?",
    options: ["Greenland", "Antarctica", "Iceland", "Siberia"],
    correct: "Antarctica"
  },
  {
    question: "Which is the busiest railway station in the world?",
    options: ["Shinjuku Station, Japan", "New York Penn Station", "Kiev Passenger Station", "London Waterloo Station"],
    correct: "Shinjuku Station, Japan"
  },
  {
    question: "In which country is the largest rose garden in the world located?",
    options: ["United Kingdom", "India", "Bulgaria", "France"],
    correct: "Bulgaria"
  },
  {
    question: "In which country are the most volcanoes in the world?",
    options: ["Indonesia", "Japan", "Philippines", "United States"],
    correct: "Indonesia"
  },
  {
    question: "Which is the tallest dam in the world?",
    options: ["Nurek Dam, Tajikistan", "Rogun Dam, Tajikistan", "Three Gorges Dam, China", "Grand Coulee Dam, United States"],
    correct: "Nurek Dam, Tajikistan"
  },
  {
    question: "Which is the largest maze in the world?",
    options: ["Pine Barrens Labyrinth, United States", "Longlet Hedge Maze, United Kingdom", "Piet Hengen Maze, Netherlands", "Pazlovsky Labyrinth, Russia"],
    correct: "Longlet Hedge Maze, United Kingdom"
  }
],
 37: [
  {
    question: "Which is the largest ocean current in the world?",
    options: ["Gulf Stream", "Kuroshio Current", "Equatorial Current", "Benguela Current"],
    answer: "Gulf Stream"
  },
  {
    question: "Which country preserves the most forest land?",
    options: ["Brazil", "Russia", "Canada", "Indonesia"],
    answer: "Russia"
  },
  {
    question: "Which is the largest natural lake in the world?",
    options: ["Caspian Lake", "Lake Baikal", "Lake Victoria", "Lake Titicaca"],
    answer: "Caspian Lake"
  },
  {
    question: "Which country is called the 'Grand Canyon of Asia'?",
    options: ["China", "India", "Mongolia", "Kazakhstan"],
    answer: "China"
  },
  {
    question: "Where is the world's largest natural flower field located?",
    options: ["Ukraine", "Netherlands", "Japan", "China"],
    answer: "Netherlands"
  },
  {
    question: "Which is the coldest city in the world?",
    options: ["Norilsk, Russia", "Yakutsk, Russia", "Reykjavik, Iceland", "Helsinki, Finland"],
    answer: "Yakutsk, Russia"
  },
  {
    question: "Which is the largest stadium in the world?",
    options: ["Rungrado Maiden Stadium", "Camp Nou", "Maracana Stadium", "Wembley Stadium"],
    answer: "Rungrado Maiden Stadium"
  },
  {
    question: "Which is the largest airport in the world?",
    options: ["King Fahd International Airport", "Istanbul Airport", "Hong Kong International Airport", "Atlanta International Airport"],
    answer: "King Fahd International Airport"
  },
  {
    question: "Which is the largest zoo in the world?",
    options: ["Bronx Zoo", "Berlin Zoo", "Kruger National Park", "San Diego Zoo"],
    answer: "Bronx Zoo"
  },
  {
    question: "Where is the largest ice sheet in the world located?",
    options: ["Greenland", "Antarctica", "Iceland", "Siberia"],
    answer: "Antarctica"
  }
  ],
 38: [  
   {
    question: "Which is the largest train station in the world?",
    options: ["Grand Central Terminal, New York", "Kiev Passenger Station", "Tokyo Station", "Berlin Hauptbahnhof"],
    answer: "Grand Central Terminal, New York"
  },
  {
    question: "Which is the largest mountain range in the world?",
    options: ["Andes Mountains", "Himalayas", "Rocky Mountains", "Alpine Range"],
    answer: "Himalayas"
  },
  {
    question: "Which is the largest cave in the world?",
    options: ["Son Dong Cave, Vietnam", "Mammoth Cave, United States", "Krubera Cave, Georgia", "Lichuga Cave, United States"],
    answer: "Son Dong Cave, Vietnam"
  },
  {
    question: "Which is the largest artificial lake in the world?",
    options: ["Lake Volta", "Aswan Reservoir", "Kariba Reservoir", "Manico Pond Reservoir"],
    answer: "Lake Volta"
  },
  {
    question: "Which is the highest dam in the world?",
    options: ["Nurek Dam, Tajikistan", "Ragun Dam, Tajikistan", "Three Gorges Dam, China", "Grand Coulee Dam, United States"],
    answer: "Nurek Dam, Tajikistan"
  },
  {
    question: "Which is the largest radio telescope in the world?",
    options: ["FAST Telescope, China", "Arecibo Telescope, Puerto Rico", "Parks Telescope, Australia", "Green Bank Telescope, United States"],
    answer: "FAST Telescope, China"
  },
  {
    question: "In which country is the world's largest rose garden located?",
    options: ["United Kingdom", "India", "Bulgaria", "France"],
    answer: "Bulgaria"
  },
  {
    question: "Which is the world's largest maze?",
    options: ["Pine Barrens Labyrinth, United States", "Longlet Hedge Maze, United Kingdom", "Piet Hengen Maze, Netherlands", "Pazlovsky Labyrinth, Russia"],
    answer: "Longlet Hedge Maze, United Kingdom"
  },
  {
    question: "In which country are the most volcanoes in the world?",
    options: ["Indonesia", "Japan", "Philippines", "United States"],
    answer: "Indonesia"
  },
  {
    question: "Which is the largest delta in the world?",
    options: ["Ganges-Brahmaputra Delta", "Mekong Delta", "Nile Delta", "Amazon Delta"],
    answer: "Ganges-Brahmaputra Delta"
  }
],
 39: [
  {
    question: "Where is the longest river in the world?",
    options: ["Amazon, South America", "Nile, Africa", "Yangtze, China", "Mississippi, United States"],
    correctAnswer: "Nile, Africa"
  },
  {
    question: "Which is the most populous island in the world?",
    options: ["Java, Indonesia", "Honshu, Japan", "Luzon, Philippines", "Britain, United Kingdom"],
    correctAnswer: "Java, Indonesia"
  },
  {
    question: "Which is the largest island in the world?",
    options: ["Greenland", "Madagascar", "Sri Lanka", "Indonesia"],
    correctAnswer: "Greenland"
  },
  {
    question: "Which is the largest artificial lake in the world?",
    options: ["Lake Volta", "Aswan Reservoir", "Kariba Reservoir", "Maniko Pond Reservoir"],
    correctAnswer: "Lake Volta"
  },
  {
    question: "Which is the highest dam in the world?",
    options: ["Nurek Dam, Tajikistan", "Ragun Dam, Tajikistan", "Three Gorges Dam, China", "Grand Coulee Dam, United States"],
    correctAnswer: "Nurek Dam, Tajikistan"
  },
  {
    question: "Which is the most populous city in the world?",
    options: ["Tokyo", "New York", "Shanghai", "Mexico City"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Where is 'Stonehenge' located?",
    options: ["United Kingdom", "France", "United States", "Germany"],
    correctAnswer: "United Kingdom"
  },
  {
    question: "Where is the world's largest ice sheet located?",
    options: ["Greenland", "Antarctica", "Iceland", "Siberia"],
    correctAnswer: "Antarctica"
  },
  {
    question: "How long is the 'Great Wall of China'?",
    options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
    correctAnswer: "8,850 km"
  },
  {
    question: "Which is the largest desert in the world?",
    options: ["Sahara", "Kalahari", "Atacama", "Gobi"],
    correctAnswer: "Sahara"
  }
],
 40: [
  {
    question: "Which is the largest stadium in the world?",
    options: ["Rungrado Maiden Stadium", "Camp Nou", "Maracana Stadium", "Wembley Stadium"],
    correctAnswer: "Rungrado Maiden Stadium"
  },
  {
    question: "Which is the largest airport in the world?",
    options: ["King Fahd International Airport", "Istanbul Airport", "Hong Kong International Airport", "Atlanta International Airport"],
    correctAnswer: "King Fahd International Airport"
  },
  {
    question: "Which is the largest peninsula in the world?",
    options: ["Arabian Peninsula", "Malay Peninsula", "Alaska Peninsula", "Korean Peninsula"],
    correctAnswer: "Arabian Peninsula"
  },
  {
    question: "Which is the largest lake in the world?",
    options: ["Caspian Lake", "Lake Baikal", "Lake Victoria", "Lake Titicaca"],
    correctAnswer: "Caspian Lake"
  },
  {
    question: "Which is the least populated country in the world?",
    options: ["Vatican City", "Nauru", "Monaco", "Tuvalu"],
    correctAnswer: "Vatican City"
  },
  {
    question: "Which is the largest train station in the world?",
    options: ["Grand Central Terminal, New York", "Kiev Passenger Station", "Tokyo Station", "Berlin Hauptbahnhof"],
    correctAnswer: "Grand Central Terminal, New York"
  },
  {
    question: "Which is the largest mountain range in the world?",
    options: ["Andes Mountains", "Himalayas", "Rocky Mountains", "Alpine Range"],
    correctAnswer: "Himalayas"
  },
  {
    question: "Which is the largest zoo in the world?",
    options: ["Bronx Zoo", "Berlin Zoo", "Kruger National Park", "San Diego Zoo"],
    correctAnswer: "Bronx Zoo"
  },
  {
    question: "Where is the world's largest natural flower field located?",
    options: ["Ukraine", "Netherlands", "Japan", "China"],
    correctAnswer: "Netherlands"
  },
  {
    question: "Which is the largest waterfall in the world?",
    options: ["Niagara Falls", "Victoria Falls", "Iguazu Falls", "Angel Falls"],
    correctAnswer: "Angel Falls"
  }
],
 41: [
  {
    question: "Which country has the most real volcanoes?",
    options: ["Indonesia", "United States", "Japan", "Italy"],
    answer: "Indonesia"
  },
  {
    question: "What is the longest wooden bridge in the world?",
    options: ["U Bein Bridge, Myanmar", "Qianjin Bridge, China", "Garden Route Bridge, South Africa", "Tokyo Bay Bridge, Japan"],
    answer: "U Bein Bridge, Myanmar"
  },
  {
    question: "What is the deepest lake in the world?",
    options: ["Lake Baikal", "Lake Titicaca", "Caspian Lake", "Lake Victoria"],
    answer: "Lake Baikal"
  },
  {
    question: "Where is the world's largest underwater cave located?",
    options: ["Blue Grotto, Italy", "Neretva Cave, Croatia", "Cenotes del Yucatan, Mexico", "World's Deepest Cave, Russia"],
    answer: "Cenotes del Yucatan, Mexico"
  },
  {
    question: "Which country produces the most copper?",
    options: ["Chile", "United States", "China", "Peru"],
    answer: "Chile"
  },
  {
    question: "Which is the world's highest suspension bridge?",
    options: ["Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan", "Panjiang Grand Bridge, China", "Hong Kong-Zhuhai-Macau Bridge"],
    answer: "Panjiang Grand Bridge, China"
  },
  {
    question: "Which country was under dictatorial rule for the longest time?",
    options: ["North Korea", "Cuba", "Libya", "Soviet Union"],
    answer: "North Korea"
  },
  {
    question: "Which is the largest scientific research center in the world?",
    options: ["NASA, United States", "CERN, Switzerland", "MIT, United States", "Moscow Scientific Research Center"],
    answer: "CERN, Switzerland"
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: ["Andes Mountains", "Rocky Mountains", "Alpine Range", "Tian Shan"],
    answer: "Andes Mountains"
  },
  {
    question: "In which country is 'Machu Picchu' located?",
    options: ["Mexico", "Peru", "Brazil", "Argentina"],
    answer: "Peru"
  }
  ],
 42: [
  {
    question: "Which country produces the most platinum?",
    options: ["Russia", "South Africa", "Canada", "United States"],
    answer: "South Africa"
  },
  {
    question: "Which is the longest bridge in the world?",
    options: ["Danyang-Kunshan Grand Bridge, China", "Pontchartrain Bridge, United States", "Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan"],
    answer: "Danyang-Kunshan Grand Bridge, China"
  },
  {
    question: "Which country has the most tourist attractions in the world?",
    options: ["United States", "France", "Italy", "China"],
    answer: "France"
  },
  {
    question: "In which country is the 'Burj Al Arab' located?",
    options: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Turkey"],
    answer: "United Arab Emirates"
  },
  {
    question: "In which year was the 'Eiffel Tower' built?",
    options: ["1887", "1889", "1895", "1900"],
    answer: "1889"
  },
  {
    question: "Which is the largest delta in the world?",
    options: ["Ganges-Brahmaputra Delta", "Mekong Delta", "Nile River Delta", "Amazon Delta"],
    answer: "Ganges-Brahmaputra Delta"
  },
  {
    question: "Which country is called the 'Grand Canyon of Asia'?",
    options: ["China", "India", "Mongolia", "Kazakhstan"],
    answer: "China"
  },
  {
    question: "Which is the highest bridge in the world?",
    options: ["Millau Viaduct, France", "Akashi Kaikyo Bridge, Japan", "Panjiang Grand Bridge, China", "Hong Kong-Zhuhai-Macau Bridge"],
    answer: "Panjiang Grand Bridge, China"
  },
  {
    question: "Which is the largest hot spring in the world?",
    options: ["Grand Prismatic Spring, United States", "Blue Lagoon, Iceland", "Pamukkale, Turkey", "Chihuahua Spring, Mexico"],
    answer: "Grand Prismatic Spring, United States"
  },
  {
    question: "Where is the world's largest underwater cave located?",
    options: ["Blue Grotto, Italy", "Neretva Cave, Croatia", "Cenotes del Yucatan, Mexico", "World's Deepest Cave, Russia"],
    answer: "Cenotes del Yucatan, Mexico"
  }
],
 43: [
  {
    question: "Which year did 'World War II' start?",
    options: ["1935", "1939", "1941", "1945"],
    answer: "1939"
  },
  {
    question: "Which year was 'Einstein's Theory of Relativity' published?",
    options: ["1895", "1905", "1915", "1925"],
    answer: "1915"
  },
  {
    question: "Which is the 'closest planet to Earth'?",
    options: ["Mars", "Venus", "Mercury", "Saturn"],
    answer: "Mercury"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Ganges"],
    answer: "Nile"
  },
  {
    question: "Who did 'discover gravity'?",
    options: ["Galileo", "Newton", "Einstein", "Copernicus"],
    answer: "Newton"
  },
  {
    question: "Who was 'the first man on the moon'?",
    options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"],
    answer: "Neil Armstrong"
  },
  {
    question: "When did the 'French Revolution' begin?",
    options: ["1689", "1776", "1789", "1812"],
    answer: "1789"
  },
  {
    question: "Which is the 'highest mountain in the world'?",
    options: ["Kanchenjunga", "Mont Blanc", "Mount Everest", "Kilimanjaro"],
    answer: "Mount Everest"
  },
  {
    question: "Who discovered 'DNA'?",
    options: ["Gregor Mendel", "Francis Crick and James Watson", "Louis Pasteur", "Marie Curie"],
    answer: "Francis Crick and James Watson"
  },
  {
    question: "In which year was the 'American Declaration of Independence' written?",
    options: ["1692", "1776", "1821", "1914"],
    answer: "1776"
  }
  ],
 44: [
    {
    question: "Which is the 'largest planet in the solar system'?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: "Jupiter"
  },
  {
    question: "Who discovered 'radio waves'?",
    options: ["Nikola Tesla", "Heinrich Hertz", "Guglielmo Marconi", "Maxwell"],
    answer: "Heinrich Hertz"
  },
  {
    question: "How long is the 'Great Wall of China'?",
    options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
    answer: "8,850 km"
  },
  {
    question: "On which planet is the 'Curiosity Rover'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "In which year was the 'Magna Carta' signed?",
    options: ["1066", "1215", "1492", "1603"],
    answer: "1215"
  },
  {
    question: "Which is the 'deepest place on Earth'?",
    options: ["Mariana Trench", "Tunga Trench", "Philippine Trench", "Japan Trench"],
    answer: "Mariana Trench"
  },
  {
    question: "Which is the 'largest moon in the solar system'?",
    options: ["Europa", "Titan", "Ganymede", "Callisto"],
    answer: "Ganymede"
  },
  {
    question: "Which was the 'first animal in space'?",
    options: ["Laika (dog)", "Belka and Strelka (dogs)", "Ham (monkey)", "Flicka (cat)"],
    answer: "Laika (dog)"
  },
  {
    question: "Who discovered 'polio vaccine'?",
    options: ["Alexander Fleming", "Louis Pasteur", "Jonas Salk", "Robert Koch"],
    answer: "Jonas Salk"
  },
  {
    question: "What does the 'Hubble Telescope' do?",
    options: ["Taking pictures of space", "Analyzing the surface of the moon", "Examining the weather on Earth", "Analyzing the movement of asteroids"],
    answer: "Taking pictures of space"
  }
],
 45: [
  {
    question: "In what year did 'World War I' start?",
    options: ["1914", "1918", "1939", "1945"],
    answer: "1914"
  },
  {
    question: "In which book was 'Charles Darwin's Theory of Evolution' published?",
    options: ["The Descent of Man", "The Origin of Species", "The New Biology", "The Foundation of Life"],
    answer: "The Origin of Species"
  },
  {
    question: "Which is the 'space agency known for the most space missions'?",
    options: ["NASA", "ESA", "ISRO", "CNSA"],
    answer: "NASA"
  },
  {
    question: "Which is the 'largest ocean in the world'?",
    options: ["Atlantic", "Indian Ocean", "Pacific", "Southern Ocean"],
    answer: "Pacific"
  },
  {
    question: "How many 'Newton's laws of motion'?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    question: "What is the 'Milky Way Galaxy'?",
    options: ["Our solar system", "Our galaxy", "The nearest constellation", "The rings around Jupiter"],
    answer: "Our galaxy"
  },
  {
    question: "In what year was the 'United States Declaration of Independence' made?",
    options: ["1692", "1776", "1821", "1914"],
    answer: "1776"
  },
  {
    question: "Which is the 'largest desert on earth'?",
    options: ["Sahara", "Kalahari", "Atacama", "Gobi"],
    answer: "Sahara"
  },
  {
    question: "Who discovered 'radio waves'?",
    options: ["Nikola Tesla", "Heinrich Hertz", "Guglielmo Marconi", "Maxwell"],
    answer: "Heinrich Hertz"
  },
  {
    question: "Who was the 'first man on the moon'?",
    options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"],
    answer: "Neil Armstrong"
  }
],
 46: [
   {
    question: "Which is the 'largest planet in the solar system'?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: "Jupiter"
  },
  {
    question: "How long is the 'Great Wall of China'?",
    options: ["6,000 km", "8,850 km", "5,700 km", "7,400 km"],
    answer: "8,850 km"
  },
  {
    question: "Which planet is the 'Curiosity Rover' on?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Which is the 'largest moon in the solar system'?",
    options: ["Europa", "Titan", "Ganymede", "Callisto"],
    answer: "Ganymede"
  },
  {
    question: "What does the 'Hubble Telescope' do?",
    options: ["Taking pictures of space", "Analyzing the surface of the moon", "Examining the weather on Earth", "Analyzing the movement of asteroids"],
    answer: "Taking pictures of space"
  },
  {
    question: "In which year was Einstein's Theory of Relativity published?",
    options: ["1895", "1905", "1915", "1925"],
    answer: "1915"
  },
  {
    question: "Who discovered the 'polio vaccine'?",
    options: ["Alexander Fleming", "Louis Pasteur", "Jonas Salk", "Robert Koch"],
    answer: "Jonas Salk"
  },
  {
    question: "Which is the 'deepest place on Earth'?",
    options: ["Mariana Trench", "Tunga Trench", "Philippine Trench", "Japan Trench"],
    answer: "Mariana Trench"
  },
  {
    question: "In which year was the 'Magna Carta' signed?",
    options: ["1066", "1215", "1492", "1603"],
    answer: "1215"
  },
  {
    question: "In which year did the 'Second World War' start?",
    options: ["1935", "1939", "1941", "1945"],
    answer: "1939"
  }
],
 47: [
  {
    question: "Which is the 'first university in the world'?",
    options: ["Oxford University", "Al-Qarawiyyin University", "Nalanda University", "Cambridge University"],
    answer: "Al-Qarawiyyin University"
  },
  {
    question: "Which was the 'first successful satellite in space'?",
    options: ["Apollo 11", "Sputnik 1", "Galileo Satellite", "Voyager 1"],
    answer: "Sputnik 1"
  },
  {
    question: "Which country has the 'largest archipelago in the world'?",
    options: ["Maldives", "Indonesia", "Philippines", "Japan"],
    answer: "Indonesia"
  },
  {
    question: "Who invented the 'electric battery'?",
    options: ["Benjamin Franklin", "Alessandro Volta", "Nikola Tesla", "Thomas Edison"],
    answer: "Alessandro Volta"
  },
  {
    question: "Who was the 'first woman in space'?",
    options: ["Valentina Tereshkova", "Sally Ride", "Peggy Whitson", "Christina Koch"],
    answer: "Valentina Tereshkova"
  },
  {
    question: "Which is the 'largest hot spring in the world'?",
    options: ["Grand Prismatic Spring, United States", "Blue Lagoon, Iceland", "Pamukkale, Turkey", "Chihuahua Spring, Mexico"],
    answer: "Grand Prismatic Spring, United States"
  },
  {
    question: "The 'largest land border in the world' is between which two countries?",
    options: ["India-China", "United States-Canada", "Russia-China", "Brazil-Argentina"],
    answer: "Russia-China"
  },
  {
    question: "In which century did the 'largest industrial revolution in the world' begin?",
    options: ["16th century", "17th century", "18th century", "19th century"],
    answer: "18th century"
  },
  {
    question: "Which is the 'brightest planet in the solar system'?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Venus"
  },
  {
    question: "Which is the 'highest battlefield in the world'?",
    options: ["Siachen Glacier", "Karakoram Pass", "Andes Front", "Himalayan battlefield"],
    answer: "Siachen Glacier"
  },
  ],
 48: [
  {
    question: "What does the word 'biology' mean?",
    options: ["Study of the animal world", "Scientific study of life", "Cellular function", "Analysis of plant growth"],
    answer: "Scientific study of life"
  },
  {
    question: "Which is the 'largest Chinese temple in the world'?",
    options: ["Sha Lin Temple", "Lingyin Temple", "Huain Temple", "Laysan Buddha Temple"],
    answer: "Lingyin Temple"
  },
  {
    question: "How many 'Newton's laws of motion'?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    question: "Which is the 'hottest planet'?",
    options: ["Fri", "Tue", "Thu", "Wed"],
    answer: "Fri"
  },
  {
    question: "Which is the 'largest train station in the world'?",
    options: ["Grand Central Terminal, New York", "Kiev Passenger Station", "Tokyo Station", "Berlin Hauptbahnhof"],
    answer: "Grand Central Terminal, New York"
  },
  {
    question: "Which is the 'deepest cave in the world'?",
    options: ["Krubera Cave", "Son Dong Cave", "Mammoth Cave", "Varonna Cave"],
    answer: "Krubera Cave"
  },
  {
    question: "Which is the 'space agency known for the most space missions'?",
    options: ["NASA", "ESA", "ISRO", "CNSA"],
    answer: "NASA"
  },
  {
    question: "Which is the 'busiest port in the world'?",
    options: ["Shanghai, China", "Singapore", "Dubai", "New York"],
    answer: "Shanghai, China"
  },
  {
    question: "Where is the 'Grand Waterfall' located?",
    options: ["Canada", "Australia", "Norway", "China"],
    answer: "Australia"
  },
  {
    question: "Which is the 'world's largest meteorite'?",
    options: ["Hoba Meteorite", "Willamette Meteorite", "Campo del Cielo Meteorite", "Gibeon Meteorite"],
    answer: "Hoba Meteorite"
  }
],
 49: [
  {
    question: "Where was the world's first printing press created?",
    options: ["France", "China", "Germany", "United Kingdom"],
    answer: "Germany"
  },
  {
    question: "Which is the longest beach in the world?",
    options: ["Cox's Bazar, Bangladesh", "Rio de Janeiro, Brazil", "Nine Mile Beach, Australia", "Miami Beach, USA"],
    answer: "Cox's Bazar, Bangladesh"
  },
  {
    question: "Who was the first man in space?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    answer: "Yuri Gagarin"
  },
  {
    question: "Which is the largest reservoir in the world?",
    options: ["Aswan Reservoir", "Kariba Reservoir", "Volta Reservoir", "Three Gorges Dam Reservoir"],
    answer: "Volta Reservoir"
  },
  {
    question: "Which is the highest volcano in the world?",
    options: ["Mauna Loa", "Ojos del Salado", "Popocatepetl", "Etna"],
    answer: "Ojos del Salado"
  },
  {
    question: "Which is the first successful rover on the surface of the moon?",
    options: ["Lunokhod-1", "Mars Explorer", "Curiosity", "Spirit Rover"],
    answer: "Lunokhod-1"
  },
  {
    question: "The world's largest land border is between which two countries?",
    options: ["India-China", "United States-Canada", "Russia-China", "Brazil-Argentina"],
    answer: "Russia-China"
  },
  {
    question: "Which is the world's highest capital?",
    options: ["La Paz, Bolivia", "Quito, Ecuador", "Kathmandu, Nepal", "Bogota, Colombia"],
    answer: "La Paz, Bolivia"
  },
  {
    question: "Which is the busiest airport in the world?",
    options: ["Atlanta International Airport", "Dubai International Airport", "London Heathrow", "Beijing Capital Airport"],
    answer: "Atlanta International Airport"
  },
  {
    question: "Which is the largest rock cave in the world?",
    options: ["Son Dong Cave", "Mammoth Cave", "Krubera Cave", "Lichuga Cave"],
    answer: "Son Dong Cave"
  },
  ],
 50: [
  {
    question: "What does the word 'biology' mean?",
    options: ["Study of the animal kingdom", "Scientific study of life", "Cellular function", "Analysis of plant growth"],
    answer: "Scientific study of life"
  },
  {
    question: "How many Newton's laws of motion?",
    options: ["2", "3", "4", "5"],
    answer: "3"
  },
  {
    question: "Which is the largest train station in the world?",
    options: ["Grand Central Terminal, New York", "Kiev Passenger Station", "Tokyo Station", "Berlin Hauptbahnhof"],
    answer: "Grand Central Terminal, New York"
  },
  {
    question: "Which is the highest dam in the world?",
    options: ["Nurek Dam, Tajikistan", "Rogun Dam, Tajikistan", "Three Gorges Dam, China", "Grand Coulee Dam, United States"],
    answer: "Nurek Dam, Tajikistan"
  },
  {
    question: "Which is the largest Chinese temple in the world?",
    options: ["Sha Lin Temple", "Lingyin Temple", "Huain Temple", "Laysan Buddha Temple"],
    answer: "Lingyin Temple"
  },
  {
    question: "Which is the deepest cave in the world?",
    options: ["Krubera Cave", "Son Dong Cave", "Mammoth Cave", "Varonna Cave"],
    answer: "Krubera Cave"
  },
  {
    question: "Which is the world's largest meteorite?",
    options: ["Hoba Meteorite", "Willamette Meteorite", "Campo del Cielo Meteorite", "Gibeon Meteorite"],
    answer: "Hoba Meteorite"
  },
  {
    question: "Which is the world's busiest port?",
    options: ["Shanghai, China", "Singapore", "Dubai", "New York"],
    answer: "Shanghai, China"
  },
  {
    question: "Where is the Grand Waterfall located?",
    options: ["Canada", "Australia", "Norway", "China"],
    answer: "Australia"
  },
  {
    question: "Which is the world's tallest transmission tower?",
    options: ["Tokyo Sky Tree", "Shanghai Tower", "Canton Tower", "CN Tower"],
    answer: "Tokyo Sky Tree"
  }
],
};

// ========== HTML ELEMENTS ========== //
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const questionNumberEl = document.getElementById("question-number");
const timerEl = document.getElementById("timer");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const livesDisplay = document.getElementById("livesDisplay"); // NEW

// ========== LOAD QUESTION ========== //
function loadQuestion() {
  resetTimer();
  startTimer();
  updateLivesDisplay(); // NEW

  const questions = allQuestions[currentLevel];
  const current = questions[currentQuestionIndex];

  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestionsPerLevel}`;

  current.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option, current.answer, btn);
    optionsEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

// ========== UPDATE LIVES DISPLAY ========== //
function updateLivesDisplay() {
  livesDisplay.textContent = `Lives: ${lives}/3`;
}

// ========== TIMER ========== //
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `Time: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
}

// ========== HANDLE TIMEOUT ========== //
function handleTimeout() {
  const current = allQuestions[currentLevel][currentQuestionIndex];
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === current.answer) {
      btn.style.backgroundColor = "green";
    }
  });

  wrongSound.play();
  nextBtn.disabled = false;

  lives--; // NEW
  updateLivesDisplay(); // NEW
  checkGameOver(); // NEW
}

// ========== CHECK ANSWER ========== //
function checkAnswer(selected, correct, button) {
  resetTimer();

  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.style.backgroundColor = "green";
    correctSound.play();
    score++;
  } else {
    button.style.backgroundColor = "red";
    wrongSound.play();
    const correctBtn = Array.from(buttons).find(b => b.textContent === correct);
    if (correctBtn) correctBtn.style.backgroundColor = "green";

    lives--; // NEW
    updateLivesDisplay(); // NEW
    checkGameOver(); // NEW
  }

  nextBtn.disabled = false;
}

// ========== CHECK GAME OVER ========== //
function checkGameOver() {
  if (lives <= 0) {
    alert("Game Over, Try again! You ran out of lives.");
    window.location.href = "levels.html";
  }
}

// ========== LOAD NEXT QUESTION ========== //
function loadNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestionsPerLevel) {
    loadQuestion();
  } else {
    endLevel();
  }
}

// ========== END LEVEL & NEXT OPTION ========== //
function endLevel() {
  resetTimer();
  alert(`Level ${currentLevel} Completed!\nYour Score: ${score}/${totalQuestionsPerLevel}`);

  if (currentLevel >= unlockedLevel) {
    localStorage.setItem("unlockedLevel", currentLevel + 1);
  }

  const nextLevel = currentLevel + 1;

  if (allQuestions[nextLevel]) {
    const goNext = confirm(`Do you want to go to Level ${nextLevel}?`);
    if (goNext) {
      currentLevel = nextLevel;
      localStorage.setItem("currentLevel", currentLevel);
      currentQuestionIndex = 0;
      score = 0;
      lives = 3; // NEW: reset lives for next level
      loadQuestion();
    } else {
      window.location.href = "levels.html";
    }
  } else {
    alert("No more levels available!");
    window.location.href = "levels.html";
  }
}

// ========== INITIALIZE QUIZ ========== //
window.onload = () => {
  loadQuestion();
};