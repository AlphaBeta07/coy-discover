import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CURRENT_USER_ID = "user_me";

export const MOCK_CURRENT_USER = {
  id: CURRENT_USER_ID,
  name: "Aarav Sharma",
  age: 22,
  photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
  bio: "Tech, indie rock, filter coffee, and rooftop sunsets. Building things that matter.",
  cityOrCollege: "BITS Pilani / Bengaluru",
  interests: JSON.stringify(["Indie Music", "Filter Coffee", "Startups", "Badminton", "Film Photography"]),
};

export const MOCK_PROFILES = [
  {
    id: "user_101",
    name: "Priya Sharma",
    age: 21,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Literature major who quotes Dostoevsky in casual conversation. Chai over coffee any day.",
    cityOrCollege: "Lady Shri Ram College, Delhi",
    interests: JSON.stringify(["Reading", "Chai", "Classic Cinema", "Poetry", "Museum Hopping"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_102",
    name: "Ananya Iyer",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Architecture nerd obsessed with art deco buildings and candid photography. Let's find Mumbai's best matcha.",
    cityOrCollege: "KRVIA / Mumbai",
    interests: JSON.stringify(["Architecture", "Street Photography", "Matcha", "Vinyl Records", "Trekking"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_103",
    name: "Rohan Varma",
    age: 23,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Fintech analyst by day, amateur bass guitarist by night. Can cook a mean butter chicken.",
    cityOrCollege: "IIT Delhi",
    interests: JSON.stringify(["Bass Guitar", "Cooking", "Football", "Formula 1", "Podcasts"]),
    preLikesMe: false,
  },
  {
    id: "user_104",
    name: "Tanvi Deshmukh",
    age: 21,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Psychology student exploring cognitive quirks and thrift store gems. Sarcasm is my love language.",
    cityOrCollege: "St. Xavier's College, Mumbai",
    interests: JSON.stringify(["Thrifting", "Psychology", "Indie Rock", "Board Games", "Sunset Walks"]),
    preLikesMe: false,
  },
  {
    id: "user_105",
    name: "Diya Patel",
    age: 22,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Graphic designer living on iced Americanos and Figma shortcuts. Send me your favorite album artwork.",
    cityOrCollege: "NID Ahmedabad",
    interests: JSON.stringify(["Graphic Design", "Typography", "Iced Coffee", "Modern Art", "Ceramics"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_106",
    name: "Kabir Mehta",
    age: 24,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Founder building sustainable packaging. Weekends spent on trails or debating Premier League tactics.",
    cityOrCollege: "IIT Bombay",
    interests: JSON.stringify(["Trail Running", "Arsenal FC", "Sustainability", "Reading", "Coffee"]),
    preLikesMe: false,
  },
  {
    id: "user_107",
    name: "Meera Sen",
    age: 23,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Journalism grad, passionate about investigative storytelling and obscure 70s rock.",
    cityOrCollege: "Ashoka University",
    interests: JSON.stringify(["Journalism", "70s Rock", "Docuseries", "Writing", "Baking"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_108",
    name: "Sneha Nair",
    age: 22,
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    bio: "Biotech researcher discovering new microbes and old bookshops. Also an unironic karaoke champion.",
    cityOrCollege: "IISc Bengaluru",
    interests: JSON.stringify(["Karaoke", "Biotech", "Sci-Fi", "Badminton", "Old Bookstores"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_109",
    name: "Arjun Singhania",
    age: 24,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Lawyer in training. Looking for someone who can hold their own in a debate on pop culture.",
    cityOrCollege: "NLSIU Bengaluru",
    interests: JSON.stringify(["Debate", "Tennis", "Cinema", "Espresso", "Stand-Up Comedy"]),
    preLikesMe: false,
  },
  {
    id: "user_110",
    name: "Kavya Reddy",
    age: 21,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    bio: "Dance enthusiast and AI researcher. Balancing Bharatanatyam mudras with neural network gradients.",
    cityOrCollege: "IIIT Hyderabad",
    interests: JSON.stringify(["Dance", "Deep Learning", "Filter Coffee", "Dogs", "Acoustic Guitar"]),
    preLikesMe: false,
  },
  {
    id: "user_111",
    name: "Ishaan Kapoor",
    age: 23,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Documentary filmmaker. Currently making a film on India's indie coffee culture.",
    cityOrCollege: "FTII Pune",
    interests: JSON.stringify(["Filmmaking", "Specialty Coffee", "Cycling", "Vinyls", "Travel"]),
    preLikesMe: false,
  },
  {
    id: "user_112",
    name: "Tara Mukherjee",
    age: 22,
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    bio: "Economics graduate who over-analyzes cafe aesthetics. Big fan of sunset picnics and fleamarkets.",
    cityOrCollege: "Presidency University, Kolkata",
    interests: JSON.stringify(["Economics", "Picnics", "Fleamarkets", "Indie Pop", "Crochet"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_113",
    name: "Aditya Rao",
    age: 22,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Mechanical engineer building electric go-karts. Always down for late night drives and street food.",
    cityOrCollege: "Manipal Institute of Technology",
    interests: JSON.stringify(["Motorsport", "Night Drives", "Street Food", "Rock Climbing", "Gaming"]),
    preLikesMe: false,
  },
  {
    id: "user_114",
    name: "Riya Kapoor",
    age: 21,
    photo: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80",
    bio: "Fashion styling and visual merchandising. If your outfit has pockets, we're already friends.",
    cityOrCollege: "NIFT Delhi",
    interests: JSON.stringify(["Fashion", "Vintage Clothes", "Pottery", "R&B", "Sushi"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_115",
    name: "Zoya Khan",
    age: 23,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Urban planner on a mission to make cities walkable. Loves jazz, rooftop gardening, and good sourdough.",
    cityOrCollege: "CEPT University, Ahmedabad",
    interests: JSON.stringify(["Urbanism", "Jazz", "Gardening", "Baking", "Cycling"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_116",
    name: "Vikramaditya Roy",
    age: 24,
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    bio: "Product manager who plays keyboard in an amateur jazz quartet. Tell me your top 3 songs of all time.",
    cityOrCollege: "IIT Kharagpur",
    interests: JSON.stringify(["Keyboard", "Jazz", "Product Design", "Swimming", "Chess"]),
    preLikesMe: false,
  },
  {
    id: "user_117",
    name: "Shreya Joshi",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Zoology student fascinated by bird calls and ecology. Will stop to pet every stray dog on the street.",
    cityOrCollege: "Fergusson College, Pune",
    interests: JSON.stringify(["Wildlife", "Birding", "Trekking", "Dogs", "Watercolor"]),
    preLikesMe: false,
  },
  {
    id: "user_118",
    name: "Devansh Nanda",
    age: 23,
    photo: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=800&q=80",
    bio: "Aerospace engineer dreaming of Mars rovers. I make killer pour-overs and bad science jokes.",
    cityOrCollege: "IIT Madras",
    interests: JSON.stringify(["Space Exploration", "Pour-over Coffee", "Physics", "Sci-Fi", "Guitar"]),
    preLikesMe: false,
  },
  {
    id: "user_119",
    name: "Pooja Hegde",
    age: 21,
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Media & communication student. Always listening to podcasts on 1.5x speed. Obsessed with stationery.",
    cityOrCollege: "Christ University, Bengaluru",
    interests: JSON.stringify(["Podcasts", "Stationery", "Pop Culture", "Photography", "Running"]),
    preLikesMe: false,
  },
  {
    id: "user_120",
    name: "Nikhil Chawla",
    age: 24,
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    bio: "Data scientist working on climate models. In search of the city's finest ramen bowl.",
    cityOrCollege: "Delhi School of Economics",
    interests: JSON.stringify(["Ramen", "Climate Tech", "Running", "Synthwave", "Chess"]),
    preLikesMe: false,
  },
  {
    id: "user_121",
    name: "Bhavna Bhatt",
    age: 22,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    bio: "Classical violinist venturing into electronic fusion. Tea enthusiast, vintage poster collector.",
    cityOrCollege: "KM Music Conservatory, Chennai",
    interests: JSON.stringify(["Violin", "Electronic Music", "Tea Tasting", "Vintage Art", "Yoga"]),
    preLikesMe: false,
  },
  {
    id: "user_122",
    name: "Siddharth Menon",
    age: 23,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    bio: "UX researcher who loves understanding human irrationality. Host of legendary game nights.",
    cityOrCollege: "National Institute of Design, Bengaluru",
    interests: JSON.stringify(["Board Games", "UX Design", "Cooking", "Catan", "Indie Games"]),
    preLikesMe: false,
  },
  {
    id: "user_123",
    name: "Aparna Bose",
    age: 22,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    bio: "Comparative literature scholar. I believe monsoon rain in Kolkata solves almost everything.",
    cityOrCollege: "Jadavpur University, Kolkata",
    interests: JSON.stringify(["Literature", "Monsoon", "Bengali Sweets", "Film Studies", "Painting"]),
    preLikesMe: false,
  },
  {
    id: "user_124",
    name: "Karan Malhotra",
    age: 24,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "Culinary arts student exploring modern Indian pastry. Warning: might send unannounced desserts.",
    cityOrCollege: "Welcomgroup Graduate School, Manipal",
    interests: JSON.stringify(["Baking", "Pastry Art", "Food Styling", "Travel", "Hip Hop"]),
    preLikesMe: false,
  },
  {
    id: "user_125",
    name: "Natasha D'Souza",
    age: 21,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    bio: "Marine biology student and certified scuba diver. Happiness is 20 meters underwater with mantas.",
    cityOrCollege: "Goa University",
    interests: JSON.stringify(["Scuba Diving", "Ocean Conservation", "Surfing", "Ukulele", "Sunsets"]),
    preLikesMe: true, // Seeded to have liked user_me
  },
  {
    id: "user_126",
    name: "Varun Bajaj",
    age: 23,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "Strategy consultant who decompresses through bouldering and making playlists for every mood.",
    cityOrCollege: "SRCC Delhi",
    interests: JSON.stringify(["Bouldering", "Playlists", "Economics", "Formula 1", "Cocktails"]),
    preLikesMe: false,
  },
  {
    id: "user_127",
    name: "Isha Sundaram",
    age: 22,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    bio: "Heritage conservationist saving historic havelis and colonial facades. Enjoys vintage trams.",
    cityOrCollege: "SPA New Delhi",
    interests: JSON.stringify(["Heritage", "Architecture", "Sketching", "Filter Kaapi", "Heritage Walks"]),
    preLikesMe: false,
  },
  {
    id: "user_128",
    name: "Yashvardhan Kulkarni",
    age: 24,
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    bio: "Robotics engineer building robotic grippers. Also an aspiring marathoner (slowly but surely).",
    cityOrCollege: "COEP Pune",
    interests: JSON.stringify(["Robotics", "Marathon Training", "Anime", "Woodworking", "Coffee"]),
    preLikesMe: false,
  },
  {
    id: "user_129",
    name: "Mallika Sen",
    age: 21,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    bio: "Animation artist crafting whimsical 2D loops. Obsessed with Studio Ghibli and matcha ice cream.",
    cityOrCollege: "Srishti Institute of Art, Bengaluru",
    interests: JSON.stringify(["Animation", "Studio Ghibli", "Matcha", "Illustration", "Cats"]),
    preLikesMe: false,
  },
  {
    id: "user_130",
    name: "Abhinav Ganguly",
    age: 23,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "Astrophysics student peering into dark matter. Let's head out of town for stargazing.",
    cityOrCollege: "IUCAA Pune",
    interests: JSON.stringify(["Astronomy", "Stargazing", "Physics", "Camping", "Pink Floyd"]),
    preLikesMe: false,
  },
  {
    id: "user_131",
    name: "Simran Kaur",
    age: 22,
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    bio: "Content strategist who collects old stamps and writes personal essays. Always searching for the best chaat.",
    cityOrCollege: "Panjab University, Chandigarh",
    interests: JSON.stringify(["Writing", "Chaat", "Vintage Stamps", "Photography", "Road Trips"]),
    preLikesMe: false,
  },
  {
    id: "user_132",
    name: "Pranav Pillai",
    age: 24,
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "Sound designer for indie video games. Lover of ambient synths, rain sounds, and spicy food.",
    cityOrCollege: "National Institute of Design, Ahmedabad",
    interests: JSON.stringify(["Sound Design", "Indie Games", "Ambient Music", "Synthesizers", "Cooking"]),
    preLikesMe: false,
  },
];

export async function seedDatabase() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.match.deleteMany({});
  await prisma.swipe.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed current user
  await prisma.user.create({
    data: MOCK_CURRENT_USER,
  });
  console.log(`Created logged-in user: ${MOCK_CURRENT_USER.name} (${MOCK_CURRENT_USER.id})`);

  // Seed 32 mock profiles
  for (const profile of MOCK_PROFILES) {
    const { preLikesMe, ...userData } = profile;
    await prisma.user.create({
      data: userData,
    });

    // If preLikesMe is true, record an incoming like from profile -> user_me
    if (preLikesMe) {
      await prisma.swipe.create({
        data: {
          swiperId: profile.id,
          swipedId: CURRENT_USER_ID,
          action: "like",
        },
      });
      console.log(`  -> Profile ${profile.name} (${profile.id}) has pre-liked ${CURRENT_USER_ID}`);
    }
  }

  console.log(`Seeded ${MOCK_PROFILES.length} profiles successfully.`);
  console.log("Database seed complete.");
}

if (require.main === module) {
  seedDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
