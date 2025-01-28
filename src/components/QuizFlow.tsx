"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, ThermometerSnowflake, Activity, Send, MapPin, ClipboardCheck, Users, Icon, Instagram} from 'lucide-react';

type LucideIcon = typeof Flame | typeof ThermometerSnowflake | typeof Activity;


// Type definitions
type AreaName = 'north' | 'south' | 'east' | 'west' | 'central';
type CategoryName = 'burningUp' | 'simmerDown' | 'iceCold';
type ProfileName = 
  | "Hell's Kitchener"
  | "WFH MultiPlugger"
  | "Graveyard Shift Charger"
  | "Karang Guni Royalty"
  | "Taobao Bargain Hunter"
  | "Homefluencer"
  | "Pineapple Roller"
  | "Community Kampung Hero"
  | "Demure & Mindful"
  | "Family Guy";

interface AreaInfo {
  common_fires: string[];
  emergency_number: string;
  fire_station: string;
}

interface ProfileCategory {
  title: string;
  description: string;
  color: string;
  bgColor: string;
  profiles: ProfileName[];
  icon: LucideIcon;
}

interface QuizOption {
  text: string;
  area?: AreaName;
  profile?: string;
  category: CategoryName;
}

interface Question {
  question: string;
  options: QuizOption[];
}

interface Profile {
  category: CategoryName;
  profile: ProfileName;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
}

// Add area-specific fire information
const areaFireInfo: Record<AreaName, AreaInfo> = {
    north: {
      common_fires: [
        "Kitchen fires from unattended cooking",
        "Electrical fires from charging PMDs",
        "Discarded items in common corridors"
      ],
      emergency_number: "995",
      fire_station: "Yishun Fire Station"
    },
    south: {
      common_fires: [
        "Electrical fires in older apartments",
        "Rubbish chute fires",
        "Cooking fires in dense housing areas"
      ],
      emergency_number: "995",
      fire_station: "Alexandra Fire Station"
    },
    east: {
      common_fires: [
        "PMD-related fires",
        "Kitchen fires in HDB flats",
        "Electrical fires from air-conditioning"
      ],
      emergency_number: "995",
      fire_station: "Tampines Fire Station"
    },
    west: {
      common_fires: [
        "PMD charging fires",
        "Kitchen fires from unattended cooking",
        "Incense-related fires"
      ],
      emergency_number: "995",
      fire_station: "Jurong Fire Station"
    },
    central: {
      common_fires: [
        "Kitchen fires in high-rise buildings",
        "Electrical fires from overloaded sockets",
        "Rubbish chute fires"
      ],
      emergency_number: "995",
      fire_station: "Central Fire Station"
    }
  };

const profileCategories : Record<CategoryName, ProfileCategory> = {
    burningUp: {
      title: "BURNIN' UP 🔥",
      description: "You're actively creating fire hazards at home!",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-600",
      profiles: ["Hell's Kitchener", "WFH MultiPlugger", "Graveyard Shift Charger", "Karang Guni Royalty", "Taobao Bargain Hunter"],
      icon: Flame
    },
    simmerDown: {
      title: "SIMMER DOWN! 📸",
      description: "Not actively creating hazards, but could be more fire-safe!",
      color: "from-yellow-400 to-amber-500",
      bgColor: "bg-amber-500",
      profiles: ["Homefluencer", "Pineapple Roller"],
      icon: Activity
    },
    iceCold: {
      title: "ICE COLD COOL! ❄️",
      description: "Actively managing and mitigating fire risks!",
      color: "from-blue-400 to-teal-500",
      bgColor: "bg-blue-500",
      profiles: ["Community Kampung Hero", "Demure & Mindful"],
      icon: ThermometerSnowflake
    }
  };
  

  const questions : Question[] = [
    {
        question: "Which area do you stay in?",
        options: [
          { text: "North (Woodlands, Yishun, Sembawang)", area: "north", category: "simmerDown" },
          { text: "South (Alexandra, Bukit Merah, Telok Blangah)", area: "south", category: "simmerDown" },
          { text: "East (Tampines, Pasir Ris, Bedok)", area: "east", category: "simmerDown" },
          { text: "West (Jurong, Clementi, Bukit Batok)", area: "west", category: "simmerDown" },
          { text: "Central (Toa Payoh, Bishan, Ang Mo Kio)", area: "central", category: "simmerDown" }
        ]
      },
    {
      question: "Your morning routine includes...",
      options: [
        { text: "Unplugging everything I charged overnight", profile: "Graveyard Shift Charger", category: "burningUp" },
        { text: "Rushing to get family ready for the day", profile: "Family Guy", category: "simmerDown" },
        { text: "Hot cup of coffee from my home cafe", profile: "Homefluencer", category: "simmerDown" },
        { text: "Safety checks before leaving", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" }
      ]
    },
    {
      question: "Your charging situation is best described as...",
      options: [
        { text: "Everything charges while I sleep", profile: "Graveyard Shift Charger", category: "burningUp" },
        { text: "A collection of multiplugs", profile: "WFH Multi Plugger", category: "burningUp" },
        { text: "Neatly organized with safety checks", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Hidden cables for a clean look", profile: "Homefluencer, Pineapple Roller", category: "simmerDown" }
      ]
    },
    {
      question: "While waiting for your food to cook, you usually...",
      options: [
        { text: "Catch up on some work or get some entertainment in", profile: "Hell's Kitchener", category: "burningUp" },
        { text: "Stay in the kitchen", profile: "Community Kampong Hero, Demure & Mindful, Pineapple Roller", category: "iceCold" },
        { text: "Make sure the family is OK", profile: "Family Guy", category: "simmerDown" }
      ]
    },
    {
      question: "Your social media algorithm mainly shows you...",
      options: [
        { text: "DIY home hacks and cheap finds", profile: "Taobao Bargain Hunter", category: "burningUp" },
        { text: "Aesthetic room tours and organization", profile: "Homefluencer", category: "simmerDown" },
        { text: "Baby-proofing and elderly care tips", profile: "Family Guy", category: "iceCold" }
      ]
    },
    {
      question: "That empty corner in your house is perfect for...",
      options: [
        { text: "My growing collection of useful stuff", profile: "Garang Guni Royalty", category: "burningUp" },
        { text: "Creating more vibes for the home", profile: "Homefluencer", category: "simmerDown" },
        { text: "More storage space", profile: "Family Guy, Pineapple Roller", category: "simmerDown" },
        { text: "Nothing - it's my emergency exit route", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" }
      ]
    },
    {
      question: "Your ideal home improvement would be...",
      options: [
        { text: "More storage solutions", profile: "Garang Guni Royalty", category: "burningUp" },
        { text: "Smart home everything!", profile: "WFH Multi Plugger", category: "burningUp" },
        { text: "A larger kitchen for me to cook up a storm", profile: "Hell's Kitchener", category: "burningUp" },
        { text: "A good old smoking corner", profile: "Hell's Kitchener", category: "burningUp" }
      ]
    },
    {
      question: "When renovating your kitchen...",
      options: [
        { text: "Showed my interior designer my Pinterest moodboard", profile: "Homefluencer", category: "simmerDown" },
        { text: "The more stoves and the more counterspace the better!", profile: "Hell's Kitchener", category: "burningUp" },
        { text: "Maximise power points for appliances", profile: "WFH Multi Plugger", category: "burningUp" },
        { text: "Let my interior designer lead the way", profile: "Pineapple Roller", category: "simmerDown" }
      ]
    },
    {
      question: "You're browsing online when you see a viral product. You...",
      options: [
        { text: "Check if there's a cheaper dupe", profile: "Taobao Bargain Hunter", category: "burningUp" },
        { text: "Add to cart if it fits the aesthetic", profile: "Homefluencer", category: "simmerDown" },
        { text: "See if it is safe for the family", profile: "Family Guy", category: "iceCold" }
      ]
    },
    {
      question: "During your last home gathering...",
      options: [
        { text: "Kept the hotpot going while playing games", profile: "Hell's Kitchener", category: "burningUp" },
        { text: "Created perfect mood lighting with candles for my house tour", profile: "Homefluencer", category: "burningUp" }
      ]
    },
    {
      question: "When receiving deliveries...",
      options: [
        { text: "Unbox immediately and clear away the clutter", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Add to the collection pile", profile: "Garang Guni Royalty", category: "burningUp" },
        { text: "Leave it in the riser till I get home", profile: "Taobao Bargain Hunter", category: "simmerDown" },
        { text: "Accept whatever arrives", profile: "Pineapple Roller", category: "simmerDown" }
      ]
    },
    {
      question: "During estate emergencies, you...",
      options: [
        { text: "Know where all emergency equipment is", profile: "Community Kampong Hero", category: "iceCold" },
        { text: "Go down and take a look", profile: "Pineapple Roller", category: "simmerDown" },
        { text: "Too busy with work to notice", profile: "WFH Multi Plugger, Hell's Kitchener", category: "burningUp" }
      ]
    },
    {
      question: "Where's your fire extinguisher?",
      options: [
        { text: "By the kitchen entrance, everyone knows", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Tucked away somewhere", profile: "Garang Guni Royalty, Homefluencer", category: "burningUp" },
        { text: "It came with the house right?", profile: "Pineapple Roller", category: "burningUp" },
        { text: "I don't need one.", profile: "", category: "burningUp" }
      ]
    },
    {
      question: "The smoke detector in your home is...",
      options: [
        { text: "In every room and tested regularly", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Hidden away because it ruins the aesthetic", profile: "Homefluencer", category: "burningUp" },
        { text: "Came with the house, not sure if it works", profile: "Pineapple Roller", category: "burningUp" },
        { text: "We have one...?", profile: "Pineapple Roller", category: "burningUp" }
      ]
    },
    {
      question: "When buying electrical items...",
      options: [
        { text: "Cheapest option available", profile: "Taobao Bargain Hunter", category: "burningUp" },
        { text: "Safety-certified products only", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Whatever looks good online", profile: "Homefluencer, Pineapple Roller", category: "burningUp" }
      ]
    },
    {
      question: "When there's a power trip...",
      options: [
        { text: "Know exactly which switch to check", profile: "Community Kampong Hero, Demure & Mindful", category: "iceCold" },
        { text: "Panic about devices charging", profile: "Graveyard Shift Charger, WFH Multi Plugger", category: "burningUp" },
        { text: "Call my parents or someone for help", profile: "Pineapple Roller", category: "simmerDown" }
      ]
    }
  // Add more questions here
];

const QuizFlow: React.FC = () => {
    type ScreenType = 'intro' | 'quiz' | 'profile';
    type SlideDirection = 'slide-left' | 'slide-left-exit';
  
    const [screen, setScreen] = useState<ScreenType>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<QuizOption[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [progress, setProgress] = useState(0);
    const [slideDirection, setSlideDirection] = useState<SlideDirection>('slide-left');
    const [userArea, setUserArea] = useState<AreaName | null>(null);
  
    useEffect(() => {
      if (questions.length > 0) {
        setProgress((currentQuestion / questions.length) * 100);
      }
    }, [currentQuestion]);
  
    const handleAnswer = (option: QuizOption): void => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
  
      if (currentQuestion === 0 && option.area) {
        setUserArea(option.area);
      }
  
      if (currentQuestion + 1 < questions.length) {
        setSlideDirection('slide-left');
        setTimeout(() => {
          setCurrentQuestion(curr => curr + 1);
        }, 300);
      } else {
        const calculatedProfile = calculateProfile(newAnswers);
        setProfile(calculatedProfile);
        setScreen('profile');
      }
    };
  
    const calculateProfile = (answers: QuizOption[]): Profile | null => {
      if (!answers.length) return null;
  
      const categoryCounts: Record<CategoryName, number> = answers.reduce((acc, answer) => {
        acc[answer.category] = (acc[answer.category] || 0) + 1;
        return acc;
      }, {} as Record<CategoryName, number>);
  
      const profileCounts: Record<string, number> = answers.reduce((acc, answer) => {
        if (answer.profile) {
          const profiles = answer.profile.split(', ');
          profiles.forEach(profile => {
            acc[profile] = (acc[profile] || 0) + 1;
          });
        }
        return acc;
      }, {} as Record<string, number>);
  
      const dominantCategory = Object.entries(categoryCounts)
        .sort(([,a], [,b]) => b - a)[0][0] as CategoryName;
  
      const categoryProfiles = profileCategories[dominantCategory].profiles;
      let dominantProfile = categoryProfiles[0];
      let maxCount = 0;
  
      categoryProfiles.forEach(profile => {
        if (profileCounts[profile] > maxCount) {
          maxCount = profileCounts[profile];
          dominantProfile = profile;
        }
      });
  
      return {
        category: dominantCategory,
        profile: dominantProfile,
        ...profileCategories[dominantCategory]
      };
    };
  
    interface AnimatedBackgroundProps {
      category: CategoryName;
    }
  
    const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ category }) => {
      const colors: Record<CategoryName, string> = {
        burningUp: "bg-gradient-to-br from-red-500 to-orange-500",
        simmerDown: "bg-gradient-to-br from-yellow-400 to-amber-500",
        iceCold: "bg-gradient-to-br from-blue-400 to-teal-500"
      };
  
      return (
        <div 
          className={`absolute inset-0 transition-colors duration-1000 ${colors[category]}`}
          role="presentation"
        />
      );
    };
    
  const renderResourceSection = () => {
    if (!userArea) return null;
    const areaInfo = areaFireInfo[userArea];

    return (
      <div className="mt-8 space-y-6 text-white/90">
        {/* Area Fire Information */}
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2" />
            Common Fires in Your Area
          </h3>
          <ul className="list-disc list-inside space-y-2">
            {areaInfo.common_fires.map((fire, index) => (
              <li key={index}>{fire}</li>
            ))}
          </ul>
        </div>

        {/* Resources Section */}
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Resources</h3>
          <div className="space-y-4">
            <Button 
              variant="secondary" 
              className="w-full bg-white/20 hover:bg-white/30 justify-start"
              onClick={() => window.open('https://www.scdf.gov.sg/home/fire-safety/fire-safety-checklist', '_blank')}
            >
              <ClipboardCheck className="mr-2" />
              Download Fire Safety Checklist
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full bg-white/20 hover:bg-white/30 justify-start"
              onClick={() => window.open('https://www.scdf.gov.sg/home/community-volunteers/community-programmes/my-responder', '_blank')}
            >
              <Users className="mr-2" />
              Join MyResponder Program
            </Button>
          </div>

          <div className="mt-4 text-sm">
            <p>Emergency Contact: {areaInfo.emergency_number}</p>
            <p>Nearest Fire Station: {areaInfo.fire_station}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (screen) {
      case 'intro':
        return (
          <Card className="w-full max-w-md mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500" />
            <CardContent className="relative p-4 sm:p-6 text-center text-white">
              <div className="w-full h-48 sm:h-64 mb-4 sm:mb-6 flex flex-col items-center justify-center">
                <Flame className="w-16 h-16 sm:w-24 sm:h-24 animate-bounce" aria-hidden="true" />
                <h1 className="text-2xl sm:text-4xl font-bold mt-4">Too Hot to Handle?</h1>
              </div>
              <p className="text-lg sm:text-xl mb-4 sm:mb-6">Discover your fire safety profile!</p>
              <Button 
                className="w-full sm:w-auto bg-white text-red-500 hover:bg-gray-100 transition-all duration-300" 
                onClick={() => setScreen('quiz')}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        );

      case 'quiz':
        if (!questions.length) return <div>Loading questions...</div>;
        return (
          <div className={`transition-all duration-300 ${slideDirection}`}>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="p-4 sm:p-6">
                <Progress value={progress} className="mb-2" aria-label="Quiz progress" />
                <CardTitle className="text-xl sm:text-2xl">Question {currentQuestion + 1} of {questions.length}</CardTitle>
                <CardDescription className="text-base sm:text-lg">{questions[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-4 sm:p-6">
                {questions[currentQuestion].options.map((option, idx) => (
                  <Button
                    key={idx}
                    className="w-full text-left justify-start h-auto py-3 px-4 sm:py-4 sm:px-6 hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base"
                    variant="outline"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        if (!profile) return <div>Calculating your profile...</div>;
        const CategoryIcon = profile.icon;
        return (
          <div className="w-full max-w-md mx-auto px-2">
            <Card className={`relative overflow-hidden ${profileCategories[profile.category].bgColor} text-white`}>
              <div className="absolute top-0 left-0 right-0 text-center py-2 sm:py-3 text-xl sm:text-3xl font-bold tracking-wider">
                {profileCategories[profile.category].title}
              </div>
              <CardContent className="pt-12 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-6">
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <CategoryIcon size={96} color="white" />
                  </div>
                </div>
                
                <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-4xl font-bold">{profile.profile}</h2>
                  <p className="text-base sm:text-xl opacity-90">{profile.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:space-x-4">
                  <Button 
                    variant="secondary" 
                    className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white text-sm sm:text-base"
                  >
                    <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Stories
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white text-sm sm:text-base"
                  >
                    <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> TikTok
                  </Button>
                </div>

                <div className="mt-6 space-y-4 text-sm sm:text-base">
                  {userArea && (
                    <>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center">
                          <MapPin className="mr-2" /> Common Fires in Your Area
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                          {areaFireInfo[userArea].common_fires.map((fire, index) => (
                            <li key={index}>{fire}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4">
                        <h3 className="text-lg sm:text-xl font-bold mb-3">Resources</h3>
                        <div className="space-y-2">
                          <Button 
                            variant="secondary" 
                            className="w-full bg-white/20 hover:bg-white/30 justify-start text-sm sm:text-base"
                          >
                            <ClipboardCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Download Fire Safety Checklist
                          </Button>
                          <Button 
                            variant="secondary" 
                            className="w-full bg-white/20 hover:bg-white/30 justify-start text-sm sm:text-base"
                          >
                            <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Join MyResponder Program
                          </Button>
                        </div>
                        <div className="mt-3 text-xs sm:text-sm">
                          <p>Emergency Contact: {areaFireInfo[userArea].emergency_number}</p>
                          <p>Nearest Fire Station: {areaFireInfo[userArea].fire_station}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 text-sm sm:text-base"
                    onClick={() => {
                      setScreen('intro');
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setProfile(null);
                      setUserArea(null);
                    }}
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <style jsx global>{`
        .slide-left {
          transform: translateX(0);
          opacity: 1;
        }
        .slide-left-exit {
          transform: translateX(-100%);
          opacity: 0;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .slide-left {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      {renderScreen()}
    </div>
  );
};

export default QuizFlow;