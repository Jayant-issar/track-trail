import { useApplicationStore } from "@/stores/applicationStore";
import { useColdOutreachStore } from "@/stores/coldOutreachStore";
import { Application } from "@/types/application";
const {getState:getApplicationState} = useApplicationStore;
const {getState:getColdOutreachState} = useColdOutreachStore;


export function getProgressSummary() {
    const {applications} =  getApplicationState()
    const {coldOutreaches} = getColdOutreachState()

    const interviews = applications.filter((app)=>app.status==="interviewing")
    const accepted = applications.filter((app)=>app.status==="accepted")
    return {

      totalApplications: applications.length,
      coldOutreaches: coldOutreaches.length,
      interviewsScheduled: interviews.length,
      offersReceived: accepted.length,
    };
  }
  

  export function getTopApplications(applications:Application[]):Application[] {
      return applications
      .sort((a,b)=>new Date(b.lastUpdated).getTime()-new Date(a.lastUpdated).getTime()).slice(0,3);
  }
  
  export function getColdOutreachData() {
    return [
      {
        id: 1,
        contactName: "Sarah Miller",
        company: "GrowthTech",
        status: "Responded",
        lastContact: "2024-03-01",
        followUpDate: "2024-03-08"
      },
      {
        id: 2,
        contactName: "James Wilson",
        company: "InnoSoft",
        status: "Pending",
        lastContact: "2024-03-05",
        followUpDate: "2024-03-12"
      },
    ];
  }
  
  export function getSkillMetrics() {
    return {
      dsaProgress: 75,
      systemDesign: 60,
      frontendSkills: 85,
      backendSkills: 70,
      dailyGoals: {
        problemsSolved: 3,
        targetProblems: 5,
      }
    };
  }
  
  export function getUpcomingInterviews() {
    
    const {applications} =  getApplicationState();
    const interviews = applications.filter((app)=> app.status=="interviewing");

    return interviews
  }
  
  export function getInspirationQuote() {
    const quotes = [
      {
        "quote": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs"
      },
      {
        "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        "author": "Albert Schweitzer"
      },
      {
        "quote": "Opportunities don't happen. You create them.",
        "author": "Chris Grosser"
      },
      {
        "quote": "Hard work beats talent when talent doesn’t work hard.",
        "author": "Tim Notke"
      },
      {
        "quote": "Don't watch the clock; do what it does. Keep going.",
        "author": "Sam Levenson"
      },
      {
        "quote": "Quality means doing it right when no one is looking.",
        "author": "Henry Ford"
      },
      {
        "quote": "Success is not just about making money. It’s about making a difference.",
        "author": "Unknown"
      },
      {
        "quote": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt"
      },
      {
        "quote": "Believe you can and you’re halfway there.",
        "author": "Theodore Roosevelt"
      },
      {
        "quote": "Act as if what you do makes a difference. It does.",
        "author": "William James"
      },
      {
        "quote": "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
        "author": "Colin Powell"
      },
      {
        "quote": "You don’t have to be great to start, but you have to start to be great.",
        "author": "Zig Ziglar"
      },
      {
        "quote": "Success is walking from failure to failure with no loss of enthusiasm.",
        "author": "Winston Churchill"
      },
      {
        "quote": "It always seems impossible until it’s done.",
        "author": "Nelson Mandela"
      },
      {
        "quote": "Dreams don’t work unless you do.",
        "author": "John C. Maxwell"
      },
      {
        "quote": "Success usually comes to those who are too busy to be looking for it.",
        "author": "Henry David Thoreau"
      },
      {
        "quote": "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        "author": "Roy T. Bennett"
      },
      {
        "quote": "I never dreamed about success. I worked for it.",
        "author": "Estée Lauder"
      },
      {
        "quote": "You are never too old to set another goal or to dream a new dream.",
        "author": "C.S. Lewis"
      },
      {
        "quote": "If everything seems under control, you’re not going fast enough.",
        "author": "Mario Andretti"
      },
      {
        "quote": "It’s not whether you get knocked down, it’s whether you get up.",
        "author": "Vince Lombardi"
      },
      {
        "quote": "The future depends on what you do today.",
        "author": "Mahatma Gandhi"
      },
      {
        "quote": "Do what you love and the money will follow.",
        "author": "Marsha Sinetar"
      },
      {
        "quote": "I find that the harder I work, the more luck I seem to have.",
        "author": "Thomas Jefferson"
      },
      {
        "quote": "Don’t count the days, make the days count.",
        "author": "Muhammad Ali"
      },
      {
        "quote": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        "author": "Steve Jobs"
      },
      {
        "quote": "The road to success and the road to failure are almost exactly the same.",
        "author": "Colin R. Davis"
      },
      {
        "quote": "You don’t get what you wish for. You get what you work for.",
        "author": "Unknown"
      },
      {
        "quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "author": "Aristotle"
      },
      {
        "quote": "What you do today can improve all your tomorrows.",
        "author": "Ralph Marston"
      },
      {
        "quote": "Either you run the day, or the day runs you.",
        "author": "Jim Rohn"
      },
      {
        "quote": "There is no substitute for hard work.",
        "author": "Thomas Edison"
      },
      {
        "quote": "A goal without a plan is just a wish.",
        "author": "Antoine de Saint-Exupéry"
      },
      {
        "quote": "When we strive to become better than we are, everything around us becomes better too.",
        "author": "Paulo Coelho"
      },
      {
        "quote": "Don’t limit your challenges. Challenge your limits.",
        "author": "Unknown"
      },
      {
        "quote": "Failure is simply the opportunity to begin again, this time more intelligently.",
        "author": "Henry Ford"
      },
      {
        "quote": "If you are not willing to risk the usual, you will have to settle for the ordinary.",
        "author": "Jim Rohn"
      },
      {
        "quote": "Success is liking yourself, liking what you do, and liking how you do it.",
        "author": "Maya Angelou"
      },
      {
        "quote": "Success is getting what you want. Happiness is wanting what you get.",
        "author": "Dale Carnegie"
      },
      {
        "quote": "Hustle in silence and let your success make the noise.",
        "author": "Unknown"
      },
      {
        "quote": "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
        "author": "Marie Forleo"
      },
      {
        "quote": "Effort only fully releases its reward after a person refuses to quit.",
        "author": "Napoleon Hill"
      },
      {
        "quote": "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
        "author": "Earl Nightingale"
      },
      {
        "quote": "The difference between ordinary and extraordinary is that little extra.",
        "author": "Jimmy Johnson"
      },
      {
        "quote": "Success isn’t about the end result, it’s about what you learn along the way.",
        "author": "Vera Wang"
      },
      {
        "quote": "The secret of getting ahead is getting started.",
        "author": "Mark Twain"
      },
      {
        "quote": "Discipline is the bridge between goals and accomplishment.",
        "author": "Jim Rohn"
      }
    ]

    return quotes[Math.floor(Math.random() * quotes.length)];
    
  }