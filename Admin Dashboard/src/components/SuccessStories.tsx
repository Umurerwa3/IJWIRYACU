import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface SuccessStoriesProps {
  language: 'en' | 'rw';
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({ language }) => {
  const [currentStory, setCurrentStory] = useState(0);

  const translations = {
    en: {
      title: 'Success Stories',
      subtitle: 'Recent resolved cases',
      resolved: 'Resolved',
      days: 'days'
    },
    rw: {
      title: 'Ibyagenze Neza',
      subtitle: 'Ibibazo byakemuwe vuba',
      resolved: 'Byakemuwe',
      days: 'iminsi'
    }
  };

  const t = translations[language];

  const successStories = [
    {
      id: 1,
      title: language === 'en' ? 'Clean Water Access Restored' : 'Amazi Meza Yasubiye',
      location: 'Gasabo District',
      description: language === 'en' 
        ? 'Water tank repairs completed within 3 days of reporting. 200+ families now have clean water access.'
        : 'Gusana sitani y\'amazi byarangiye mu minsi 3. Imiryango 200+ ifite amazi meza.',
      quote: language === 'en'
        ? "Thank you for listening to our concerns. Clean water changed our lives."
        : "Murakoze kuntuza. Amazi meza yarahinduje ubuzima bwacu.",
      author: 'Marie U.',
      resolvedIn: 3,
      rating: 5
    },
    {
      id: 2, 
      title: language === 'en' ? 'School Supplies Delivered' : 'Ibikoresho by\'ishuri Byatanzwe',
      location: 'Nyabihu District',
      description: language === 'en'
        ? 'Emergency school supplies delivered to rural school. 150 students can now continue learning.'
        : 'Ibikoresho by\'ishuri byatanzwe mu ishuri ry\'icyaro. Abanyeshuri 150 bashobora gukomeza kwiga.',
      quote: language === 'en'
        ? "Our children can now learn properly with proper materials."
        : "Abana bacu bashobora kwiga neza n\'ibikoresho bikwiye.",
      author: 'Jean P.',
      resolvedIn: 7,
      rating: 5
    },
    {
      id: 3,
      title: language === 'en' ? 'Road Pothole Fixed' : 'Ubwobo bw\'umuhanda Bwuzuzwe',
      location: 'Huye District', 
      description: language === 'en'
        ? 'Dangerous pothole on main road fixed after community report. Safer travel for everyone.'
        : 'Ubwobo buteza ubwoba mu muhanda mukuru bwuzuzwe nyuma y\'itangazo. Ingendo zimeze neza ku bose.',
      quote: language === 'en'
        ? "The road is much safer now. Great response time!"
        : "Umuhanda uzi neza ubu. Yakemezwe vuba!",
      author: 'Patrick K.',
      resolvedIn: 5,
      rating: 4
    }
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const story = successStories[currentStory];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-500" />
        <div>
          <h3 className="text-lg font-bold text-gray-800">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevStory}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <div className="flex gap-1 justify-center mb-2">
              {Array.from({ length: story.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {currentStory + 1} of {successStories.length}
            </div>
          </div>
          <button 
            onClick={nextStory}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <h4 className="font-bold text-gray-800 mb-1">{story.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{story.location}</p>
          <p className="text-sm text-gray-700 mb-4">{story.description}</p>
          
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <Quote className="w-4 h-4 text-green-600 mb-2 mx-auto" />
            <p className="text-sm italic text-green-800 mb-2">"{story.quote}"</p>
            <p className="text-xs text-green-600">- {story.author}</p>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {t.resolved} in {story.resolvedIn} {t.days}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};