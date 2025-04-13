import React, { useState } from 'react';
import { Search, Users, MapPin, Trophy, Star, Github, Filter, X, Mail, Send } from 'lucide-react';

interface HackathonCard {
  name: string;
  date: string;
  location: string;
  mode: string;
  image: string;
}

interface DeveloperProfile {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  location: string;
  pastHackathons: string[];
  interests: string[];
  availability: string[];
}

interface ConnectionModal {
  isOpen: boolean;
  developer: DeveloperProfile | null;
}

function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [connectionModal, setConnectionModal] = useState<ConnectionModal>({
    isOpen: false,
    developer: null,
  });
  const [message, setMessage] = useState('');

  const hackathons: HackathonCard[] = [
    {
      name: "Women in Tech Hackathon",
      date: "Apr 29-30, 2025",
      location: "New Delhi, India",
      mode: "In-person",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Global AI Hackathon",
      date: "May 1-3, 2025",
      location: "Remote",
      mode: "Online",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const developers: DeveloperProfile[] = [
    {
      name: "Kashvi Arora",
      role: "Full Stack Developer",
      bio: "Passionate about building scalable web applications and exploring new technologies. Always excited to collaborate on innovative projects that push the boundaries of what's possible.",
      skills: ["React", "Node.js", "Python"],
      image: "https://media.licdn.com/dms/image/v2/D5603AQGeLIbN7FwAzQ/profile-displayphoto-shrink_200_200/B56ZWvVFJ1GUAc-/0/1742403296227?e=2147483647&v=beta&t=tByeUL4CkKLsLpVbjf0ouok27Rb5T-ucQWmmRx0Rizc",
      location: "New York, NY",
      pastHackathons: ["TechCrunch Disrupt 2024", "HackWithINDIA 2025"],
      interests: ["AI/ML", "Web3", "Social Impact"],
      availability: ["Remote", "In-person"]
    },
    {
      name: "ALEX",
      role: "UI/UX Designer",
      bio: "Design enthusiast with a keen eye for detail and user experience. Love creating intuitive interfaces that make complex problems simple and enjoyable to solve.",
      skills: ["Figma", "TypeScript", "Tailwind"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500",
      location: "London, UK",
      pastHackathons: ["ETHLondon 2023", "DesignHack 2023"],
      interests: ["DeFi", "Design Systems", "Accessibility"],
      availability: ["Remote"]
    }
  ];

  const allSkills = Array.from(new Set(developers.flatMap(dev => dev.skills)));
  const allLocations = Array.from(new Set(developers.map(dev => dev.location)));
  const allAvailability = ["Remote", "In-person"];

  const toggleFilter = (filter: string, type: 'skills' | 'locations' | 'availability') => {
    const setterMap = {
      skills: setSelectedSkills,
      locations: setSelectedLocations,
      availability: setSelectedAvailability
    };
    
    setterMap[type](prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleConnect = (developer: DeveloperProfile) => {
    setConnectionModal({
      isOpen: true,
      developer,
    });
  };

  const handleSendMessage = () => {
    // Here you would typically handle the message sending logic
    console.log(`Sending message to ${connectionModal.developer?.name}: ${message}`);
    setConnectionModal({ isOpen: false, developer: null });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-secondary-DEFAULT text-white">
      {/* Header */}
      <header className="bg-secondary-light p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">TeamMate<span className="text-primary">Finder</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full bg-primary hover:bg-primary-dark transition">Sign In</button>
            <button className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Find Your Perfect Hackathon Team</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Connect with talented developers, designers, and innovators. Build something amazing together.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center bg-secondary-light rounded-full p-2 mb-4">
              <Search className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search by skills, location, or hackathon..."
                className="w-full bg-transparent border-none focus:outline-none px-4 py-2"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="bg-secondary-light rounded-lg p-6 mt-4 text-left">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Search Filters</h3>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Skills</h4>
                    <div className="space-y-2">
                      {allSkills.map(skill => (
                        <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => toggleFilter(skill, 'skills')}
                            className="rounded border-gray-400 text-primary focus:ring-primary"
                          />
                          <span>{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Location</h4>
                    <div className="space-y-2">
                      {allLocations.map(location => (
                        <label key={location} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => toggleFilter(location, 'locations')}
                            className="rounded border-gray-400 text-primary focus:ring-primary"
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-primary">Availability</h4>
                    <div className="space-y-2">
                      {allAvailability.map(availability => (
                        <label key={availability} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAvailability.includes(availability)}
                            onChange={() => toggleFilter(availability, 'availability')}
                            className="rounded border-gray-400 text-primary focus:ring-primary"
                          />
                          <span>{availability}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons */}
      <section className="py-16 px-6 bg-secondary-light">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Trophy className="h-6 w-6 text-primary mr-2" />
            Upcoming Hackathons
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon, index) => (
              <div key={index} className="bg-secondary-DEFAULT rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
                <img src={hackathon.image} alt={hackathon.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{hackathon.name}</h4>
                  <p className="text-gray-400 mb-4">{hackathon.date}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hackathon.location}
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {hackathon.mode}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Developers */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <Star className="h-6 w-6 text-primary mr-2" />
            Available Developers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((dev, index) => (
              <div key={index} className="bg-secondary-light rounded-lg p-6 hover:transform hover:scale-105 transition duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={dev.image} alt={dev.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold">{dev.name}</h4>
                    <p className="text-primary">{dev.role}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {dev.location}
                </div>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium mb-2">About</h5>
                    <p className="text-sm text-gray-400">{dev.bio}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Past Hackathons</h5>
                    <div className="text-sm text-gray-400">
                      {dev.pastHackathons.join(', ')}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Interests</h5>
                    <div className="flex flex-wrap gap-2">
                      {dev.interests.map((interest, interestIndex) => (
                        <span key={interestIndex} className="bg-secondary-DEFAULT text-gray-400 px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Availability</h5>
                    <div className="flex flex-wrap gap-2">
                      {dev.availability.map((mode, modeIndex) => (
                        <span key={modeIndex} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleConnect(dev)}
                    className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full transition flex items-center justify-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Modal */}
      {connectionModal.isOpen && connectionModal.developer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-secondary-light rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={connectionModal.developer.image} 
                alt={connectionModal.developer.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{connectionModal.developer.name}</h4>
                <p className="text-primary">{connectionModal.developer.role}</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full h-32 px-4 py-2 rounded-lg bg-secondary-DEFAULT text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setConnectionModal({ isOpen: false, developer: null })}
                className="flex-1 px-4 py-2 rounded-full border border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full transition flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-secondary-light py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Users className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TeamMate<span className="text-primary">Finder</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">About</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;