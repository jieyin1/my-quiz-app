"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  ThermometerSnowflake, 
  Activity, 
  Send, 
  MapPin, 
  ClipboardCheck, 
  Users, 
  Home,
  Package,
  BatteryCharging,
  Instagram
} from 'lucide-react';

type LucideIcon = typeof Flame | typeof ThermometerSnowflake | typeof Activity | typeof Home | typeof Package | typeof BatteryCharging;

type AreaName = 'north' | 'south' | 'east' | 'west' | 'central';

type MainProfileName = 
  | 'Community Kampung Hero'
  | 'The Flash'
  | 'The Flame Keeper'
  | 'Karung Guni Royalty'
  | 'The Urban Nesters';

type SubProfileName = 
  | 'The Volt Rider'
  | 'PowerSurger'
  | "Hell's Kitchener"
  | 'The Puffer'
  | 'The Vibey Ambience Lover'
  | 'The Pineapple Rollers'
  | 'The Homefluencer'
  | 'The Family Guy'
  | 'Community Kampung Hero'
  | 'Karung Guni Royalty';

// Interface definitions
interface AreaInfo {
  common_fires: string[];
  emergency_number: string;
  fire_station: string;
}

interface ProfileWeights {
  mainProfile: MainProfileName;
  subProfile?: SubProfileName;
  weight: number;
}

interface QuizOption {
  text: string;
  area?: AreaName;
  profiles: { mainProfile: MainProfileName; subProfile?: SubProfileName; }[];
}

interface Question {
  question: string;
  options: QuizOption[];
}

interface SubProfile {
  name: SubProfileName;
  description: string;
  weight: number;
  safetyTips: string[];
  keyMessage: string;
  keyCta: string;
}

interface MainProfile {
  title: string;
  description: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
  weight: number;
  subProfiles?: SubProfile[];
  safetyTips: string[];
  keyMessage: string;
  keyCta: string;
}

interface ProfileResult {
    mainProfile: MainProfileName;
    subProfile?: SubProfileName;
    description: string;
    color: string;
    bgColor: string;
    icon: LucideIcon;
    score: number;
    safetyTips: string[];
    keyMessage: string;
    keyCta: string;
  }

  const QuizFlow: React.FC = () => {
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

      const mainProfiles: Record<MainProfileName, MainProfile> = {
        'Community Kampung Hero': {
          title: 'Community Kampung Hero',
          description: 'You are truly an inspiration! Your mindful and proactive approach to safety doesn’t just protect you—it safeguards the people around you too.',
          color: 'from-blue-400 to-teal-500',
          bgColor: 'bg-blue-500',
          icon: Activity,
          weight: 2.1,
          safetyTips: [
            'Be the first to assist in emergencies.',
            'Support your community when it matters most.',
            'Make Singapore a safer place—one action at a time'
          ],
          keyMessage: 'We believe you have what it takes to step up even further and make a real difference! Join our movement to build a nation of lifesavers by becoming a Community First Responder with SCDF.',
          keyCta: 'Sign up today. MyResponder by SCDF'
        },
        'The Flash': {
          title: 'The Flash',
          description: 'High-powered living needs high-powered safety!',
          color: 'from-yellow-400 to-orange-500',
          bgColor: 'bg-orange-500',
          icon: BatteryCharging,
          weight: 2.0,
          subProfiles: [
            {
              name: 'The Volt Rider',
              description: 'Hey Flash! ⚡ Looks like you’ve got speed, energy, and a whole lot of power—but are you using it wisely? Whether you’re zipping through the streets on your AMD or plugging in every device at once, take charge of your safety. Remember with power comes responsibility.\n\n You’re always on the move and your AMD is your sidekick, taking you places at top speed. But let’s slow down for a sec—are you riding safely? ',
              weight: 2.0,
              safetyTips: [
                'Use LTA-approved PMDs—no illegal mods!',
                'Charge in a cool, ventilated area—not inside your bedroom.',
                'Never charge overnight. A charged PMD is great. A burnt one? Not so much.',
                'If you zhng (modify) it, you risk it!'
              ],
              keyMessage: 'Be the Fastest, Not the Most Flammable! Power up your fire safety knowledge, learn more with SCDF\'s MyResponder.',
              keyCta: 'Download PMD guide'
            },
            {
              name: 'PowerSurger',
              description: `Hey Flash! Looks like you’ve got speed, energy, and a whole lot of power—but are you using it wisely? Whether you’re zipping through the streets on your AMD or plugging in every device at once, take charge of your safety. Remember with power comes responsibility.\n\n More ports = more power, right? Uh-oh.... You live life plugged in—literally. With gadgets, chargers, and power strips all running at once, your house is basically a mini power station. But even The Flash needs to slow down before things overheat. 
              
              Did you know?
              -  One of the top two causes of residential fires is due to electrical origin. 
              - Overloading your power sockets can spark deadly fires—you’re not running a power plant!
              - Cheap, uncertified chargers can cause dangerous surges (and explosions).
              - Fire risks increase if you charge overnight or daisy-chain power strips.`,
              weight: 2.0,
              safetyTips: [
                'One device per plug—don’t overload power strips.',
                'Use certified chargers (look for the safety mark!)',
                'If your power strip feels hot, it’s screaming for help—replace it!'
              ],
              keyMessage: 'Control the surge, don’t be the cause of one! Power up your fire safety knowledge, learn more with SCDF\'s MyResponder.',
              keyCta: 'Take steps to reduce/prevent occurrence of residential fire'
            }
          ],
          safetyTips: [
            'Check electrical appliances regularly',
            'Use certified charging equipment',
            'Keep charging areas ventilated'
          ],
          keyMessage: 'Be aware of electrical fire risks',
          keyCta: 'Learn about electrical safety'
        },
        'The Flame Keeper': {
          title: 'The Flame Keeper',
          description: 'Master of fire, but needs to keep it under control',
          color: 'from-red-500 to-orange-500',
          bgColor: 'bg-red-600',
          icon: Flame,
          weight: 1.4,
          subProfiles: [
            {
              name: "Hell's Kitchener",
              description: 'Kitchen master who needs to cook safely',
              weight: 1.4,
              safetyTips: [
                'Never leave cooking unattended',
                'Keep fire blanket nearby',
                'Regular hood cleaning'
              ],
              keyMessage: 'Awareness that unattended cooking is a top cause of residential fire',
              keyCta: 'Take precautions and do not leave cooking unattended'
            },
            {
              name: 'The Puffer',
              description: 'Smoker who needs to manage smoking safely',
              weight: 1.4,
              safetyTips: [
                'Use proper ashtrays',
                'No smoking in bed',
                'Dispose of butts safely'
              ],
              keyMessage: 'Stub out your cigarettes properly!',
              keyCta: 'Learn proper cigarette disposal'
            },
            {
              name: 'The Vibey Ambience Lover',
              description: 'Creates ambience with candles and incense',
              weight: 1.4,
              safetyTips: [
                'Use stable candle holders',
                'Keep flames away from curtains',
                'Never leave candles unattended'
              ],
              keyMessage: 'No open flames unattended',
              keyCta: 'Learn safe candle and incense use'
            }
          ],
          safetyTips: [
            'Keep fire extinguisher accessible',
            'Clear area around heat sources',
            'Emergency numbers visible'
          ],
          keyMessage: 'Control the fire, don\'t let it control you',
          keyCta: 'Learn fire safety techniques'
        },
        'Karung Guni Royalty': {
          title: 'Karung Guni Royalty',
          description: 'Collector extraordinaire who needs to manage clutter',
          color: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-600',
          icon: Package,
          weight: 3.0,
          safetyTips: [
            'Keep evacuation routes clear',
            'Regular decluttering sessions',
            'Proper storage practices'
          ],
          keyMessage: 'A clear path is important for evacuation in case of fire',
          keyCta: 'Clear your space to create a clear exit route'
        },
        'The Urban Nesters': {
          title: 'The Urban Nesters',
          description: 'Making a home while keeping it safe',
          color: 'from-green-400 to-emerald-500',
          bgColor: 'bg-green-500',
          icon: Home,
          weight: 1.0,
          subProfiles: [
            {
              name: 'The Pineapple Rollers',
              description: 'New to housing and learning about fire safety',
              weight: 1.0,
              safetyTips: [
                'Learn basic fire safety',
                'Install smoke detectors',
                'Know evacuation routes'
              ],
              keyMessage: 'Awareness that there is a difference between fire vs home insurance',
              keyCta: 'Understand the difference between fire and home insurance'
            },
            {
              name: 'The Homefluencer',
              description: 'Prioritizing aesthetics while maintaining safety',
              weight: 1.0,
              safetyTips: [
                'Safe cable management',
                'Fire-safe decorations',
                'Aesthetic but accessible safety equipment'
              ],
              keyMessage: 'Fire safety first, aesthetic second',
              keyCta: 'Install a Home Fire Alarm Device (HFAD)'
            },
            {
              name: 'The Family Guy',
              description: 'Family safety manager looking to improve',
              weight: 1.0,
              safetyTips: [
                'Family emergency plan',
                'Child-proof safety measures',
                'Regular family safety drills'
              ],
              keyMessage: 'Involve and educate the more vulnerable occupants living with you on safest and quickest exit route',
              keyCta: 'Get other family members involved in keeping safe from fire'
            }
          ],
          safetyTips: [
            'Regular safety inspections',
            'Keep emergency contacts updated',
            'Maintain clear exits'
          ],
          keyMessage: 'Keep your home safe and fire-ready',
          keyCta: 'Learn about home fire safety'
        }
      };

    const questions: Question[] = [
      {
        question: "Which area do you stay in?",
        options: [
          { text: "North (Woodlands, Yishun, Sembawang)", area: "north", profiles: [] },
          { text: "South (Alexandra, Bukit Merah)", area: "south", profiles: [] },
          { text: "East (Tampines, Pasir Ris)", area: "east", profiles: [] },
          { text: "West (Jurong, Clementi)", area: "west", profiles: [] },
          { text: "Central (Toa Payoh, Bishan)", area: "central", profiles: [] }
        ]
      },
      {
        question: "Your morning routine includes...",
        options: [
          {
            text: "A good cuppa from my home cafe, while multiple devices charge. Don't talk to me before I've had my coffee!",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "A quiet moment with my first smoke of the day",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Puffer"  }]
          },
          {
            text: "Zoom Zoom! Time to go to work. No time to waste — So I charge everything overnight. Everything is charged and ready, time to go.",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "Getting the family ready for the day. I have to ensure that my children or my parents have everything they need.",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }]
          },
          {
            text: "Checking all plugs and switches before leaving the house",
            profiles: [{ mainProfile: "Community Kampung Hero"  }]
          }
        ]
      },
      {
        question: "What would be your next recommended on Netflix?",
        options: [
          {
            text: "Culinary Class Wars",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "Hell's Kitchener"  }]
          },
          {
            text: "Tidying up with Marie Kondo",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }
            ]
          },
          {
            text: "The Good Place",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Pineapple Rollers"  }]
          },
          {
            text: "I don't watch Netflix",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }]
          },
          {
            text: "Dream home makeover",
            profiles: [
              { mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  }
            ]
          }
        ]
      },
      {
        question: "During your last home gathering...",
        options: [
          {
            text: "Halfway through, I go smoke with my kakis in the corner",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Puffer"  }]
          },
          {
            text: "I'm all about setting the mood with a cozy vibe — my favourite candles create the perfect ambience!",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  }]
          },
          {
            text: "I am a busy bee! - Whipping up something tasty in the kitchen while keeping the party flowing in the living room!",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "Hell's Kitchener"  }]
          },
          {
            text: "I know the fire escape plan for my family - can't be too careful!",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }]
          },
          {
            text: "Yay my friends brought gifts! Uh oh where am I going to keep them?",
            profiles: [{ mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }]
          }
        ]
      },
      {
        question: "That empty corner in your house is perfect for...",
        options: [
          {
            text: "I am a space optimizer, I would fill up the space with anything and everything, wardrobe, cupboard, storage space",
            profiles: [{ mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }]
          },
          {
            text: "Empty corners are my favorite — keeps the space feeling open and uncluttered",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  }
            ]
          },
          {
            text: "I definitely have things, I think I can be tidier but it is not that bad",
            profiles: [
              { mainProfile: "The Urban Nesters", subProfile: "The Pineapple Rollers"  },
              { mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  }
            ]
          },
          {
            text: "I have things but I like to keep things neat and tidy",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }]
          },
          {
            text: "keeping my Active Mobility Device (E bike, PMD etc.) indoors",
            profiles: [{ mainProfile: "The Flash", subProfile: "The Volt Rider"  }]
          }
        ]
      },
      {
        question: "When buying electrical items...",
        options: [
          {
            text: "Does it come with a safety mark?",
            profiles: [
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  },
              { mainProfile: "Community Kampung Hero"  }
            ]
          },
          {
            text: "Cheap cheap. — I love cheap stuff and I cannot lie, especially cheap electronic items",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "I am an early adopter and love to buy anything new and innovative to experiment",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Puffer"  }]
          },
          {
            text: "I add it to the pile of electrical items that I already have! Got deal? Just buy!",
            profiles: [{ mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }]
          }
        ]
      },
      {
        question: "Your charging situation is best described as...",
        options: [
          {
            text: "Efficiency and convenience! More ports the better. Even better if everything charges while I am sleeping",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "I will make sure that I will unplug the devices once they are fully charged.",
            profiles: [{ mainProfile: "Community Kampung Hero"  }]
          },
          {
            text: "Convenience is key - everything charges while I am sleeping",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "I use power strips (device that allows for multiple charging) but I check for overloading",
            profiles: [
              { mainProfile: "The Flash", subProfile: "PowerSurger"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }
            ]
          },
          {
            text: "I don't think too much about it - I plug in wherever there's space",
            profiles: [
              { mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Pineapple Rollers"  }
            ]
          }
        ]
      },
      {
        question: "While waiting for your food to cook, you usually...",
        options: [
          {
            text: "I am super vigilant. I stay in the kitchen and keep an eye on things.",
            profiles: [
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  },
              { mainProfile: "Community Kampung Hero"  }
            ]
          },
          {
            text: "I love to multi-task, I will watch a video or do something else while cooking",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "Hell's Kitchener"  }]
          },
          {
            text: "Do I look like I cook? I don't cook much, the only use for the candle is for the aesthetic.",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  }]
          },
          {
            text: "I am a techie. I use time and smart home tech to monitor my cooking.",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "Time for a smoke break!",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Puffer"  }]
          }
        ]
      },
      {
        question: "When receiving deliveries...",
        options: [
          {
            text: "Nah I do the delivery.",
            profiles: [{ mainProfile: "The Flash", subProfile: "The Volt Rider"  }]
          },
          {
            text: "Oops I did it again. Another package to add to the pile! I am trying to find a space to store my packages.",
            profiles: [{ mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }]
          },
          {
            text: "I am all about repurposing boxes. I keep my box so I use them next time. More things to make my home look or smell nice!",
            profiles: [
              { mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  },
              { mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  }
            ]
          },
          {
            text: "I am so excited to receive new things so unbox it immediately and clear away the clutter",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }
            ]
          },
          {
            text: "I'm not home! Please just put it in the riser for me. Coming, coming! I have something on the stove!",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "Hell's Kitchener"  }]
          }
        ]
      },{
        question: "Where do you keep your active mobility devices? (E bike, PMD etc)",
        options: [
          {
            text: "Nah I don't have one.",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }
            ]
          },
          {
            text: "I am super mindful, I keep it in a safe, ventilated area and I never charge them overnight. Doesn't really fit into my house theme, so it's a no go.",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  }]
          },
          {
            text: "I am all about efficiency, I plugged in overnight so they're ready to use in the morning for me to zoom zoom zoom.",
            profiles: [
              { mainProfile: "The Flash", subProfile: "The Volt Rider"  },
              { mainProfile: "The Flash", subProfile: "PowerSurger"  }
            ]
          },
          {
            text: "I like to zhng it up",
            profiles: [{ mainProfile: "The Flash", subProfile: "The Volt Rider"  }]
          },
          {
            text: "Indoors, but I check for overheating issues. My house is too crowded to store an active mobility device",
            profiles: [{ mainProfile: "Karung Guni Royalty", subProfile: "Karung Guni Royalty"  }]
          }
        ]
      },
      {
        question: "The smoke detector in your home is...",
        options: [
          {
            text: "I don't have one / Too ugly to be in the living room",
            profiles: [
              { mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  }
            ]
          },
          {
            text: "Tested and checked regularly",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }
            ]
          },
          {
            text: "It came with the house..?",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Pineapple Rollers"  }]
          },
          {
            text: "I don't have one, I'm safe enough, I don't really need it",
            profiles: [
              { mainProfile: "The Urban Nesters", subProfile: "The Homefluencer"  },
              { mainProfile: "The Flash"  },
              { mainProfile: "The Flame Keeper"  }
            ]
          }
        ]
      },
      {
        question: "When there's a power trip...",
        options: [
          {
            text: "No panic here! I'll put on my detective hat and safely track down the culprit behind the power trip.",
            profiles: [
              { mainProfile: "Community Kampung Hero"  },
              { mainProfile: "The Urban Nesters", subProfile: "The Family Guy"  }
            ]
          },
          {
            text: "Again? What could be wrong? Did I plug in too many things again?",
            profiles: [{ mainProfile: "The Flash", subProfile: "PowerSurger"  }]
          },
          {
            text: "OMG What do I do? I don't know what to do, I am gonna call someone to help me!",
            profiles: [{ mainProfile: "The Urban Nesters", subProfile: "The Pineapple Rollers"  }]
          },
          {
            text: "I will just panic and unplug everything! Time to light some candles - perfect mood lighting!",
            profiles: [{ mainProfile: "The Flame Keeper", subProfile: "The Vibey Ambience Lover"  }]
          }
        ]
      }
    ];
  
    const [screen, setScreen] = useState<'intro' | 'quiz' | 'profile'>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<QuizOption[]>([]);
    const [profile, setProfile] = useState<ProfileResult | null>(null);
    const [progress, setProgress] = useState(0);
    const [userArea, setUserArea] = useState<AreaName | null>(null);
  
    useEffect(() => {
      if (questions.length > 0) {
        setProgress((currentQuestion / questions.length) * 100);
      }
    }, [currentQuestion]);
  
    const calculateProfile = (answers: QuizOption[]): ProfileResult | null => {
        // Initialize scores
        const profileScores: Record<MainProfileName, number> = {
            'Community Kampung Hero': 0,
            'The Flash': 0,
            'The Flame Keeper': 0,
            'Karung Guni Royalty': 0,
            'The Urban Nesters': 0
        };
        
        const subProfileScores: Record<SubProfileName, number> = {
            'The Volt Rider': 0,
            'PowerSurger': 0,
            "Hell's Kitchener": 0,
            'The Puffer': 0,
            'The Vibey Ambience Lover': 0,
            'The Pineapple Rollers': 0,
            'The Homefluencer': 0,
            'The Family Guy': 0,
            'Community Kampung Hero': 0,
            'Karung Guni Royalty': 0
        };
    
        // Calculate scores using profile weights instead of option weights
        answers.forEach(answer => {
            answer.profiles.forEach(profile => {
                const mainProfileData = mainProfiles[profile.mainProfile];
                profileScores[profile.mainProfile] += mainProfileData.weight;
                
                if (profile.subProfile) {
                    const subProfileData = mainProfileData.subProfiles?.find(
                        sp => sp.name === profile.subProfile
                    );
                    if (subProfileData) {
                        subProfileScores[profile.subProfile] += subProfileData.weight;
                    }
                }
            });
        });
  
          // Find dominant main profile
        const dominantMainProfile = Object.entries(profileScores)
        .sort(([,a], [,b]) => b - a)[0][0] as MainProfileName;

        // Find dominant sub-profile if applicable
        const mainProfileData = mainProfiles[dominantMainProfile];
        let dominantSubProfile: SubProfileName | undefined;
        let safetyTips: string[] = mainProfileData.safetyTips; // Initialize with main profile safety tips
        let keyMessage: string = mainProfileData.keyMessage;
        let keyCta: string = mainProfileData.keyCta;

        if (mainProfileData.subProfiles) {
        const relevantSubProfiles = mainProfileData.subProfiles.map(sp => sp.name);
        const highestSubProfile = Object.entries(subProfileScores)
            .filter(([profile]) => relevantSubProfiles.includes(profile as SubProfileName))
            .sort(([,a], [,b]) => b - a)[0];
        if (highestSubProfile && highestSubProfile[1] > 0) {
            dominantSubProfile = highestSubProfile[0] as SubProfileName;
            const subProfile = mainProfileData.subProfiles.find(sp => sp.name === dominantSubProfile);
            if (subProfile) {
            safetyTips = subProfile.safetyTips;
            keyMessage = subProfile.keyMessage;
            keyCta = subProfile.keyCta;
            }
        }
        }

            return {
            mainProfile: dominantMainProfile,
            subProfile: dominantSubProfile,
            description: mainProfileData.description,
            color: mainProfileData.color,
            bgColor: mainProfileData.bgColor,
            icon: mainProfileData.icon,
            score: profileScores[dominantMainProfile],
            safetyTips,
            keyMessage,
            keyCta
            };
            };
  
    const handleAnswer = (option: QuizOption) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);
      
        if (currentQuestion === 0 && option.area) {
          setUserArea(option.area);
        }
      
        // Calculate and log current scores
        const currentScores = calculateCurrentScores(newAnswers);
        console.log('Current scores:', currentScores);
      
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(curr => curr + 1);
        } else {
          const calculatedProfile = calculateProfile(newAnswers);
          setProfile(calculatedProfile);
          setScreen('profile');
        }
      };
      
      // Updated function to calculate current scores including subprofiles
      const calculateCurrentScores = (answers: QuizOption[]): { 
        mainProfiles: Record<MainProfileName, number>,
        subProfiles: Record<SubProfileName, number>
      } => {
        const mainProfileScores: Record<MainProfileName, number> = {
          'Community Kampung Hero': 0,
          'The Flash': 0,
          'The Flame Keeper': 0,
          'Karung Guni Royalty': 0,
          'The Urban Nesters': 0
        };
      
        const subProfileScores: Record<SubProfileName, number> = {
          'The Volt Rider': 0,
          'PowerSurger': 0,
          "Hell's Kitchener": 0,
          'The Puffer': 0,
          'The Vibey Ambience Lover': 0,
          'The Pineapple Rollers': 0,
          'The Homefluencer': 0,
          'The Family Guy': 0,
          'Community Kampung Hero': 0,
          'Karung Guni Royalty': 0
        };
      
        answers.forEach(answer => {
          answer.profiles.forEach(profile => {
            const mainProfileData = mainProfiles[profile.mainProfile];
            mainProfileScores[profile.mainProfile] += mainProfileData.weight;
      
            if (profile.subProfile) {
              const subProfileData = mainProfileData.subProfiles?.find(
                sp => sp.name === profile.subProfile
              );
              if (subProfileData) {
                subProfileScores[profile.subProfile] += subProfileData.weight;
              }
            }
          });
        });
      
        return { mainProfiles: mainProfileScores, subProfiles: subProfileScores };
      };

      const renderProfile = () => {
        if (!profile) return null;
        const ProfileIcon = profile.icon;
        return (
          <div className="w-full max-w-md mx-auto px-2">
            <Card className={`relative overflow-hidden ${profile.bgColor} text-white`}>
              <div className="absolute top-0 left-0 right-0 text-center py-3 text-2xl font-bold tracking-wider bg-black/20">
                {profile.mainProfile}
              </div>
              <CardContent className="pt-16 pb-6 px-6">
                <div className="relative mb-8">
                  <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden bg-white/10 flex items-center justify-center">
                    <ProfileIcon size={96} color="white" />
                  </div>
                </div>
                <div className="text-center space-y-4 mb-8">
                  {profile.subProfile && (
                    <h3 className="text-xl font-semibold text-white/90">
                      Specialty: {profile.subProfile}
                    </h3>
                  )}
                  <p className="text-lg opacity-90">{profile.description}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-bold mb-3">Key Message</h3>
                  <p>{profile.keyMessage}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-bold mb-3">
                    Your Personalised Safety Tips
                  </h3>
                  <ul className="space-y-2">
                    {profile.safetyTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Flame className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {userArea && (
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <MapPin className="mr-2" /> Common Fires in Your Area
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      {areaFireInfo[userArea].common_fires.map((fire, index) => (
                        <li key={index}>{fire}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    className="w-full bg-white/20 hover:bg-white/30 justify-start items-start text-left py-3 px-4"
                    onClick={() => window.open('https://www.scdf.gov.sg/home/fire-safety/fire-safety-checklist', '_blank')}
                  >
                    <ClipboardCheck className="mr-2" /> Download Fire Safety Checklist
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full bg-white/20 hover:bg-white/30 justify-start items-start text-left py-3 px-4 h-auto min-h-[2rem]"
                    onClick={() => window.open('https://www.scdf.gov.sg/home/community-volunteers/community-programmes/my-responder', '_blank')}
                    >
                    <div className="flex items-start w-full">
                        <Users className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                        <span className="flex-grow break-words whitespace-normal">
                        {profile.keyCta}
                        </span>
                    </div>
                    </Button>
                </div>
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
      };
      
      const renderQuiz = () => {
        if (!questions.length) return <div>Loading questions...</div>;
      
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="p-6">
              <Progress 
                value={progress} 
                className="mb-2" 
                aria-label="Quiz progress" 
              />
              <CardTitle className="text-2xl">
                Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              <CardDescription className="text-lg">
                {questions[currentQuestion].question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {questions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  className="w-full text-left justify-start h-auto py-4 px-6 whitespace-normal hover:bg-gray-100 transition-colors duration-200"
                  variant="outline"
                  onClick={() => handleAnswer(option)}
                >
                  <span className="text-base leading-relaxed">{option.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        );
      };
      
      const renderIntro = () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Card className="w-full max-w-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500" />
            <CardContent className="relative text-white p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <Flame className="w-20 h-20 sm:w-24 sm:h-24 mb-6" />
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">Too Hot to Handle?</h1>
                <p className="text-lg sm:text-xl mb-8">Discover your fire safety profile!</p>
                <Button 
                  className="w-full sm:w-auto bg-white text-red-500 hover:bg-gray-100 text-lg py-2 px-6"
                  onClick={() => setScreen('quiz')}
                >
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
      
      const renderScreen = () => {
        switch (screen) {
          case 'intro':
            return renderIntro();
          case 'quiz':
            return renderQuiz();
          case 'profile':
            return renderProfile();
          default:
            return null;
        }
      };
      
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {renderScreen()}
          </div>
        </div>
      );

    }
      
      export default QuizFlow;