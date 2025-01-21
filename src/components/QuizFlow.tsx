"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Flame, ThermometerSnowflake, Activity, Instagram, Send, MapPin, ClipboardCheck, Users } from 'lucide-react';

// Add area-specific fire information
const areaFireInfo = {
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

const profileCategories = {
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
  

  const questions = [
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

const QuizFlow = () => {
    const [screen, setScreen] = useState('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [profile, setProfile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [slideDirection, setSlideDirection] = useState('slide-left');
    const [userArea, setUserArea] = useState(null);

    useEffect(() => {
      if (questions.length > 0) {
        setProgress((currentQuestion / questions.length) * 100);
      }
    }, [currentQuestion]);

    const handleAnswer = (option) => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
      
      // Store area if it's the location question
      if (currentQuestion === 0) {
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

    const calculateProfile = (answers) => {
        // Guard against empty answers
        if (!answers.length) return null;
      
        // Count occurrences of each category
        const categoryCounts = answers.reduce((acc, answer) => {
          acc[answer.category] = (acc[answer.category] || 0) + 1;
          return acc;
        }, {});
      
        // Count occurrences of each profile
        const profileCounts = answers.reduce((acc, answer) => {
          if (answer.profile) {
            const profiles = answer.profile.split(', ');
            profiles.forEach(profile => {
              acc[profile] = (acc[profile] || 0) + 1;
            });
          }
          return acc;
        }, {});
      
        // Find the dominant category
        const dominantCategory = Object.entries(categoryCounts)
          .sort(([,a], [,b]) => b - a)[0][0];
      
        // Find the dominant profile within the category
        const categoryProfiles = profileCategories[dominantCategory].profiles;
        let dominantProfile = categoryProfiles[0]; // default to first profile
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

  const AnimatedBackground = ({ category }) => {
    const colors = {
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

  const ProfileAnimation = ({ category }) => {
    const animations = {
      burningUp: (
        <div className="relative w-32 h-32 mx-auto">
          <Flame className="absolute inset-0 w-full h-full text-white animate-bounce" aria-hidden="true" />
        </div>
      ),
      simmerDown: (
        <div className="relative w-32 h-32 mx-auto">
          <Activity className="absolute inset-0 w-full h-full text-white animate-pulse" aria-hidden="true" />
        </div>
      ),
      iceCold: (
        <div className="relative w-32 h-32 mx-auto">
          <ThermometerSnowflake className="absolute inset-0 w-full h-full text-white animate-spin-slow" aria-hidden="true" />
        </div>
      )
    };

    return animations[category] || null;
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
          <Card className="w-full max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500" />
            <CardContent className="relative p-6 text-center text-white">
              <div className="w-full h-64 mb-6 flex flex-col items-center justify-center">
                <Flame className="w-24 h-24 animate-bounce" aria-hidden="true" />
                <h1 className="text-4xl font-bold mt-4">Too Hot to Handle?</h1>
              </div>
              <p className="text-xl mb-6">Discover your fire safety profile!</p>
              <Button 
                className="bg-white text-red-500 hover:bg-gray-100 transition-all duration-300"
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
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <Progress value={progress} className="mb-2" aria-label="Quiz progress" />
                <CardTitle className="text-2xl">Question {currentQuestion + 1} of {questions.length}</CardTitle>
                <CardDescription className="text-lg">{questions[currentQuestion].question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <Button
                    key={idx}
                    className="w-full text-left justify-start h-auto py-4 px-6 hover:bg-gray-100 transition-colors duration-200"
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
            
            const ProfileIcon = profileCategories[profile.category].icon;
            
            return (
              <div className="max-w-2xl mx-auto">
                <Card className={`relative overflow-hidden ${profileCategories[profile.category].bgColor} text-white`}>
                  {/* Title Banner */}
                  <div className="absolute top-0 left-0 right-0 text-center py-3 text-3xl font-bold tracking-wider">
                    {profileCategories[profile.category].title}
                  </div>
                  
                  <CardContent className="pt-16 pb-6 px-6">
                    {/* Profile Character Area */}
                    <div className="relative mb-8">
                      <div className="w-64 h-64 mx-auto rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                        <ProfileIcon className="w-32 h-32 text-white" />
                      </div>
                    </div>
      
                    {/* Profile Content */}
                    <div className="text-center space-y-4 mb-8">
                      <h2 className="text-4xl font-bold">{profile.profile}</h2>
                      <p className="text-xl opacity-90">{profile.description}</p>
                    </div>
      
                    {/* Social Sharing */}
                    <div className="flex justify-center space-x-4">
                      <Button 
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white"
                        aria-label="Share to Instagram Stories"
                      >
                        <Instagram className="mr-2 h-5 w-5" />
                        Stories
                      </Button>
                      <Button 
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white"
                        aria-label="Share to TikTok"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        TikTok
                      </Button>
                    </div>
      
                    {/* Area Information and Resources */}
                    {renderResourceSection()}
      
                    {/* Retake Quiz Option */}
                    <div className="mt-6 text-center">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20"
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
    <div className="min-h-screen bg-gray-100 p-6">
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